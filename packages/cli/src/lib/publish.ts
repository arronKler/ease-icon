import { exec_promise } from '../helper';
import path from 'path';
import fs from 'fs';
import { info, done, error } from '../logger';
import inquirer from 'inquirer';
import semver from 'semver';

const WORKING_DIR = process.cwd();
// const WORKING_DIR = process.cwd();

async function checkVersion(categoryPath: string) {
  const pkgFilePath = path.join(categoryPath, 'package.json');

  if (fs.existsSync(pkgFilePath)) {
    const packageJSON = fs.readFileSync(pkgFilePath, {
      encoding: 'utf-8',
    });
    const packageObj = JSON.parse(packageJSON);

    const targetVersion = packageObj.version;

    try {
      const anwser = await inquirer.prompt([
        {
          name: 'method',
          type: 'list',
          message: `The version you want publish (current version is: ${targetVersion})`,
          choices: [
            `patch (${semver.inc(targetVersion, 'patch')})`,
            `minor (${semver.inc(targetVersion, 'minor')})`,
            `major (${semver.inc(targetVersion, 'major')})`,
            `prepatch (${semver.inc(targetVersion, 'prepatch')})`,
            `preminor (${semver.inc(targetVersion, 'preminor')})`,
            `premajor (${semver.inc(targetVersion, 'premajor')})`,
            `prerelease (${semver.inc(targetVersion, 'prerelease')})`,
          ],
        },
      ]);

      const method = anwser.method.splice(' ')[0];
      await exec_promise(`npm version ${method}`, {
        cwd: categoryPath,
      });

      info('Version Updated');
    } catch (e) {
      error(e);
    }
  } else {
    error('Not a valid package');
  }
}

async function publish(category: string) {
  const categoryPath = path.resolve(WORKING_DIR, 'packages/vue', category);

  try {
    await checkVersion(categoryPath);

    const output = await exec_promise('npm publish', {
      cwd: categoryPath,
    });

    console.log(output);
    console.log();
    done('Published!');
  } catch (e) {
    error(e);
  }
}

export default {
  publish,
};
