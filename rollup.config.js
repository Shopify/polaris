import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';

import packageJSON from './package.json';
import {stylesStandalone} from './config/rollup/plugin-styles-standalone';
import {stylesEsNext} from './config/rollup/plugin-styles-esnext';
import {images} from './config/rollup/plugin-images';

const root = __dirname;

const externalPackages = [
  ...Object.keys(packageJSON.dependencies),
  ...Object.keys(packageJSON.peerDependencies),
];

function external(id) {
  return externalPackages.some((aPackage) => id.startsWith(aPackage));
}

function plugins(browserslist) {
  const babelWebPresetOptions = {
    modules: 'auto',
    typescript: true,
    browsers: browserslist,
  };

  return [
    replace({
      '{{POLARIS_VERSION}}': packageJSON.version,
      delimiters: ['', ''],
    }),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // We need to specify an environment name as leaving it blank defaults
      // to "development", which ends up including a bunch of debug helpers.
      envName: 'production',
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
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
      {format: 'cjs', file: `${root}/dist/index.js`},
      {format: 'esm', file: `${root}/dist/index.mjs`},
    ],
    plugins: [
      // Not specifying a browserslist config here to use the default as
      // defined in our package.json
      ...plugins(),
      stylesStandalone({output: 'styles.css'}),
    ],
    external,
  },
  {
    input: `${root}/src/index.ts`,
    output: [
      {
        format: 'esm',
        dir: `${root}/dist/esnext`,
        entryFileNames: '[name][extname].esnext',
      },
    ],
    preserveModules: true,
    plugins: [
      ...plugins('extends @shopify/browserslist-config/latest-evergreen'),
      stylesEsNext(),
    ],
    external,
  },
];
