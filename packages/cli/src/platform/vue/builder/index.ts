import path from 'path';
import { rollup, Plugin } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';

async function buildPackage(packagePath: string, pkgName: string) {
  let inputOptions = {
    plugins: [
      progress(),
      terser(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        plugins: ['babel-plugin-transform-vue-jsx'],
      }),
    ],
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

export function builder(rootPath: string, packages: string[]) {
  for (let pkg of packages) {
    buildPackage(path.join(rootPath, pkg), pkg)
      .then((output) => {
        console.log('Build complete!');
      })
      .catch((err) => {
        console.error('something wrong\n', err);
      });
  }
}
