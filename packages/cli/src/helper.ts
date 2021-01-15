import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

export function readFilePromise(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      filePath,
      {
        encoding: 'utf-8',
      },
      (err, filedata) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(filedata);
      },
    );
  });
}

export function isFolderEmpty(folderPath: string): boolean {
  return !fs.existsSync(folderPath) || fs.statSync(folderPath).size === 0;
}

// just copy a file and check validation before doing so
export const copyFile = function (
  src: string,
  dest: string,
  checkDest: boolean,
) {
  if (checkDest && fs.existsSync(dest)) {
    // console.log('File Already Exist');
    return;
  }

  fs.copyFile(src, dest, (err) => {
    if (err) throw err;

    console.log('Copy Done!');
  });
};

// copy file and replace value into corresponding placeholder in it
export const copyWithInject = function (
  src: string,
  dest: string,
  injectors: [string, any][],
  checkDest: boolean,
) {
  if (checkDest && fs.existsSync(dest)) {
    // console.log('File Already Exist');
    return;
  }

  let content = fs.readFileSync(src, {
    encoding: 'utf-8',
  });

  injectors.forEach((injector) => {
    const [variable, value] = injector;
    content = content.replace(new RegExp(`\{${variable}\}`, 'gi'), value);
  });
  fs.writeFileSync(dest, content);
};

// create one if not exists
export const createFolder = function (basePath: string, folder: string) {
  const folderPath = path.join(basePath, folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export function exec_promise(command: string, opt?: any) {
  return new Promise((resolve, reject) => {
    exec(command, opt, (err, out) => {
      if (err) reject(err);
      else resolve(out);
    });
  });
}
