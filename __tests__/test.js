import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const actual1 = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json').trim());
const expected1 = readFile('result.json');
console.log('exp==', expected1);
console.log('act==', actual1);
 
test('result must be equal "result.json"', () => {
  expect(actual1).toEqual(expected1);
});