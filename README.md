
# czml3

[![Build Status](https://travis-ci.org/poliastro/czml3.svg?branch=master)](https://travis-ci.org/poliastro/czml3)
[![codecov](https://codecov.io/gh/poliastro/czml3/branch/master/graph/badge.svg)](https://codecov.io/gh/poliastro/czml3)


Python 3 library to write CZML

## Installation

_TODO conda packaging_


## Development Installation
_Assumes Base Environment with Anaconda Project_
Create a dev environment and start the JupyterLab server:
```bash
anaconda-project run setup
anaconda-project run lab
```

### How to see your changes
#### Typescript:

To start typescript watchers and jupyterlab watchers:
```bash
anaconda-project run watch
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.
