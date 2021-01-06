const path = require('path');
const fs = require('fs');
const compiler = require('@ease-icon/compiler');

const VUE_PACKAGE_PATH = path.resolve(__dirname, '../packages/vue');
const SOURCE_PATH = path.resolve(__dirname, '../source');
const dirs = fs.readdirSync(SOURCE_PATH);

const SVG_MAP = new Map();

async function run() {
  for (let dirname of dirs) {
    const iconFolderPath = path.join(SOURCE_PATH, dirname);

    if (fs.statSync(iconFolderPath).isDirectory()) {
      const svgFiles = fs.readdirSync(iconFolderPath);
      await resolveSvgFiles(svgFiles, iconFolderPath, dirname);
    }
  }

  console.log(SVG_MAP);
  compiler.GenerateVueEntry(path.resolve(VUE_PACKAGE_PATH, 'src'), SVG_MAP);
}

run();

async function resolveSvgFiles(svgFiles, iconFolderPath, dirname) {
  for (let svgFileName of svgFiles) {
    const filename = svgFileName.replace(/\.svg$/, '');
    const svgRealPath = path.resolve(iconFolderPath, svgFileName);

    let data = fs.readFileSync(svgRealPath, 'utf8');

    const output = await compiler.SvgCompiler(data);

    compiler.GenerateVueComponent(
      path.resolve(VUE_PACKAGE_PATH, 'src/icons', dirname, svgFileName),
      output,
      svgFileName,
    );

    SVG_MAP.set(filename, path.join(dirname, filename));
  }
}
