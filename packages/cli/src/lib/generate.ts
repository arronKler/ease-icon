import path, { format } from 'path';
import fs from 'fs';

import { generator as vueGenerator } from '../platform/vue/index';
import * as helper from '../helper';

const WORKING_DIR = process.cwd();
const SOURCE_FOLDER = 'source';

export function generate(
  generateTypes: string[],
  categories: string[],
  scope: string,
) {
  const generateFrom = path.join(WORKING_DIR, SOURCE_FOLDER);
  if (helper.isFolderEmpty(generateFrom)) {
    console.error('Source folder is empty!');
    return;
  }

  // if category is not provided
  // all categories will be included
  if (categories.length === 0) {
    categories = fs.readdirSync(generateFrom, { encoding: 'utf-8' });
  }

  for (let type of generateTypes) {
    const generateTo = path.join(WORKING_DIR, 'packages', type);

    switch (type) {
      case 'vue':
        vueGenerator(generateFrom, generateTo, categories, {
          scope,
        });

        break;

      default:
        console.log(`Type ${type} is not supported yet!`);
        break;
    }
  }
}

export default {
  generate,
};
