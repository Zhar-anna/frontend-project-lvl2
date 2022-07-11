import  { readFileSync }  from 'fs';
//import path from 'path';
import _ from lodash;
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';

const genDiff = (filepath1, filepath2) => {

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//const absoluteFile = path.resolve(filepath1 );

//начала я использую path.resolve(process.cwd(), file1).trim(), затем читаю с помощью readFileSync и затем уже преобразую в объект с помощью JSON.parse()
//функция должна принимать на вход пути до файлов, и возвращать результат сравнения
const dataFromFilepath1 = readFileSync(filepath1, 'utf8'); //получить содержимое файлов - строку в формате JSON
const dataFromFilepath2 = readFileSync(filepath2, 'utf8');

const file1obj = JSON.parse(dataFromFilepath1);//содержимое файлов преобразовать в объект.
const file2obj = JSON.parse(dataFromFilepath2);

const arrKeyFromFile1 = Object.key(file1obj); //Получите все ключи из обоих объектов
const arrKeyFromFile2 = Object.key(file2obj);

const unionKeys = _.union(arrKeyFromFile1, arrKeyFromFile2); // затем найдите их объединение, тот самый единый массив. 

};
export default genDiff;
 //Именно с полученными объектами работает функция, сравнивающая их по ключам и значениям и собирающая строку-результат.

// , Затем сравнивайте и проверяйте, что стало с каждым из ключей. (проходим reduce по уникальным ключам 4) в момент прохода reduce выполняется проверка на 4 условия (добавлено, удалено, измененно. не изменено)
//Если ключ есть в первом объекте, но отсутствует во втором - значит удалён. Если отсутствует в первом, но есть во втором - добавлен.  Когда вы встретили ключ, который изменён, сначала запишите в результат значение из первого объекта, а затем из второго.
//редьюсом получил новый объект

//path.resolve и process.cwd

//перевод пути в объект
//path.resolve сама подставляет путь до текущей директории, если ей передан относительный путь.
//(__dirname, '..', 'fixtures', filename)
 
 //(ключ- состояние "same", "deleted", "changed" and "added")значение- функция-парсер вида : `({name, oldValue, newValue}) => {return `   + ${name}: ${newValue}\n   - ${name}: ${oldValue}`; }`
 //var fs = require('fs');
 //fs.readFile(__filename, function(err, data)