import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected1 = readFile('result.txt');
console.log('exp==', expected1);
console.log('act==', actual1);
test('result must be equal "result.txt"', () => {
  expect(actual1).toEqual(expected1);
});
