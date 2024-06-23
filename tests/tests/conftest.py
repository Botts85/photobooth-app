import logging

import pytest

from photobooth.__main__ import _create_basic_folders
from photobooth.container import container
from photobooth.services.config import appconfig

logger = logging.getLogger(name=None)


@pytest.fixture(scope="session", autouse=True)
def global_session_setup():
    logger.debug("create basic folders")
    _create_basic_folders()


@pytest.fixture(scope="function", autouse=True)
def global_function_setup1():
    logger.info("global function-scoped mediaitem setup")

    if container.mediacollection_service.number_of_images == 0:
        logger.info("no mediaitem in collection, creating one image")
        container.start()
        if container.mediacollection_service.number_of_images == 0:
            container.processing_service.trigger_action("image", 0)
            container.processing_service.wait_until_job_finished()
        container.stop()

    yield


@pytest.fixture(scope="function", autouse=True)
def global_function_setup2():
    logger.info("global function-scoped appconfig reset and optimization for speed reasons")

    appconfig.reset_defaults()

    appconfig.actions.image[0].jobcontrol.countdown_capture = 0.2
    appconfig.actions.collage[0].jobcontrol.countdown_capture = 0.2
    appconfig.actions.collage[0].jobcontrol.countdown_capture_second_following = 0.2
    appconfig.actions.animation[0].jobcontrol.countdown_capture = 0.2
    appconfig.actions.animation[0].jobcontrol.countdown_capture_second_following = 0.2
    appconfig.actions.video[0].jobcontrol.countdown_capture = 0.2

    yield


# @pytest.fixture(scope="module", autouse=True)
# def session_setup1():
#     print("test")
#     logger.warning("hallo")

#     yield "some stuff"
