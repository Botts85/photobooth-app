"""
backend opencv2 for webcameras
"""
import time
from multiprocessing import Process, Event, shared_memory, Condition, Lock
import logging
import platform
import json
import dataclasses
import cv2
from turbojpeg import TurboJPEG
from pymitter import EventEmitter
from src.imageserverabstract import (
    ImageServerAbstract,
    compile_buffer,
    decompile_buffer,
    SharedMemoryDataExch,
)
from src.configsettings import settings

logger = logging.getLogger(__name__)
turbojpeg = TurboJPEG()


class ImageServerWebcamCv2(ImageServerAbstract):
    """
    opencv2 backend implementation for webcameras
    """

    def __init__(self, evtbus: EventEmitter, enable_stream):
        super().__init__(evtbus, enable_stream)
        # public props (defined in abstract class also)
        self.exif_make = "Photobooth WebcamCv2"
        self.exif_model = "Custom"
        self.metadata = {}

        # private props
        self._evtbus = evtbus

        self._img_buffer_lores: SharedMemoryDataExch = SharedMemoryDataExch()
        self._img_buffer_hires: SharedMemoryDataExch = SharedMemoryDataExch()
        self._event_hq_capture: Event = Event()

        self._p = Process(
            target=img_aquisition,
            name="ImageServerWebcamCv2AquisitionProcess",
            args=(
                self._img_buffer_lores.sharedmemory.name,
                self._img_buffer_hires.sharedmemory.name,
                self._img_buffer_lores.lock,
                self._img_buffer_hires.lock,
                self._event_hq_capture,
                self._img_buffer_lores.condition,
                self._img_buffer_hires.condition,
                settings,
            ),
            daemon=True,
        )

        self._on_preview_mode()

    def start(self):
        """To start the FrameServer, you will also need to start the Picamera2 object."""
        # start camera
        self._p.start()

        logger.debug(f"{self.__module__} started")

    def stop(self):
        self._img_buffer_lores.sharedmemory.close()
        self._img_buffer_lores.sharedmemory.unlink()
        self._img_buffer_hires.sharedmemory.close()
        self._img_buffer_hires.sharedmemory.unlink()
        self._p.terminate()
        self._p.join(1)
        self._p.close()

        logger.debug(f"{self.__module__} stopped")

    def wait_for_hq_image(self):
        """for other threads to receive a hq JPEG image"""
        self._evtbus.emit("frameserver/onCapture")

        # get img off the producing queue
        with self._img_buffer_hires.condition:
            if not self._img_buffer_hires.condition.wait(2):
                raise IOError("timeout receiving frames")

            with self._img_buffer_hires.lock:
                img = decompile_buffer(self._img_buffer_hires.sharedmemory)

        self._evtbus.emit("frameserver/onCaptureFinished")

        # return to previewmode
        self._on_preview_mode()

        return img

    def gen_stream(self):
        last_time = time.time_ns()
        while True:
            buffer = self._wait_for_lores_image()

            now_time = time.time_ns()
            if (now_time - last_time) / 1000**3 >= (
                1 / settings.common.LIVEPREVIEW_FRAMERATE
            ):
                last_time = now_time

                yield (
                    b"--frame\r\n"
                    b"Content-Type: image/jpeg\r\n\r\n" + buffer + b"\r\n\r\n"
                )

    def trigger_hq_capture(self):
        self._event_hq_capture.set()
        self._on_capture_mode()

    #
    # INTERNAL FUNCTIONS
    #

    def _wait_for_lores_frame(self):
        """autofocus not supported by this backend"""
        raise NotImplementedError()

    def _wait_for_lores_image(self):
        """for other threads to receive a lores JPEG image"""
        with self._img_buffer_lores.condition:
            if not self._img_buffer_lores.condition.wait(2):
                raise IOError("timeout receiving frames")

            with self._img_buffer_lores.lock:
                img = decompile_buffer(self._img_buffer_lores.sharedmemory)
            return img

    def _on_capture_mode(self):
        logger.debug("change to capture mode requested - ignored for cv2 backend")

    def _on_preview_mode(self):
        logger.debug("change to preview mode requested - ignored for cv2 backend")

    def _publish_sse_initial(self):
        self._publish_sse_metadata()

    def _publish_sse_metadata(self):
        self._evtbus.emit(
            "publishSSE",
            sse_event="frameserver/metadata",
            sse_data=json.dumps(self.metadata),
        )


#
# INTERNAL IMAGE GENERATOR
#


def img_aquisition(
    shm_buffer_lores_name,
    shm_buffer_hires_name,
    _img_buffer_lores_lock,
    _img_buffer_hires_lock,
    _event_hq_capture: Event,
    _condition_img_buffer_lores_ready: Condition,
    _condition_img_buffer_hires_ready: Condition,
    # need to pass settings, because unittests can change settings,
    # if not passed, the settings are not available in the separate process!
    _settings,
):
    """
    process function to gather webcam images
    """
    # init

    shm_lores = shared_memory.SharedMemory(shm_buffer_lores_name)
    shm_hires = shared_memory.SharedMemory(shm_buffer_hires_name)

    if platform.system() == "Windows":
        logger.info(
            "force VideoCapture to DSHOW backend on windows (MSMF is buggy and crashes app)"
        )
        _video = cv2.VideoCapture(_settings.backends.cv2_device_index, cv2.CAP_DSHOW)
    else:
        _video = cv2.VideoCapture(_settings.backends.cv2_device_index)

    if not _video.isOpened():
        raise IOError(f"cannot open camera index {_settings.backends.cv2_device_index}")

    if not _video.read()[0]:
        raise IOError(f"cannot read camera index {_settings.backends.cv2_device_index}")

    logger.info(f"webcam cv2 using backend {_video.getBackendName()}")

    # activate preview mode on init
    _video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*"MJPG"))
    _video.set(cv2.CAP_PROP_FPS, 30.0)
    _video.set(cv2.CAP_PROP_BUFFERSIZE, 2)  # low number for lowest lag
    _video.set(cv2.CAP_PROP_FRAME_WIDTH, _settings.common.CAPTURE_CAM_RESOLUTION_WIDTH)
    _video.set(
        cv2.CAP_PROP_FRAME_HEIGHT, _settings.common.CAPTURE_CAM_RESOLUTION_HEIGHT
    )

    # read first five frames and send to void
    for _ in range(5):
        _, _ = _video.read()

    while True:
        ret, array = _video.read()
        # ret=True successful read, otherwise False?
        if not ret:
            raise IOError("error reading camera frame")

        # apply flip image to stream only:
        if _settings.common.CAMERA_TRANSFORM_HFLIP:
            array = cv2.flip(array, 1)
        if _settings.common.CAMERA_TRANSFORM_VFLIP:
            array = cv2.flip(array, 0)

        if _event_hq_capture.is_set():
            _event_hq_capture.clear()

            # one time hq still
            array = cv2.fastNlMeansDenoisingColored(array, None, 2, 2, 3, 9)

            # convert frame to jpeg buffer
            jpeg_buffer = turbojpeg.encode(
                array, quality=_settings.common.HIRES_STILL_QUALITY
            )
            # put jpeg on queue until full. If full this function blocks until queue empty
            with _img_buffer_hires_lock:
                compile_buffer(shm_hires, jpeg_buffer)

            with _condition_img_buffer_hires_ready:
                # wait to be notified
                _condition_img_buffer_hires_ready.notify_all()
        else:
            # preview livestream
            jpeg_buffer = turbojpeg.encode(
                array, quality=_settings.common.LIVEPREVIEW_QUALITY
            )
            # put jpeg on queue until full. If full this function blocks until queue empty
            with _img_buffer_lores_lock:
                compile_buffer(shm_lores, jpeg_buffer)

            with _condition_img_buffer_lores_ready:
                # wait to be notified
                _condition_img_buffer_lores_ready.notify_all()


def available_camera_indexes():
    """
    detect device indexes with usb camera connected

    Returns:
        _type_: _description_
    """
    # checks the first 10 indexes.

    index = 0
    arr = []
    i = 10
    while i > 0:
        cap = cv2.VideoCapture(index)
        if cap.read()[0]:
            arr.append(index)
            cap.release()
        index += 1
        i -= 1

    return arr