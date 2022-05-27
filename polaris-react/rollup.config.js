const {babel} = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const externals = require('rollup-plugin-node-externals');
const replace = require('@rollup/plugin-replace');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');

const {styles} = require('./config/rollup/plugin-styles');
const {generateScopedName} = require('./config/rollup/namespaced-classname');
const postcssPlugins = require('./config/postcss-plugins');
const packageJSON = require('./package.json');

function generateConfig({output, targets, stylesConfig}) {
  return {
    input: './src/index.ts',
    plugins: [
      externals({deps: true, packagePath: './package.json'}),
      nodeResolve({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
      commonjs(),
      babel({
        rootMode: 'upward',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        // Options that may be present on the `babelConfig` object but
        // we want to override
        envName: 'production',
        // @ts-expect-error targets is a valid babel option but @types/babel__core doesn't know that yet
        targets,
      }),
      replace({
        '{{POLARIS_VERSION}}': packageJSON.version,
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      image(),
      json({
        compact: true,
      }),

      styles(stylesConfig),
    ],
    output,
  };
}

const config = [
  generateConfig({
    targets: 'extends @shopify/browserslist-config, node 12.20',
    stylesConfig: {
      mode: 'standalone',
      output: 'styles.css',
      modules: {
        generateScopedName: generateScopedName({includeHash: false}),
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'cjs',
        dir: 'build/cjs',
        preserveModules: true,
        entryFileNames: '[name][assetExtname].js',
        exports: 'named',
      },
      {
        format: 'esm',
        dir: 'build/esm',
        preserveModules: true,
        entryFileNames: '[name][assetExtname].js',
      },
    ],
  }),
  generateConfig({
    targets: 'last 1 chrome versions',
    stylesConfig: {
      mode: 'esnext',
      modules: {
        generateScopedName: generateScopedName({includeHash: true}),
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'esm',
        dir: 'build/esnext',
        preserveModules: true,
        entryFileNames: '[name][assetExtname].esnext',
      },
    ],
  }),
];

// eslint-disable-next-line import/no-default-export
export default config;
