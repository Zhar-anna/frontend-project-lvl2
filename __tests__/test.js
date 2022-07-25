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
const expectadPlain = readFile('plainOutput.txt');
const actualJsonPlain = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
const actualYamlPlain = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');

test('Compare JSON files to Stylish', () => {
  expect(actualJsonStylish).toEqual(expectedStylish);
});

test('Compare YAML files to Stylish', () => {
  expect(actualYamlStylish).toEqual(expectedStylish);
});

test('Compare JSON files to Plain', () => {
  expect(actualJsonPlain).toEqual(expectadPlain);
});

test('Compare YAML files to Plain', () => {
  expect(actualYamlPlain).toEqual(expectadPlain);
});
