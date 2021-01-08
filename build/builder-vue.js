const path = require('path');
const fs = require('fs');
const prettier = require('prettier');
const ora = require('ora');
const helper = require('./helper');
const { exec } = require('child_process');

const VUE_ENTRY_FILENAME = 'index.js';
const VUE_PACKAGE_PATH = path.resolve(__dirname, '../packages/vue');

const VueTemplate = `
/* Auto-generated code */

export default {
  props: {
    size: {
      type: String,
      default: '42',
    },
    colors: {
      type: Array,
      default: () => ['#333', '#333'],
    },
    mode: {
      type: String,
      defualt: 'single',
    },
  },
  name: '$name$',
  data () {
    return {
      defaultColors: [
        '$MainStrokeColor$', 
        '$MainFillColor$', 
        '$SecondStrokeColor$', 
        '$SecondFillColor$']
    }
  },
  render() {
    return ($render$)
  },
};

`;

/**
 * 生成 Vue 组件
 * @param {*} iconInfo
 */
exports.generateVueComp = function (iconInfo) {
  const { filepath, category, data, name } = iconInfo;
  const ouputFilePath = path.join(
    VUE_PACKAGE_PATH,
    category,
    'icons',
    name + '.js',
  );

  let resolvedData = VueTemplate.replace(/\$name\$/gi, name);
  resolvedData = resolvedData.replace(/\$render\$/, data);

  resolvedData = prettier.format(resolvedData, {
    semi: false,
    parser: 'babel',
  });

  fs.writeFileSync(ouputFilePath, resolvedData);
};

/**
 * 生成 Vue 组件库的入口文件
 * @param {*} iconInfos
 * @param {*} category
 */
exports.generateVueEntry = function (iconInfos, category) {
  const outputPath = path.resolve(
    VUE_PACKAGE_PATH,
    category,
    VUE_ENTRY_FILENAME,
  );

  let importStatement = '';
  let exportAllStatement = 'export {\n';

  let registerComponentStatement = '';

  for (let iconInfo of iconInfos) {
    const { name } = iconInfo;

    importStatement += `import ${name} from "./icons/${name}";\n`;

    exportAllStatement += `${name},\n`;

    registerComponentStatement += `Vue.component((options.prefix ||'I') + ${name}.name, ${name})\n`;
  }

  exportAllStatement += '}\n';

  const exportDefaultStatement = `\n
  export default {
    install(Vue, options = {}) {
      ${registerComponentStatement}
    }
  }
  `;

  const fileData =
    '/* Auto-generated code */\n\n' +
    importStatement +
    exportAllStatement +
    exportDefaultStatement;

  fs.writeFileSync(
    outputPath,
    prettier.format(fileData, {
      semi: false,
      parser: 'babel',
    }),
  );
};

/**
 * 构建 Vue 包
 */
exports.buildVuePackage = function (category) {
  const workingDir = path.resolve(VUE_PACKAGE_PATH, category);
  const spinner = ora('Building Vue Library ~').start();

  exec(
    'vue build index.js --target lib --name index --dest dist',
    {
      cwd: workingDir,
    },
    (err, out) => {
      if (err) {
        console.error(err);
        spinner.fail('构建出错~！');
        return;
      }

      console.log(out);
      spinner.succeed('构建完成 Done!');
    },
  );
};

exports.copyEssentialFiles = function (category) {
  try {
    // copy eslintrc.js file in root directory
    helper.copyFile(
      path.resolve(__dirname, '../.eslintrc.js'),
      path.resolve(VUE_PACKAGE_PATH, category, '.eslintrc.js'),
      true,
    );

    // copy package.json file and inject package infos
    helper.copyWithInject(
      path.resolve(VUE_PACKAGE_PATH, 'template.package.json'),

      path.resolve(VUE_PACKAGE_PATH, category, 'package.json'),

      [['name', category.toLowerCase()]],
      true,
    );
  } catch (e) {
    console.error(e);
  }
};

exports.prepareFolder = function (category) {
  helper.createFolder(VUE_PACKAGE_PATH, category);

  helper.createFolder(path.join(VUE_PACKAGE_PATH, category), 'icons');
};
