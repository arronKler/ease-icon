import fs from 'fs';
import path from 'path';

import { builder as vueBuilder } from '../platform/vue/index';
import { SOURCE_FOLDER } from './generate';

const WORKING_DIR = process.cwd();
const PACKAGE_PATH = path.join(WORKING_DIR, 'packages');

export function build(buildTypes: string[], packages: string[]) {
  if (packages.length === 0) {
    packages = fs
      .readdirSync(path.join(WORKING_DIR, SOURCE_FOLDER), { encoding: 'utf-8' })
      .filter((category) => {
        // filter hidden folder like .DS_store
        return !category.startsWith('.');
      });
  }

  for (let type of buildTypes) {
    const buildRootPath = path.join(PACKAGE_PATH, type);
    switch (type) {
      case 'vue':
        vueBuilder(buildRootPath, packages);
        break;
      case 'iconfont':
        break;
      default:
        console.log(`Type ${type} is not supported yet!`);
        break;
    }
  }
}

export default {
  build,
};
