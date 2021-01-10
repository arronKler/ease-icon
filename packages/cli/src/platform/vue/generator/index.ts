import path from 'path';
import fs from 'fs';

import ComponentGenerator from './ComponentGenerator';
import EssentialFileGenerator from './EssentialFileGenerator';
import EntryFileGenerator from './EntryFileGenerator';

import { GenerateOptions, IconRecord } from './interface';

import * as helper from '../../../helper';
import * as xml from '../../../xml';

function getFiles(sourcePackagePath: string): string[] {
  let files = fs.readdirSync(sourcePackagePath);

  // filter
  files = files.filter((filename: string) => {
    return filename.endsWith('.svg');
  });

  return files;
}

function generatePackage(from: string, to: string, category: string) {
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
    const rawFilename = filename.slice(0, -4);
    const svgFilePath = path.join(sourcePackagePath, filename);

    console.log('frr', rawFilename);

    const promise = xml
      .resolveSvgFile(svgFilePath)
      .then((svgFileData: string | void) => {
        ComponentGenerator(
          outputPackageIconsPath,
          rawFilename,
          svgFileData || '',
        );

        iconRecord.set(rawFilename, {
          name: rawFilename,
        });
      });

    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    console.log(iconRecord);

    EntryFileGenerator(outputPackagePath, iconRecord);
    EssentialFileGenerator(outputPackagePath, category);
  });
}

export function generator(
  from: string,
  to: string,
  categories: Array<string>,
  opts: GenerateOptions,
) {
  for (let category of categories) {
    generatePackage(from, to, category);
  }
}
