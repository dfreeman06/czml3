#!/usr/bin/env python
# coding: utf-8

# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.

from .widget import CZMLWidget
from ._version import __version__, version_info

def _jupyter_labextension_paths():
    """Called by Jupyter Lab Server to detect if it is a valid labextension and
    to install the widget
    Returns
    =======
    src: Source directory name to copy files from. Webpack outputs generated files
        into this directory and Jupyter Lab copies from this directory during
        widget installation
    dest: Destination directory name to install widget files to. Jupyter Lab copies
        from `src` directory into <jupyter path>/labextensions/<dest> directory
        during widget installation
    """
    return [{
        'src': 'labextension',
        'dest': '@poliastro/czml3',
    }]

