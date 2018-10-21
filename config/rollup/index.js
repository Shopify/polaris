import {resolve} from 'path';
import {readJSONSync} from 'fs-extra';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

import {dependencies, peerDependencies} from '../../package.json';

import styles from './plugins/styles';
import image from './plugins/image';
import icon from './plugins/icon';

import getNamespacedClassName from './namespaced-classname';
import getMinifiedClassName from './minified-classname';
import createExistingClassnameTokenUser from './use-existing-classname-tokens';

const project = resolve(__dirname, '../..');
const buildRoot = resolve(project, './build-intermediate');
const styleRoot = resolve(buildRoot, './styles');

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];
const sassResources = [
  resolve(styleRoot, './foundation.scss'),
  resolve(styleRoot, './shared.scss'),
];

export default function createRollupConfig({
  entry,
  writeCSS,
  cssPath,
  minifyClassnames = false,
  useExistingClassTokens = false,
}) {
  let generateScopedName;

  if (useExistingClassTokens) {
    generateScopedName = createExistingClassnameTokenUser(
      readJSONSync(`${cssPath.slice(0, -4)}.tokens.json`),
    );
  } else {
    generateScopedName = minifyClassnames
      ? getMinifiedClassName
      : getNamespacedClassName;
  }

  return {
    input: entry,
    external(id) {
      return externalPackages.some((aPackage) => id.startsWith(aPackage));
    },
    plugins: [
      json(),
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        customResolveOptions: {
          moduleDirectory: ['../build-intermediate', 'node_modules'],
        },
      }),
      babel({
        include: '**/*.js',
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      commonjs(),
      styles({
        output: writeCSS && cssPath,
        includePaths: [styleRoot],
        includeAlways: sassResources,
        generateScopedName,
      }),
      icon({
        include: '**/icons/*.svg',
        exclude: 'node_modules/**',
      }),
      image({
        exclude: ['node_modules/**', '**/icons/*.svg'],
      }),
    ],
  };
}
