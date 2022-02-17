#!/usr/bin/env python
# coding: utf-8

# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from ipywidgets.widgets.trait_types import TypedTuple
from traitlets import Unicode
from ._frontend import module_name, module_version
from .trait_types import Schema
from .schema import CesiumEntityValidator


class CZMLWidget(DOMWidget):

    _model_name = Unicode('CZMLModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('CZMLView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    document = TypedTuple(Schema(validator=CesiumEntityValidator)).tag(sync=True)

    # document = attr.ib(default=Document([Preamble()]))
    # cesium_version = attr.ib(default="1.88")
    # ion_token = attr.ib(default="")
    # terrain = attr.ib(default=TERRAIN["Ellipsoid"])
    # imagery = attr.ib(default=IMAGERY["OSM"])

