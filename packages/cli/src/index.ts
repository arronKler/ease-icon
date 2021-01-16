#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import projectLib from './lib/project';
import buildLib from './lib/build';
import generateLib from './lib/generate';
import optimizeLib from './lib/optimize';
import publishLib from './lib/publish';
import packLib from './lib/pack';
import inquirer from 'inquirer';

/*  Setup */
const VERSION = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), {
    encoding: 'utf-8',
  }),
).version;

const program = new Command();

program.version(VERSION);

/*  Sub Commands */

// init
program
  .command('init [project]')
  .description('Create new icon project', {
    folder: 'Project folder path relative to your current directory',
  })
  .action((project: string) => {
    projectLib.initProject(project);
  });

// serve
program
  .command('serve')
  .description('Serve project site for running')
  .action(() => {
    console.log('Not supported now');
  });

// generate
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
  .action(async function (category: any, cmdObj: any) {
    const { type, scope, withBuild, withPublish } = cmdObj;

    const generateTypes = type.split(',');

    await generateLib.generate(
      generateTypes,
      category ? [category] : [],
      scope,
    );

    if (withBuild) {
      buildLib.build(generateTypes, category ? [category] : []);
    }
  });

// build
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
  .action(async function (category: any, cmdObj: any) {
    const { type, scope, onlyBuild } = cmdObj;

    const buildTypes = type.split(',');

    try {
      let buildAll = false;
      if (category === undefined) {
        const answer = await inquirer.prompt([
          {
            name: 'buildAll',
            type: 'confirm',
            message: 'This will build all source folders, do we continue?',
          },
        ]);

        buildAll = answer.buildAll;
      }

      if (!onlyBuild) {
        await generateLib.generate(
          buildTypes,
          buildAll ? [] : [category],
          scope,
        );
      }

      buildLib.build(buildTypes, buildAll ? [] : [category]);
    } catch (e) {
      console.error('Error:', e);
    }
  });

// clean
program
  .command('optimize [category]')
  .description(
    'Optimize source svg files, this may help you solve some issue when building components!',
  )
  .action(async function (category: any, cmdObj: any) {
    try {
      let buildAll = false;
      if (category === undefined) {
        const answer = await inquirer.prompt([]);

        optimizeLib.optimize();
      }
    } catch (e) {
      console.error('Optimize Error:', e);
    }
  });

// publish
program.command('publish <category>').action(function (category) {
  publishLib.publish(category);
});

// pack: single project use
program
  .command('pack <source> <dest>')
  .description('Single build mode for your project')
  .option('--font', 'specify build type is iconfont', false)
  // .option('-t, --type [type]', 'build type', 'vue')
  .action(function (source, dest, cmdObj) {
    const { font: isFont } = cmdObj;
    packLib.pack(source, dest, isFont);
  });

/* Default action */
program.action(() => {
  program.help();
});

program.parse(process.argv);
