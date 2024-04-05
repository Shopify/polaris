// Vite is used by Storybook.
// Rollup is used directly to build for prod.
import {readFileSync} from 'fs';
import * as path from 'path';

import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {externals} from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';

import {styles} from './config/rollup/plugin-styles.js';
import {generateScopedName} from './config/rollup/namespaced-classname.mjs';
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
    ],
    output,
  };
}

function entryFileNames(ext) {
  return (chunkInfo) => {
    // To preserve backwards compatibility with previous Polaris versions,
    // CSS Modules should be `<Name>.css.esnext`, never
    // `<Name>.module.css.esnext`
    if (chunkInfo.name.endsWith('.module.css')) {
      return `${chunkInfo.name.replace(/\.module\.css$/, '.css')}.${ext}`;
    }

    // Use regular pattern matching for everything else
    return `[name].${ext}`;
  };
}

/** @type {import('rollup').RollupOptions} */
export default [
  generateConfig({
    targets: [...pkg.browserslist, 'node 20.10.0'],
    stylesConfig: {
      mode: 'standalone',
      output: 'styles.css',
      modules: {
        generateScopedName: generateScopedName({includeHash: false}),
        globalModulePaths: [/global\.css$/],
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'cjs',
        dir: path.dirname(pkg.main),
        preserveModules: true,
        entryFileNames: entryFileNames('js'),
        exports: 'named',
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
        preserveModules: true,
        entryFileNames: entryFileNames('js'),
      },
    ],
  }),
  generateConfig({
    targets: 'last 1 chrome versions',
    stylesConfig: {
      mode: 'esnext',
      modules: {
        generateScopedName: generateScopedName({includeHash: true}),
        globalModulePaths: [/global\.css$/],
      },
      plugins: postcssPlugins,
    },
    output: [
      {
        format: 'esm',
        dir: path.dirname(pkg.esnext),
        preserveModules: true,
        entryFileNames: entryFileNames('esnext'),
      },
    ],
  }),
];
