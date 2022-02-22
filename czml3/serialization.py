from datetime import datetime, timezone
from typing import Dict, Optional
from ipywidgets import DOMWidget

from .constants import ISO8601_FORMAT_Z, ISO8601_FORMAT_MILLI_Z

NON_DELETE_PROPERTIES = ["id", "delete"]


def date_to_json(model: datetime, widget: DOMWidget) -> Optional[Dict]:
    """Function to serialize a dictionary of symbols for use in a diagram

    :param defs: dictionary of Symbols
    :param diagram: elk diagram widget
    :return: json dictionary
    """
    if model is None:
        return None
    #  Cesium can convert time with timezone info
    return model.isoformat()


def date_from_json(js: str, manager) -> datetime:
    if not js:
        return None
    # return datetime.fromisoformat(js)
    if "." in js:
        dt = datetime.strptime(js, ISO8601_FORMAT_MILLI_Z)
    else:
        dt = datetime.strptime(js, ISO8601_FORMAT_Z)
    # Cesium returns timestamp in UTC
    return dt.replace(tzinfo=timezone.utc)



date_serialization = {"to_json": date_to_json, "from_json": date_from_json}

