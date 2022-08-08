import fs from 'fs';
import path from 'path';
import diffTree from './findDiff.js';
import getParser from './parsers.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFromFilepath1 = readFile(filepath1);
  const dataFromFilepath2 = readFile(filepath2);
  const file1obj = getParser(dataFromFilepath1, getFileFormat(filepath1));
  const file2obj = getParser(dataFromFilepath2, getFileFormat(filepath2));
  const diff = diffTree(file1obj, file2obj);
  return getFormat(diff, format);
};

export default genDiff;
