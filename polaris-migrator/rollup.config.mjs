import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import globby from 'globby';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const migrationPaths = globby.sync('./src/migrations/*!(tests)/*.ts');

/** @type {import('rollup').RollupOptions} */
export default {
  input: ['src/index.ts', ...migrationPaths],
  output: [
    {
      format: /** @type {const} */ ('cjs'),
      entryFileNames: '[name][assetExtname].js',
      dir: path.dirname(pkg.main),
      preserveModules: true,
      exports: 'auto',
    },
    {
      format: /** @type {const} */ ('esm'),
      entryFileNames: '[name][assetExtname].mjs',
      dir: path.dirname(pkg.module),
      preserveModules: true,
    },
  ],
  plugins: [
    // Allows node_modules resolution
    nodeResolve({extensions, preferBuiltins: true}),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      rootMode: 'upward',
      include: ['src/**/*'],
      babelHelpers: 'bundled',
      envName: 'production',
      targets: 'node 14.13',
    }),
    json({compact: true}),
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    'jscodeshift/src/Runner',
  ],
};
