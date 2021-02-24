import path from 'path';
import fs from 'fs';
import vuePack from '../platform/vue/pack';
import iconfontPack from '../platform/iconfont/pack';
import { info } from '../logger';

const WORKING_DIR = process.cwd();

function pack(source: string, dest: string, isFont: boolean) {
  const sourcePath = path.resolve(WORKING_DIR, source);
  const destPath = path.resolve(WORKING_DIR, dest);

  if (!fs.existsSync(sourcePath)) {
    info('The source folder is not exists');
    return;
  }

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, {
      recursive: true,
    });
  }

  if (isFont) {
    iconfontPack(sourcePath, destPath);
  } else {
    vuePack(sourcePath, destPath);
  }
}

export default { pack };
