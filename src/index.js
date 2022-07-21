import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers.js';
import getFormat from './formatters/index.js';

const getFileFormat = (path) => path.split('.').reverse()[0];
// Определить здесь формат, прочеть и отправить на парсинг. вернуть и вытащить ключи
const findDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...obj1, ...obj2}));
  // затем найдите их объединение, тот самый единый массив
  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (value1 === value2) {
        return {
          name: key,
          value1,
          type: 'unchanged',
        };
      }
      return {
        name: key,
        value1,
        value2,
        type: 'changed',
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        value1,
        type: 'deleted',
      };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        name: key,
        value2,
        type: 'added',
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        name: key,
        value: findDiff(obj1[key], obj2[key]),
        type: 'nested',
      };
    }
    return result;
  })
    // [ { name: 'follow', value: false, type: 'deleted' },
    // { name: 'host', value: 'hexlet.io', type: 'unchanged' },
    // { name: 'proxy', value: '123.234.53.22', type: 'deleted' },
    // { name: 'timeout', value1: 50, value2: 20, type: 'changed' },
    // { name: 'verbose', value: true, type: 'added' } ]
  };
// получить содержимое файлов - строку в формате JSON
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // функция должна принимать на вход пути до файлов, и возвращать результат сравнения
  const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
  // path.resolve сама подставляет путь до текущей директории, если ей передан относительный путь
  // использую path.resolve(process.cwd(), file1).trim()
  const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');
  const dataFromFilepath1 = readFile(filepath1);
  const dataFromFilepath2 = readFile(filepath2);
  const file1obj = getParser(dataFromFilepath1, getFileFormat(filepath1));
  // содержимое файлов преобразовать в объект.
  const file2obj = getParser(dataFromFilepath2, getFileFormat(filepath2));
  // Именно с полученными объектами работает функция, сравнивающая их по
  // ключам и значениям и собирающая строку-результат
  
//   const parts = [];
//   result.forEach((item) => {
//     if (`${item.type}` === 'deleted') {
//       parts.push(`- ${item.name}: ${item.value1}`);
//     }
//     if (`${item.type}` === 'unchanged') {
//       parts.push(`  ${item.name}: ${item.value1}`);
//     }
//     if (`${item.type}` === 'added') {
//       parts.push(`+ ${item.name}: ${item.value2}`);
//     }
//     if (`${item.type}` === 'changed') {
//       parts.push(`- ${item.name}: ${item.value1}`);
//       parts.push(`+ ${item.name}: ${item.value2}`);
//     }
//   });
//   const diffStr = parts.join('\n  ');
//   const toprint = `{\n  ${diffStr}\n}`;
//   return toprint;
// };
const diff = findDiff(file1obj, file2obj);
return getFormat(diff, format);
};
export default genDiff;

