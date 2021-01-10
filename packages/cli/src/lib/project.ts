import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import ora from 'ora';

const WORKING_DIR = process.cwd();
const SCAFFOLD_REPO = 'https://github.com/arronKler/ease-icon-example.git';

function downloadScaffold(projectFolder: string) {
  const spinner = ora('Downloading scaffold ~').start();
  exec(
    `git clone ${SCAFFOLD_REPO} ${projectFolder}`,
    {
      cwd: WORKING_DIR,
    },
    function (err, output) {
      if (err) {
        spinner.fail('Something wrong:\n');

        console.error(err);
        return;
      }

      spinner.succeed('Download complete!');
    },
  );
}

export function initProject(projectFolder: string) {
  const fullProjectFolderPath = path.resolve(WORKING_DIR, projectFolder);

  if (!fs.existsSync(fullProjectFolderPath)) {
    fs.mkdir(
      fullProjectFolderPath,
      {
        recursive: true,
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }

        downloadScaffold(projectFolder);
      },
    );
  } else {
    downloadScaffold(projectFolder);
  }
}

export default {
  initProject,
};
