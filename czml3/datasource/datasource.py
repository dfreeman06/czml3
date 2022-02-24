# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.


from ipywidgets import Widget, widget_serialization
from ipywidgets.widgets.trait_types import TypedTuple
from traitlets import Unicode, Instance, Float
from typing import Optional
from ipywidgets.widgets import CallbackDispatcher
from .._frontend import module_name, module_version



from ..entities import EntityCollection
from typing import Awaitable, Dict
from asyncio import Future
from ..schema import  CesiumEntityValidator

class DataSource(Widget):
    _model_name = Unicode('CZMLDataSourceModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    name = Unicode().tag(sync=True)
    entities = Instance(EntityCollection, kw={}).tag(sync=True, **widget_serialization)


class CzmlDataSource(DataSource):
    _model_name = Unicode('CZMLCzmlDataSourceModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    @classmethod
    def load(cls, czml: Dict, options=None)->Awaitable["CzmlDataSource"]:
        result = Future()
        # errors = CesiumEntityValidator.validate(czml)
        errors = False
        if errors:
            result.exception(Exception(f"{errors}"))
        else:
            wgt = cls()
            wgt.send({
                "action": "load",

                "czml": czml
                # "options": options, # should be schema checked
            })
            #TODO resolve loaded...
            return wgt

        return result