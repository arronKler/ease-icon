import path from 'path';
import { copyFile, copyWithInject } from '../../../helper';

const WORKING_DIR = process.cwd();
const VUE_TEMPLATE_FOLDER = path.resolve(WORKING_DIR, 'template/vue');

export default function (outputPackagePath: string, libname: string) {
  try {
    // copy eslintrc.js file in root directory
    copyFile(
      path.resolve(VUE_TEMPLATE_FOLDER, 'template.eslintrc.js'),
      path.resolve(outputPackagePath, '.eslintrc.js'),
      true,
    );

    // copy package.json file and inject package infos
    copyWithInject(
      path.resolve(VUE_TEMPLATE_FOLDER, 'template.package.json'),

      path.resolve(outputPackagePath, 'package.json'),

      [['name', libname.toLowerCase()]],
      true,
    );
  } catch (e) {
    console.error(e);
  }
}
