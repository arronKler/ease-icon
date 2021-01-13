import path, { format } from 'path';
import fs from 'fs';

import { generator as vueGenerator } from '../platform/vue/index';
import { generator as iconfontGenerator } from '../platform/iconfont/index';
import * as helper from '../helper';

const WORKING_DIR = process.cwd();
export const SOURCE_FOLDER = 'source';

export async function generate(
  generateTypes: string[],
  categories: string[],
  scope: string,
) {
  const generateFrom = path.join(WORKING_DIR, SOURCE_FOLDER);
  if (helper.isFolderEmpty(generateFrom)) {
    // console.error('Source folder is empty!');
    throw new Error('Source folder is empty');
  }

  // if category is not provided
  // all categories will be included
  if (categories.length === 0) {
    categories = fs
      .readdirSync(generateFrom, { encoding: 'utf-8' })
      .filter((category) => {
        // filter hidden folder like .DS_store
        return !category.startsWith('.');
      });
  }

  for (let type of generateTypes) {
    const generateTo = path.join(WORKING_DIR, 'packages', type);

    switch (type) {
      case 'vue':
        await vueGenerator(generateFrom, generateTo, categories, {
          scope,
        });
        break;
      case 'iconfont':
        await iconfontGenerator(generateFrom, generateTo, categories);
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
