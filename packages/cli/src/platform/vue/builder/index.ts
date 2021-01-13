import path from 'path';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import { done, error } from '../../../logger';

let defaultInputOptions = {
  plugins: [
    progress(),
    terser(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        [
          require('@babel/preset-env'),
          /**
           * require dependecies:
           *  @babel/core
              @babel/preset-env
           */
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

async function buildPackage(packagePath: string, pkgName: string) {
  let inputOptions = {
    ...defaultInputOptions,
    input: path.join(packagePath, 'index.js'),
  };

  const bundle = await rollup(inputOptions);

  await bundle.write({
    file: path.join(packagePath, 'dist', 'index.bundle.js'),
    format: 'umd',
    name: pkgName,
    exports: 'named',
  });
  await bundle.close();
}

async function buildSingleBundle(packagePath: string, pkgName: string) {
  let inputOptions = {
    ...defaultInputOptions,
    input: path.join(packagePath, 'index.js'),
  };

  const bundle = await rollup(inputOptions);

  await bundle.write({
    file: path.join(packagePath, 'dist', '{name}.bundle.js'),
    format: 'umd',
    name: pkgName,
    exports: 'named',
  });
  await bundle.close();
}

export function builder(rootPath: string, packages: string[]) {
  for (let pkg of packages) {
    buildPackage(path.join(rootPath, pkg), pkg)
      .then((output) => {
        console.log();
        done(`Build package '${pkg}' complete!`);
      })
      .catch((err) => {
        error(err);
      });
  }
}
