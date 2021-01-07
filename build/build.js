const path = require('path');
const fs = require('fs');
const vueBuilder = require('./builder-vue');
const helper = require('./helper');
const xmlHelper = require('./xml-helper');

const SOURCE_PATH = path.resolve(__dirname, '../source');
const SOURCE_CONFIG = path.resolve(SOURCE_PATH, 'config.json');

const sourceConfig = fs.readFileSync(SOURCE_CONFIG);

function run() {
  const categoryDirs = fs.readdirSync(SOURCE_PATH);

  for (let category of categoryDirs) {
    categoryPath = path.join(SOURCE_PATH, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      resolveCategory(categoryPath, category);
    }
  }
}

run();

function resolveCategory(categoryPath, category) {
  console.log(`解析目录： ${category}`);
  const svgFiles = fs.readdirSync(categoryPath);

  const promises = [];
  svgFiles.forEach((svgFilename) => {
    const absoluteSvgFilePath = path.join(categoryPath, svgFilename);

    const { ext, dir, name } = path.parse(absoluteSvgFilePath);

    if (ext === '.svg') {
      const promise = new Promise(
        resolveSvgFile(absoluteSvgFilePath, dir, name, category),
      );

      promises.push(promise);
    }
  });

  Promise.all(promises)
    .then((iconInfos) => {
      if (iconInfos.length > 0) {
        console.log(`\n生成 ${category} 下的组件`);
        vueBuilder.generateVueEntry(iconInfos, category);

        vueBuilder.copyEssentialFiles(category);

        console.log(`\n构建代码 ==> ${category}`);
        vueBuilder.buildVuePackage(category);
      }
    })
    .catch(function () {});
}

function resolveSvgFile(absoluteSvgFilePath, dir, name, category) {
  return (resolve, reject) => {
    fs.readFile(
      absoluteSvgFilePath,
      {
        encoding: 'utf-8',
      },
      function (err, svgData) {
        if (err) {
          reject(err);
          return;
        }

        // 预处理一下SVG数据，方便后后面填充
        xmlHelper.resolveSvgData(svgData).then((data) => {
          const iconInfo = {
            filePath: absoluteSvgFilePath,
            dir,
            category,
            name,
            data,
          };

          vueBuilder.generateVueComp(iconInfo);
          resolve(iconInfo);
        });
      },
    );
  };
}
