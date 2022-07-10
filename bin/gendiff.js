#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .version('0.0.1', '-v, --version','output the version number')
  .description('Compares two configuration files and show a diference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, option) => {
    //const diference = option.f ? 1 : undefined;
    console.log(str.split(option.separator, limit));//результат из индекса
  });
  
program.parse();
