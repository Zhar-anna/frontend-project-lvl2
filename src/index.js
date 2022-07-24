import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => filepath.split('.').reverse()[0];
const findDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  // затем найдите их объединение, тот самый единый массив
  const result = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        value: findDiff(obj1[key], obj2[key]),
        type: 'nested',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (!_.has(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        type: 'added',
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return {
          name: key,
          value1: obj1[key],
          value2: obj2[key],
          type: 'changed',
        };
      }
    }
    return {
      name: key,
      value: obj1[key],
      type: 'unchanged',
    };
  });
  // [ { name: 'follow', value: false, type: 'deleted' },
  // { name: 'host', value: 'hexlet.io', type: 'unchanged' },
  // { name: 'proxy', value: '123.234.53.22', type: 'deleted' },
  // { name: 'timeout', value1: 50, value2: 20, type: 'changed' },
  // { name: 'verbose', value: true, type: 'added' } ]
  console.log(JSON.stringify(result));
};
// получить содержимое файлов - строку в формате JSON
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // функция должна принимать на вход пути до файлов, и возвращать результат сравнения
  const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
  const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');
  const dataFromFilepath1 = readFile(filepath1);
  const dataFromFilepath2 = readFile(filepath2);
  const file1obj = getParser(dataFromFilepath1, getFileFormat(filepath1));
  // содержимое файлов преобразовать в объект.
  const file2obj = getParser(dataFromFilepath2, getFileFormat(filepath2));
  const diff = findDiff(file1obj, file2obj);
  return getFormat(diff, format);
};

export default genDiff;
