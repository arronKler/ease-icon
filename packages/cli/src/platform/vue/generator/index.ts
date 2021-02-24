import path from 'path';
import fs from 'fs';
import ora from 'ora';

import ComponentGenerator from './ComponentGenerator';
import EssentialFileGenerator from './EssentialFileGenerator';
import EntryFileGenerator from './EntryFileGenerator';

import { GenerateOptions, IconRecord } from './interface';

import * as helper from '../../../helper';
import * as xml from '../../../xml';
import { buildPackage } from '../builder/packBuilder';

export function getFiles(sourcePackagePath: string): string[] {
  let files = fs.readdirSync(sourcePackagePath);

  // filter
  files = files.filter((filename: string) => {
    return filename.endsWith('.svg');
  });

  return files;
}

export function generatePackage(from: string, to: string, category: string) {
  const spinner = ora(`Generating package ${category} ...`).start();

  // used to record some key infos during compilation
  // which can be used for other features
  const iconRecord: Map<string, IconRecord> = new Map();

  const sourcePackagePath = path.join(from, category);
  const outputPackagePath = path.join(to, category);
  const outputPackageIconsPath = path.join(outputPackagePath, 'icons');

  const files = getFiles(sourcePackagePath);

  if (files.length === 0) return; // stop if no svg file needs to compile

  helper.createFolder(to, category);
  helper.createFolder(outputPackagePath, 'icons');

  // generate each component
  const promises: Array<Promise<any>> = [];
  for (let filename of files) {
    const name = filename.slice(0, -4);
    const svgFilePath = path.join(sourcePackagePath, filename);

    const promise = xml.resolveSvgFile(svgFilePath).then((svgResult) => {
      const [svgFileData, colors] = svgResult;
      ComponentGenerator(
        outputPackageIconsPath,
        name,
        svgFileData || '',
        colors,
      );

      iconRecord.set(name, {
        name: name,
      });
    });

    promises.push(promise);
  }

  return Promise.all(promises)
    .then(async () => {
      EntryFileGenerator(outputPackagePath, iconRecord);
      EssentialFileGenerator(outputPackagePath, category);

      // transform vue jsx syntax to h() function
      await buildPackage(outputPackageIconsPath);
    })
    .then(() => {
      spinner.succeed(`Generate package ${category} succeed!`);
    });
}

export async function generator(
  from: string,
  to: string,
  categories: Array<string>,
  opts?: GenerateOptions,
) {
  for (let category of categories) {
    await generatePackage(from, to, category);
  }
}
