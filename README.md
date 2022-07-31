### Hexlet tests and linter status:
[![Actions Status](https://github.com/Zhar-anna/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Zhar-anna/frontend-project-lvl2/actions)

### CodeClimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/b254a28ac2621014c2be/maintainability)](https://codeclimate.com/github/Zhar-anna/frontend-project-lvl2/maintainability)

### Test Coverage:
[![Test Coverage](https://api.codeclimate.com/v1/badges/b254a28ac2621014c2be/test_coverage)](https://codeclimate.com/github/Zhar-anna/frontend-project-lvl2/test_coverage)

### My test:
[![test my project](https://github.com/Zhar-anna/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Zhar-anna/frontend-project-lvl2/actions/workflows/nodejs.yml)

# Description: 
**Generator of difference** is the CLI program that generate difference between two files. Supporting formats: JSON, YML, YAML.

## How to install:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```.
2. Clone repository: ```git@github.com:Zhar-anna/frontend-project-lvl2.git```.
3. Change directory to frontend-project-lvl2
4. Run the command: ```make install```.

## Run tests:
```shell
$ make test
```

## How to use:

You can use the project as a script in the terminal or as a library in your JavaScript project. You can format the difference in three styles: stylish (default), plain and json.
```shell
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help             display help for command
```

### Example JSON:
[![asciicast](https://asciinema.org/a/508084.svg)](https://asciinema.org/a/508084)

### Example YAML:
[![asciicast](https://asciinema.org/a/z6P3FKCjHjUZvVQeCimr5PwTz.svg)](https://asciinema.org/a/z6P3FKCjHjUZvVQeCimr5PwTz)

### Example nested files:
[![asciicast](https://asciinema.org/a/510377.svg)](https://asciinema.org/a/510377)

### Example plain format:
[![asciicast](https://asciinema.org/a/510713.svg)](https://asciinema.org/a/510713)

### Example JSON format
[![asciicast](https://asciinema.org/a/511044.svg)](https://asciinema.org/a/511044)