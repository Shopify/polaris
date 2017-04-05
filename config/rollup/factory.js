import {resolve} from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import styles from './plugins/styles';
import image from './plugins/image';
import icon from './plugins/icon';

import getClassName from './classname';

const project = resolve(__dirname, '../..');
const root = resolve(project, './ts/src');
const entry = resolve(root, './index.js');
const styleRoot = resolve(root, './styles');

const PACKAGES = [
  'react',
  'react-dom',
  'babel-runtime',
  'tslib',
  '@shopify/javascript-utilities',
  '@shopify/react-utilities',
];

export default function createRollupConfig({format, outputCSS}) {
  return {
    entry,
    dest: resolve(project, `./build/quilt.${format}.js`),
    format,
    external(id) {
      return PACKAGES.some((aPackage) => id.startsWith(aPackage));
    },
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
      }),
      commonjs(),
      styles({
        output: outputCSS,
        includePaths: [styleRoot],
        generateScopedName: getClassName,
      }),
      icon({
        include: '**/icons/*.svg',
        exclude: 'node_modules/**',
      }),
      image({
        exclude: [
          'node_modules/**',
          '**/icons/*.svg',
        ],
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
  };
}
