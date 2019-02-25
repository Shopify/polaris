const {resolve} = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const svgr = require('@svgr/rollup').default;
const {svgOptions} = require('@shopify/images/optimize');

const {dependencies, peerDependencies} = require('../../package.json');

const styles = require('./plugins/styles');
const image = require('./plugins/image');

const getNamespacedClassName = require('./namespaced-classname');

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

module.exports = function createRollupConfig({entry, cssPath}) {
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
      svgr({
        exclude: 'node_modules/**',
        svgoConfig: svgOptions(),
        replaceAttrValues: {
          '#FFF': 'currentColor',
          '#fff': 'currentColor',
          '#212B36': '{undefined}',
          '#212b36': '{undefined}',
        },
        babel: false,
      }),
      babel({
        // We need to specify an environment name as leaving it blank defaults
        // to "development", which ends up including a bunch of debug helpers.
        // We don't want to use "production" as that enables the
        // babel-plugin-transform-react-constant-elements plugin which we don't want
        envName: 'not-production',
        include: ['**/*.js', '**/*.svg'],
        extensions: ['.js', '.svg'],
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      commonjs(),
      styles({
        output: cssPath,
        includePaths: [styleRoot],
        includeAlways: sassResources,
        generateScopedName: getNamespacedClassName,
      }),
      image({
        exclude: ['node_modules/**', '**/icons/*.svg'],
      }),
    ],
  };
};
