from pathlib import Path
import shutil

ROOT = Path(__file__).parent.parent
NODE_MODULES = ROOT / "node_modules"
CESIUM_SRC = NODE_MODULES / "cesium/Build/Cesium"
CESIUM_ASSETS = ROOT / "cesium"
INDEX = CESIUM_ASSETS / "index.html"
STATIC_SRC = ROOT / "src/_static.ts"


TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <!-- Include the CesiumJS JavaScript and CSS files -->
  <script src="./Cesium.js"></script>
  <link href="./Widgets/widgets.css" rel="stylesheet">
</head>
<body>
  <div id="cesiumContainer"></div>
  <script>
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain()
    });
  </script>
 </div>
</body>
</html>"""


def ignore(path, children):
    """ Omit some data
    """
    return [
        c for c in children if c.endswith(".d.ts")
    ]


def copy():
    if CESIUM_ASSETS.exists():
        shutil.rmtree(CESIUM_ASSETS)

    shutil.copytree(CESIUM_SRC, CESIUM_ASSETS, ignore=ignore)

def template():
    INDEX.write_text(TEMPLATE)

def loader_src():
    lines = []
    for path in sorted(CESIUM_ASSETS.rglob("*")):
        if path.is_dir():
            continue

        relpath = path.relative_to(ROOT).as_posix()
        parent = path.parent.relative_to(ROOT).as_posix()
        lines += [
            f"""import '!!file-loader?name={parent}/[name].[ext]&context=.!../{relpath}';"""
        ]

    STATIC_SRC.write_text("\n".join(lines))

if __name__ == "__main__":
    copy()
    template()
    loader_src()
