<?php

// documentation see https://mgrl.github.io/photobooth-docs/extras/shareservice/

// configuration options
$APIKEY = "changedefault!";                 // set apikey to a random value. The same apikey needs to be set in photobooth app to pair both systems
$WORK_DIRECTORY = __DIR__ . "/uploads";     // __DIR__ is the directory of the current PHP file
$ALLOWED_UPLOAD_MAX_SIZE = 15 * 2 ** 20;    // 15MB max file size to upload
$TIMEOUT_DOWNLOAD = 15;                     // if photobooth-app upload is not completed within this timeout, it's considered as an error and error is displayed instead image


// internal constants - do not change below this!
$VERSION = 1;
$DB_FILENAME = "jobs.sqlite3";
$ALLOWED_UPLOAD_TYPES = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg'
];

// setup php ini
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set("log_errors", 1);
ini_set("error_log", "php-error.log");
error_reporting(E_ALL);


function text_to_image($text, $image_width = 400, $colour = array(0, 244, 34), $background = array(0, 0, 0))
{
    # some endpoints usually output images
    # if there is an error in the process, a placeholder image is generated so
    # there is at least something shown to the user why it failed
    $font = 50;
    $line_height = 15;
    $padding = 5;
    $text = wordwrap($text, ($image_width / 10));
    $lines = explode("\n", $text);
    $image = imagecreate($image_width, ((count($lines) * $line_height)) + ($padding * 2));
    $background = imagecolorallocate($image, $background[0], $background[1], $background[2]);
    $colour = imagecolorallocate($image, $colour[0], $colour[1], $colour[2]);
    imagefill($image, 0, 0, $background);
    $i = $padding;

    foreach ($lines as $line) {
        imagestring($image, $font, $padding, $i, trim($line), $colour);
        $i += $line_height;
    }

    header("Content-type: image/jpeg");
    header('Content-Disposition: inline; filename="err.jpg"');
    http_response_code(500);
    imagejpeg($image);
    imagedestroy($image);
}

try {
    // die if APIKEY is not set
    if (empty($APIKEY)) {
        throw new RuntimeException("APIKEY is not set in dl.php script! Configure APIKEY in dl.php and photoboothapp-config to pair systems.");
    }

    // db connection setup
    $db = new SQLite3($DB_FILENAME);
    $db->busyTimeout(5000);
    // WAL mode has better control over concurrency.
    // Source: https://www.sqlite.org/wal.html
    $db->exec('PRAGMA journal_mode = wal;');


    // setup checks
    # create working directory
    if (!is_dir($WORK_DIRECTORY)) {
        mkdir($WORK_DIRECTORY);
    }

    # create DB
    $db->exec("CREATE TABLE IF NOT EXISTS upload_requests(
        file_identifier TEXT PRIMARY KEY,
        filename TEXT,
        last_modified TEXT DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL DEFAULT 'pending'
    )");



    if ($_GET["action"] == "upload" && $_GET["id"]) {
        // action: upload a file, identified by id.
        // once file uploaded, mark it as "uploaded" in db
        // ongoing download-action would check for "uploaded" mark and return the file then

        $file_identifier = $_GET["id"];

        // sanity check for apikey
        if ($_GET["apikey"] !== $APIKEY) {
            $db->exec("UPDATE upload_requests SET status = 'upload_failed' WHERE file_identifier = '" . $file_identifier . "'");
            echo "APIKEY not correct! Check APIKEY in dl.php and photobooth config.";
            throw new RuntimeException("APIKEY not correct! Check APIKEY in dl.php and photobooth config.");
        }

        // file upload sanity checks
        if (!isset($_FILES["upload_file"])) {
            # set status to fail so ongoing download can stop waiting
            $db->exec("UPDATE upload_requests SET status = 'upload_failed' WHERE file_identifier = '" . $file_identifier . "'");
            throw new RuntimeException("There is no file uploaded");
        }
        $filepath = $_FILES['upload_file']['tmp_name'];
        $fileinfo = finfo_open(FILEINFO_MIME_TYPE);
        $filetype = finfo_file(
            $fileinfo,
            $filepath
        );
        if (filesize($filepath) === 0) {
            throw new RuntimeException("The file is empty.");
        }
        if (filesize($filepath) > $ALLOWED_UPLOAD_MAX_SIZE) {
            throw new RuntimeException("The file is too large");
        }
        if (!in_array($filetype, array_keys($ALLOWED_UPLOAD_TYPES))) {
            throw new RuntimeException("File not allowed.");
        }

        // filename to store the uploaded file to in work directory
        $filename = basename($filepath);
        $extension = $ALLOWED_UPLOAD_TYPES[$filetype];

        // query entry for id to double-check that currently uploaded file was actually requested and job assigned
        $results = $db->querySingle("SELECT * FROM upload_requests WHERE file_identifier='" . $file_identifier . "' AND status='job_assigned'", true);

        if (!empty($results)) {
            $db->exec("UPDATE upload_requests SET status = 'uploading' WHERE file_identifier = '" . $file_identifier . "'");

            // save uploaded file
            $newFilepath = $WORK_DIRECTORY . "/" . $filename . "." . $extension;
            if (!copy($filepath, $newFilepath)) { // Copy the file, returns false if failed
                throw new RuntimeException("Can't move file.");
            }
            unlink($filepath); // Delete the temp file

            // mark as uploaded
            $db->exec("UPDATE upload_requests SET filename = '$filename.$extension', status = 'uploaded' WHERE file_identifier = '" . $file_identifier . "'");

            echo "file successfully saved and ready to download";
        } else
            throw new RuntimeException("error processing job");
    } elseif ($_GET["action"] == "upload_queue") {
        // longrunning task to wait for dl request
        while (true) {
            $results = $db->querySingle("SELECT * FROM upload_requests WHERE status = 'pending'", true);

            if (!empty($results)) {
                // non-empty results is to upload by fotobox
                $db->exec("UPDATE upload_requests SET status = 'job_assigned' WHERE file_identifier = '" . $results['file_identifier'] . "'");
                echo json_encode($results);
            } else {
                # nothing to do; keep silence; maybe replace by a ping message later to ensure connection health
            }
            # add newline so python backend can read it
            echo "\n";

            # flush content to output
            flush();

            # wait before next iteration
            usleep(500 * 1000);
        }
    } elseif ($_GET["action"] == "download" && $_GET["id"]) {

        $file_identifier = $_GET["id"];

        # this endpoint always has to deliver an image!


        // insert request - if already existing it's marked as pending again - no cache for now TODO: what about concurrent downloads?
        $db->exec("REPLACE INTO upload_requests (
                    file_identifier, 
                    status
                    ) VALUES (
                    '$file_identifier',
                    'pending')");

        $time_waited = 0;
        // now wait for upload to happen
        do {
            //regular checks upload completed?
            $results = $db->querySingle("SELECT * FROM upload_requests WHERE file_identifier= '$file_identifier'", true);

            if (!empty($results) && $results["status"] == "uploaded") {
                // non-empty results are indicator for finished upload, break and continue with file output.

                $file = $WORK_DIRECTORY . "/" . $results["filename"];

                // upload completed, deliver file now.
                if (file_exists($file)) {
                    header("Content-type: " . mime_content_type($file));
                    header('Content-Disposition: inline; filename="' . $results["filename"] . '"');

                    echo file_get_contents($file);
                    exit;
                } else {
                    text_to_image("error, cannot find uploaded file");
                    throw new RuntimeException("error, cannot find uploaded file");
                }
            } elseif (!empty($results) && $results["status"] == "upload_failed") {
                text_to_image("photobooth had problems uploading the file, check photobooth log for errors");
                throw new RuntimeException("photobooth had problems uploading the file, check photobooth log for errors");
            }
            // continue loop but wait little time (otherwise 100% cpu!)
            # 0.5 sec is sufficient to check
            usleep(500 * 1000);
            $time_waited += 0.5;
        } while ($time_waited <= $TIMEOUT_DOWNLOAD);

        text_to_image("timeout while waiting for fotobox to upload file");
        throw new RuntimeException("timeout while waiting for fotobox to upload file");
    } elseif ($_GET["action"] == "list") {
        echo "<pre>";
        $results = $db->query("SELECT * FROM upload_requests ORDER BY last_modified DESC");
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            print_r($row);
        }
        echo "</pre>";
    } elseif ($_GET["action"] == "info") {
        // endpoint can be used by photobooth-app to check it's communicating with the correct URL
        echo json_encode([
            "version" => $VERSION,
            "name" => "photobooth-app fileupload extension",
        ]);
    } else {
        http_response_code(406);
        error_log("endpoint does not exist accessed");
        error_log(json_encode($_GET));
    }
} catch (RuntimeException $e) {
    http_response_code(500);

    error_log("runtime error: {$e->getMessage()}");
    error_log(json_encode($_GET));
    error_log(json_encode($_FILES));
}