import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import shebang from 'rollup-plugin-preserve-shebang';
import globby from 'globby';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const migrationPaths = globby.sync(
  path.join(__dirname, './src/migrations/*/index.ts'),
);

/** @type {import('rollup').RollupOptions} */
export default {
  input: ['src/index.ts', ...migrationPaths],
  output: [
    {
      format: /** @type {const} */ ('cjs'),
      entryFileNames: '[name][assetExtname].js',
      dir: path.dirname(pkg.main),
      preserveModules: true,
    },
  ],
  plugins: [
    shebang(),
    // Allows node_modules resolution
    nodeResolve({extensions, preferBuiltins: true}),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      rootMode: 'upward',
      include: ['src/**/*'],
      babelHelpers: 'runtime',
    }),
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    // https://www.npmjs.com/package/@rollup/plugin-babel#user-content-babelhelpers
    /@babel\/runtime/,
    /node_modules/,
  ],
};
