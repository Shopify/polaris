import path from 'path';

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupOptions = {
  input: 'src/index.ts',
  output: [
    {
      format: /** @type {const} */ ('cjs'),
      dir: path.dirname(pkg.main),
      preserveModules: true,
    },
    {
      format: /** @type {const} */ ('es'),
      dir: path.dirname(pkg.module),
      preserveModules: true,
    },
  ],
  plugins: [
    // Allows node_modules resolution
    nodeResolve({extensions}),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
      babelHelpers: 'bundled',
    }),
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ],
};

// eslint-disable-next-line import/no-default-export
export default rollupOptions;
