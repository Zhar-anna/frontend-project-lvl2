import  { readFileSync }  from 'fs';
import path from 'path';
import _ from 'lodash';
//import fs from 'fs';
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//(__dirname, '..', 'fixtures', filename);
 //fs.readFile(__filename, function(err, data)

const genDiff = (filepath1, filepath2) => {
//функция должна принимать на вход пути до файлов, и возвращать результат сравнения

const absolutePathToFile1 = path.resolve(filepath1);
const absolutePathToFile2 = path.resolve(filepath2);//path.resolve сама подставляет путь до текущей директории, если ей передан относительный путь.

//использую path.resolve(process.cwd(), file1).trim()

const dataFromFilepath1 = readFileSync(absolutePathToFile1, 'utf8'); //получить содержимое файлов - строку в формате JSON
const dataFromFilepath2 = readFileSync(absolutePathToFile2, 'utf8');

const file1obj = JSON.parse(dataFromFilepath1);//содержимое файлов преобразовать в объект.
const file2obj = JSON.parse(dataFromFilepath2);

const arrKeyFile1 = _.keys(file1obj); //Получите все ключи из обоих объектов
const arrKeyFile2 = _.keys(file2obj);//Именно с полученными объектами работает функция, сравнивающая их по ключам и значениям и собирающая строку-результат.

//const unionKeys = _.sort(_.union(arrKeyFile1, arrKeyFFile2)); // затем найдите их объединение, тот самый единый массив. 
//for (const key of unionKeys) {
const sortedKeys = _.sortBy(_.union(arrKeyFile1, arrKeyFile2));

let result = {};
result = sortedKeys.map((key) => {
  const value1 = file1obj[key];
  const value2 = file2obj[key];
  if(_.has(file1obj, key) && _.has(file2obj, key)) {
    if (value1 === value2) {
      return {
        name: key,
        value1: value1,
        type: 'unchanged',
      }
    } else { 
      return {
        name: key,
        value1: value1,
        value2: value2,
        type: 'changed',
      }
    }
    } 
    if (!_.has(file2obj, key)) {
      return {
        name: key,
        value1: value1,
        type: 'deleted',
      }
    } 
    if (!_.has(file1obj, key) && _.has(file2obj, key)) {
      return {
        name: key,
        value2: value2,
        type: 'added',
      }
    };
  return result;// [ { name: 'follow', value: false, type: 'deleted' }, { name: 'host', value: 'hexlet.io', type: 'unchanged' }, { name: 'proxy', value: '123.234.53.22', type: 'deleted' }, { name: 'timeout', value1: 50, value2: 20, type: 'changed' }, { name: 'verbose', value: true, type: 'added' } ]
});
const parts = [];
result.forEach((item) => {
  if (`${item.type}` === 'deleted') {
   parts.push(`- ${item.name}: ${item.value1}`);
    }
  if (`${item.type}` === 'unchanged') {
    parts.push(`  ${item.name}: ${item.value1}`);
  }
  if (`${item.type}` === 'added') {
    parts.push(`+ ${item.name}: ${item.value2}`);
  }
  if (`${item.type}` === 'changed') {
    parts.push(`- ${item.name}: ${item.value1}`); 
    parts.push(`+ ${item.name}: ${item.value2}`);
}
});
const diffStr = parts.join('\n  ');
const toprint = `{\n  ${diffStr}\n}`;
return toprint;
};
export default genDiff;
 

// , Затем сравнивайте и проверяйте, что стало с каждым из ключей. (проходим reduce по уникальным ключам) в момент прохода reduce выполняется проверка на 4 условия (добавлено, удалено, измененно. не изменено)
//Если ключ есть в первом объекте, но отсутствует во втором - значит удалён. Если отсутствует в первом, но есть во втором - добавлен.  Когда вы встретили ключ, который изменён, сначала запишите в результат значение из первого объекта, а затем из второго.
//редьюсом получил новый объект


 
 //(ключ- состояние "same", "deleted", "changed" and "added")значение- функция-парсер вида : `({name, oldValue, newValue}) => {return `   + ${name}: ${newValue}\n   - ${name}: ${oldValue}`; }`
