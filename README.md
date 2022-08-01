### Hexlet tests and linter status:
[![Actions Status](https://github.com/Zhar-anna/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Zhar-anna/frontend-project-lvl2/actions)

### CodeClimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/b254a28ac2621014c2be/maintainability)](https://codeclimate.com/github/Zhar-anna/frontend-project-lvl2/maintainability)

### Test Coverage:
[![Test Coverage](https://api.codeclimate.com/v1/badges/b254a28ac2621014c2be/test_coverage)](https://codeclimate.com/github/Zhar-anna/frontend-project-lvl2/test_coverage)

### My test:
[![test my project](https://github.com/Zhar-anna/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Zhar-anna/frontend-project-lvl2/actions/workflows/nodejs.yml)

# Описание: 
**Вычислитель отличий** это CLI программа, которая показывает различия между двумя файлами. Поддерживаемые форматы файлов: JSON, YML, YAML.

## Установка:
1. Убедитесь что у Вас установлен [Node.js](https://nodejs.org/en/) не ниже 12 версии: ```node -v```.
2. Клонируйте репозиторий: ```git@github.com:Zhar-anna/frontend-project-lvl2.git```.
3. Измените директорию на frontend-project-lvl2
4. Запустите команду: ```make install```.

## Запуск тестов:
```shell
$ make test
```

## Как использовать:

Вы можете использовать проект как скрипт в терминале или как библиотеку в Ваше проекте. Вы можете выводить изменения в трёх форматах: stylish (default), plain and json.

```shell
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help             display help for command
```

### Пример для файлов JSON:
[![asciicast](https://asciinema.org/a/508084.svg)](https://asciinema.org/a/508084)

### Пример для файлов YAML:
[![asciicast](https://asciinema.org/a/z6P3FKCjHjUZvVQeCimr5PwTz.svg)](https://asciinema.org/a/z6P3FKCjHjUZvVQeCimr5PwTz)

### Пример для файлов с вложенной структурой:
[![asciicast](https://asciinema.org/a/510377.svg)](https://asciinema.org/a/510377)

### Пример вывода плоского формата:
[![asciicast](https://asciinema.org/a/510713.svg)](https://asciinema.org/a/510713)

### Пример вывода в JSON формате:
[![asciicast](https://asciinema.org/a/511044.svg)](https://asciinema.org/a/511044)