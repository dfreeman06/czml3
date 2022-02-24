#!/usr/bin/env python
# coding: utf-8

# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
from datetime import datetime
from ipywidgets import DOMWidget, Widget, widget_serialization
from ipywidgets.widgets.trait_types import TypedTuple
from traitlets import Unicode, Instance, Float
from typing import Optional
from ipywidgets.widgets import CallbackDispatcher
from ._frontend import module_name, module_version
from .trait_types import Schema
from .schema import CesiumEntityValidator, CesiumViewerValidator
from .serialization import date_serialization

from .datasource import DataSource


class Cartesian3(Widget):
    _model_name = Unicode('CZMLCartesian3Model').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    x = Float(default_value=0).tag(sync=True)
    y = Float(default_value=0).tag(sync=True)
    z = Float(default_value=0).tag(sync=True)

class CZMLCamera(Widget):
    _model_name = Unicode('CZMLCameraModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    _camera = Unicode().tag(sync=True)
    # TODO should position / direction be widgets or typedtuples (namedtuple?)
    position = Instance(Cartesian3, kw={}).tag(sync=True, **widget_serialization)
    direction = Instance(Cartesian3, kw={}).tag(sync=True, **widget_serialization)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._move_handlers = CallbackDispatcher()
        self.on_msg(self._handle_widget_msg)

    # useful events to be able to listen for...
    def on_move(self, callback, remove=False):
        """Register a callback to execute when the camera position or direction
        is updated"""
        self._move_handlers.register_callback(callback, remove=remove)

    def _handle_widget_msg(self, _, content, buffers):
        """Handle a msg from the front-end.
        Parameters
        ----------
        content: dict
            Content of the msg.
        """
        if content.get('event', '') == 'move':
            self.move()

    def move(self):
        """Programmatically trigger a move event.
        This will call the callbacks registered to the camera
        widget instance.
        """
        self._move_handlers(self)

    def fly_to(self, destination: Cartesian3, orientation: Optional[Cartesian3] = None):
        options = {
            "destination": destination
        }

        if orientation:
            options["orientation"] = orientation

        self.send({
            "action": "flyTo",
            "options": options, # should be schema checked
        })

class CZMLClock(Widget):

    _model_name = Unicode('CZMLClockModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    _clock = Unicode().tag(sync=True)
    start_time = Instance(datetime, allow_none=True).tag(sync=True, **date_serialization)
    stop_time = Instance(datetime, allow_none=True).tag(sync=True, **date_serialization)
    current_time = Instance(datetime, allow_none=True).tag(sync=True, **date_serialization)

    multiplier = Float().tag(sync=True)

    # useful events to be able to listen for...
    def on_stop(self):
        #onStop event
        pass

    def on_tick(self):
        #onTick event
        pass


class CZMLWidget(DOMWidget):

    _model_name = Unicode('CZMLModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('CZMLView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    options = Schema(validator=CesiumViewerValidator).tag(sync=True)

    document = TypedTuple(Schema(validator=CesiumEntityValidator)).tag(sync=True)
    camera = Instance(CZMLCamera).tag(sync=True, **widget_serialization)
    clock = Instance(CZMLClock).tag(sync=True, **widget_serialization)
    datasources = TypedTuple(Instance(DataSource), kw={}).tag(sync=True, **widget_serialization)

    def __init__(self, **kwargs) -> None:
        if "camera" not in kwargs:
            kwargs["camera"] = CZMLCamera()
        if "clock" not in kwargs:
            kwargs["clock"] = CZMLClock()
        super().__init__(**kwargs)
    # document = attr.ib(default=Document([Preamble()]))
    # cesium_version = attr.ib(default="1.88")
    # ion_token = attr.ib(default="")
    # terrain = attr.ib(default=TERRAIN["Ellipsoid"])
    # imagery = attr.ib(default=IMAGERY["OSM"])

