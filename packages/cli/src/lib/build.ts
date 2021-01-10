import fs from 'fs';
import path from 'path';

import { builder as vueBuilder } from '../platform/vue/index';

const PACKAGE_PATH = path.join(process.cwd(), 'packages');

function buildSingleCategory() {}

function buildAllCategory() {}

export function build(buildTypes: string[], packages: string[]) {
  if (packages.length === 0) {
    packages = fs.readdirSync(PACKAGE_PATH, { encoding: 'utf-8' });
  }

  for (let type of buildTypes) {
    const buildRootPath = path.join(PACKAGE_PATH, type);
    switch (type) {
      case 'vue':
        vueBuilder(buildRootPath, packages);
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
