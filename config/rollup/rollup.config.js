import {resolve} from 'path';

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import externals from 'rollup-plugin-node-externals';

import packageJSON from '../../package.json';

import {stylesStandalone} from './plugins/styles-standalone-modern';
import {stylesEsNext} from './plugins/styles-esnext-modern';
import {images} from './plugins/images-modern';

const root = resolve(__dirname, '../..');

function plugins(browserslist) {
  const babelWebPresetOptions = {
    modules: 'auto',
    typescript: true,
    browsers: browserslist,
  };

  return [
    replace({
      '{{POLARIS_VERSION}}': packageJSON.version,
      '<%= POLARIS_VERSION %>': packageJSON.version,
      delimiters: ['', ''],
    }),
    externals({
      packagePath: `${__dirname}../../../package.json`,
      deps: true,
      peerDeps: true,
    }),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      root: resolve(`${__dirname}../../..`),
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // We need to specify an environment name as leaving it blank defaults
      // to "development", which ends up including a bunch of debug helpers.
      envName: 'production',
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      // Don't use config from babel.config.js as we want to customise the
      // browserslist per compile target.
      configFile: false,
      presets: [
        ['@shopify/babel-preset/web', babelWebPresetOptions],
        ['@shopify/babel-preset/react'],
      ],
    }),
    images(),
  ];
}

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default [
  {
    input: `${root}/src/index.ts`,
    output: [
      {format: 'cjs', file: `${root}/index.js`},
      {format: 'esm', file: `${root}/index.es.js`},
    ],
    plugins: [
      // Not specifying a browserslist config here to use the default as
      // defined in our package.json
      ...plugins(),
      stylesStandalone({output: 'styles.css'}),
    ],
  },
  {
    input: `${root}/src/index.ts`,
    output: [{format: 'esm', dir: `${root}/esnext`}],
    preserveModules: true,
    plugins: [
      ...plugins('extends @shopify/browserslist-config/latest-evergreen'),
      stylesEsNext(),
    ],
  },
];
