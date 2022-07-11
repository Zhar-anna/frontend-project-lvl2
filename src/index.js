import  { readFileSync }  from 'fs';
import path from 'path';
import _ from 'lodash';
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

const arrKeyFromFile1 = _.keys(file1obj); //Получите все ключи из обоих объектов
const arrKeyFromFile2 = _.keys(file2obj);//Именно с полученными объектами работает функция, сравнивающая их по ключам и значениям и собирающая строку-результат.

const unionKeys = _.union(arrKeyFromFile1, arrKeyFromFile2); // затем найдите их объединение, тот самый единый массив. 
const result  = {};
for (const key of unionKeys) {
  const cb = (acc, key) => {
    if(_.has(dataFromFilepath1, key) && !_.has(dataFromFilepath2, key)) {

    }
    if(!_.has(dataFromFilepath1, key) && _.has(dataFromFilepath2, key)) {

    }
  }
    
}
   //true/false
return result;
};
export default genDiff;
 

// , Затем сравнивайте и проверяйте, что стало с каждым из ключей. (проходим reduce по уникальным ключам) в момент прохода reduce выполняется проверка на 4 условия (добавлено, удалено, измененно. не изменено)
//Если ключ есть в первом объекте, но отсутствует во втором - значит удалён. Если отсутствует в первом, но есть во втором - добавлен.  Когда вы встретили ключ, который изменён, сначала запишите в результат значение из первого объекта, а затем из второго.
//редьюсом получил новый объект


 
 //(ключ- состояние "same", "deleted", "changed" and "added")значение- функция-парсер вида : `({name, oldValue, newValue}) => {return `   + ${name}: ${newValue}\n   - ${name}: ${oldValue}`; }`
