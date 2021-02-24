import { getFiles } from './generator';
import { info } from '../../logger';
import * as xml from '../../xml';
import ComponentGenerator from './generator/ComponentGenerator';
import EntryFileGenerator from './generator/EntryFileGenerator';
import { buildPackage } from './builder/packBuilder';
import { error } from '../../logger';

// import { createFolder } from '../../helper';
import { IconRecord } from './generator/interface';

import ora from 'ora';
import path from 'path';

export function generate(from: string, to: string) {}

function build(from: string, to: string) {}

export default async function pack(from: string, to: string) {
  const spinner = ora('Start building vue icons').start();
  // used to record some key infos during compilation
  // which can be used for other features
  const iconRecord: Map<string, IconRecord> = new Map();
  const files = getFiles(from);

  if (files.length === 0) {
    info('There is no file exists in your source folder.');
    return;
  }

  // start build process
  const promises: Array<Promise<any>> = [];
  for (let filename of files) {
    const name = filename.slice(0, -4);
    const svgFilePath = path.join(from, filename);

    const promise = xml
      .resolveSvgFile(svgFilePath)
      .then((svgFileData: string | void) => {
        ComponentGenerator(to, name, svgFileData || '');

        iconRecord.set(name, {
          name: name,
        });
      });

    promises.push(promise);
  }

  return Promise.all(promises)
    .then(async () => {
      EntryFileGenerator(to, iconRecord, '');

      await buildPackage(to);
    })
    .then(() => {
      console.log();
      spinner.succeed('Build vue icons succeed!');
    })
    .catch((e) => {
      error(e);
    });
}
