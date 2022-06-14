import {readFileSync} from 'fs';
import * as path from 'path';

import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname),
);
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const plugins = [
  // Allows node_modules resolution
  nodeResolve({extensions}),
  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs(),
  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    rootMode: 'upward',
    include: ['build-internal/**/*'],
    babelHelpers: 'bundled',
  }),
];
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'build-internal/index.ts',
    output: [
      {
        format: /** @type {const} */ ('cjs'),
        entryFileNames: '[name][assetExtname].js',
        dir: path.dirname(pkg.main),
        preserveModules: true,
      },
      {
        format: /** @type {const} */ ('es'),
        entryFileNames: '[name][assetExtname].mjs',
        dir: path.dirname(pkg.module),
        preserveModules: true,
      },
    ],
    plugins,
    external,
  },
  {
    input: 'build-internal/metadata.ts',
    output: [
      {
        format: /** @type {const} */ ('cjs'),
        entryFileNames: '[name][assetExtname].js',
        dir: 'dist',
        preserveModules: true,
      },
      {
        format: /** @type {const} */ ('es'),
        entryFileNames: '[name][assetExtname].mjs',
        dir: 'dist',
        preserveModules: true,
      },
    ],
    plugins,
    external,
  },
];
