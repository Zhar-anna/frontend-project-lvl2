/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();
const actual1 = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json').trim());
const expected1 = readFile('result.txt').trim();
console.log('exp==', expected1);
console.log('act==', actual1);
test('result must be equal "result.txt"', () => {
  expect(actual1).toEqual(expected1);
});
