const {resolve} = require('path');
const {readJSONSync} = require('fs-extra');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');

const {dependencies, peerDependencies} = require('../../package.json');

const styles = require('./plugins/styles');
const image = require('./plugins/image');
const icon = require('./plugins/icon');

const getNamespacedClassName = require('./namespaced-classname');
const createExistingClassnameTokenUser = require('./use-existing-classname-tokens');

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

module.exports = function createRollupConfig({
  entry,
  writeCSS,
  cssPath,
  useExistingClassTokens = false,
}) {
  let generateScopedName;
  if (useExistingClassTokens) {
    generateScopedName = createExistingClassnameTokenUser(
      readJSONSync(`${cssPath.slice(0, -4)}.tokens.json`),
    );
  } else {
    generateScopedName = getNamespacedClassName;
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
};
