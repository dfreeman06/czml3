# Copyright (c) 2021 Dane Freeman.
# Distributed under the terms of the Modified BSD License.


import json
from pathlib import Path

import jsonschema

HERE = Path(__file__).parent
SCHEMA = json.loads((HERE / "cesium.schema.json").read_text(encoding="utf-8"))


CesiumEntityValidator = jsonschema.Draft7Validator(SCHEMA)
