#!/usr/bin/env python
# coding: utf-8

# Copyright (c) czml3 contributors.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..widget import ExampleWidget


def test_example_creation_blank():
    w = ExampleWidget()
    assert w.value == 'Hello World'
