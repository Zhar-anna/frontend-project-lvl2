#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();
program
  .version('0.0.1', '-v, --version' , 'output the version number')
  .description('Compares two configuration files and show a difference.');
program.parse();
