#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import projectLib from './lib/project';
import buildLib from './lib/build';
import generateLib from './lib/generate';

/*  Setup */
const VERSION = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), {
    encoding: 'utf-8',
  }),
).version;

const program = new Command();

program.version(VERSION);

/*  Sub Commands */
program
  .command('init [project]')
  .description('Create new icon project', {
    folder: 'Project folder path relative to your current directory',
  })
  .action((project: string) => {
    projectLib.initProject(project);
  });

program
  .command('serve')
  .description('Serve project site for running')
  .action(() => {});

program
  .command('generate [category]')
  .description('generate icon into libs')
  .option(
    '-t, --type [type]',
    'generate type, you can pass multiple types like this: vue,react,iconfont',
    'vue',
  )
  .option('-s, --scope <scope>', 'package scope (only valid in the first time)')
  .option('-b, --with-build', 'build file after generate lib', false)
  .option('-p, --with-publish', 'publish after generate and build', false)
  .action(async function (category, cmdObj) {
    const { type, scope, withBuild, withPublish } = cmdObj;

    const generateTypes = type.split(',');

    await generateLib.generate(generateTypes, category ? [category] : [], scope);

    if (withBuild) {
      buildLib.build(generateTypes, category ? [category] : [])
    }
  });

program
  .command('build [category]')
  .description('build icon lib[s]')
  .option(
    '-t, --type [type]',
    'generate type, you can pass multiple types like this: vue,react,iconfont',
    'vue',
  )
  .option('-s, --scope <scope>', 'package scope (only valid in the first time)')
  .option('-b, --only-build', 'just generate package without build', false)
  .action(async function (category, cmdObj) {
    const { type, scope, onlyBuild } = cmdObj;

    const buildTypes = type.split(',');

    if (!onlyBuild) {
      await generateLib.generate(buildTypes, category ? [category] : [], scope);
    }

    buildLib.build(buildTypes, category ? [category] : []);
  });

program.command('publish').action(function () {});

program
  .command('deploy')
  .description('Run all process in single command: generate, build, deploy')
  .action(function () {});

/* Default action */
program.action(() => {
  program.help();
});

program.parse(process.argv);
