# Copyright (c) 2021 Dane Freeman.
# Distributed under the terms of the Modified BSD License.


import json
from pathlib import Path

import jsonschema

HERE = Path(__file__).parent
ENTITY_SCHEMA = json.loads((HERE / "cesium.entity.schema.json").read_text(encoding="utf-8"))
VIEWER_SCHEMA = json.loads((HERE / "cesium.viewer.schema.json").read_text(encoding="utf-8"))


CesiumEntityValidator = jsonschema.Draft7Validator(ENTITY_SCHEMA)
CesiumViewerValidator = jsonschema.Draft7Validator(VIEWER_SCHEMA)