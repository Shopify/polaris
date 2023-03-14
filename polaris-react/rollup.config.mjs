import {readFileSync} from 'fs';
import * as path from 'path';

import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {externals} from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import {vanillaExtractPlugin} from '@vanilla-extract/rollup-plugin';

import {styles} from './config/rollup/plugin-styles.js';
import {generateScopedName} from './config/rollup/namespaced-classname.js';
import postcssPlugins from './config/postcss-plugins.js';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname),
);
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function generateConfig({output, targets, stylesConfig}) {
  return {
    input: './src/index.ts',
    plugins: [
      externals({deps: true, packagePath: './package.json'}),
      nodeResolve({extensions}),
      commonjs(),
      babel({
        rootMode: 'upward',
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        // Options that may be present on the `babelConfig` object but
        // we want to override
        envName: 'production',
        // @ts-expect-error targets is a valid babel option but @types/babel__core doesn't know that yet
        targets,
      }),
      replace({
        '{{POLARIS_VERSION}}': pkg.version,
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      image(),
      json({
        compact: true,
      }),
      styles(stylesConfig),
      vanillaExtractPlugin(),
    ],
    output,
  };
}

/** @type {import('rollup').RollupOptions} */
export default [
  generateConfig({
    targets: 'extends @shopify/browserslist-config, node 12.20',
    stylesConfig: {
      mode: 'standalone',
      output: 'styles.css',
      modules: {
        generateScopedName: generateScopedName({includeHash: false}),
        globalModulePaths: [/global\.scss$/],
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'cjs',
        dir: path.dirname(pkg.main),
        preserveModules: true,
        entryFileNames: '[name][assetExtname].js',
        exports: 'named',
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
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
        globalModulePaths: [/global\.scss$/],
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'esm',
        dir: path.dirname(pkg.esnext),
        preserveModules: true,
        entryFileNames: '[name][assetExtname].esnext',
      },
    ],
  }),
];
