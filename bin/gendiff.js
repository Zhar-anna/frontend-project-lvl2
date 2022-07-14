#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and show a diference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    // const diference = option.f ? 1 : undefined;
    console.log(genDiff(filepath1, filepath2));// результат из индекса
  });
program.parse();

export default genDiff;
