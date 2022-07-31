import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Compare files to Stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('stylishOutput.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('stylishOutput.txt'));
});

test('Compare files to Plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('plainOutput.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFile('plainOutput.txt'));
});

test('Compare files to JSON', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFile('outputresult.json'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(readFile('outputresult.json'));
});
