import path from 'path';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import progress from 'rollup-plugin-progress';
import fs from 'fs';

let defaultInputOptions = {
  plugins: [
    progress(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        [
          require('@babel/preset-env'),
          {
            // 避免转换成 CommonJS
            modules: false,
            // 使用 loose 模式，避免产生副作用
            loose: true,
          },
        ],
      ],
      plugins: [require('babel-plugin-transform-vue-jsx')],
      /**
         * require these dependencies
         * 
            babel-helper-vue-jsx-merge-props
            babel-plugin-syntax-jsx
            babel-plugin-transform-vue-jsx
         */
    }),
  ],
};

export async function buildPackage(packagePath: string) {
  let files = fs
    .readdirSync(packagePath)
    .filter(
      (filename) =>
        !(filename.startsWith('.') || filename === 'index.js') &&
        filename.endsWith('.js'),
    );

  // files = files.map((filename) => filename.slice(0, -3));

  let inputObj: any = {};
  for (const filename of files) {
    const name = filename.slice(0, -3);
    inputObj[name] = path.resolve(packagePath, filename);
  }

  let inputOptions = {
    ...defaultInputOptions,
    input: inputObj,
  };

  const bundle = await rollup(inputOptions);

  await bundle.write({
    // file: '[name].js',
    dir: packagePath,
    format: 'esm',
    // name: path.parse(packagePath).name.slice(0, -4),
    exports: 'named',
  });
  await bundle.close();
}
