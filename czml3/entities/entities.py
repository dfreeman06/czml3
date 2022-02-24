# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.


from ipywidgets import Widget, widget_serialization, register
from ipywidgets.widgets.trait_types import TypedTuple
from traitlets import Unicode, Bool, Instance, Tuple
# from ipywidgets.widgets import CallbackDispatcher
from .._frontend import module_name, module_version

@register
class Entity(Widget):
    _model_name = Unicode('CZMLEntityModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("CZMLEntityView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    name = Unicode(allow_none=True).tag(sync=True)
    id = Unicode(default_value="").tag(sync=True)
    show = Bool(default_value=True).tag(sync=True)


class EntityCollection(Widget):
    _model_name = Unicode('CZMLEntityCollectionModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    values = TypedTuple(trait=Instance(Entity), kw={}).tag(sync=True, **widget_serialization)
    # values = Tuple(kw={}).tag(sync=True, **widget_serialization)

    def add(self, entity: Entity):
        pass

    def remove(self, entity: Entity):
        pass
