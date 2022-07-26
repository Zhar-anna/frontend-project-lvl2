import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const actualJsonStylish = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
const expectedStylish = readFile('stylishOutput.txt');
const actualYamlStylish = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish');
const expectedPlain = readFile('plainOutput.txt');
const actualJsonPlain = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
const actualYamlPlain = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
const expectedJson = readFile('outputresult.json');
const actualJsontoJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
const actualYamltoJson = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json');

test('Compare files to Stylish', () => {
  expect(actualJsonStylish).toEqual(expectedStylish);
  expect(actualYamlStylish).toEqual(expectedStylish);
});

test('Compare files to Plain', () => {
  expect(actualJsonPlain).toEqual(expectedPlain);
  expect(actualYamlPlain).toEqual(expectedPlain);
});

test('Compare files to JSON', () => {
  expect(actualJsontoJson).toEqual(expectedJson);
  expect(actualYamltoJson).toEqual(expectedJson);
});
