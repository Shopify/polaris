import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupOptions = {
  input: ['src/plugin.ts', 'src/ui.tsx'],
  output: [
    {
      format: 'iife',
      // format: /** @type {const} */ ('cjs'),
      entryFileNames: '[name].js',
      dir: 'dist',
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    // Allows node_modules resolution
    nodeResolve({extensions, preferBuiltins: true}),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Convert json to modules
    css(),
    json(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      rootMode: 'upward',
      include: ['src/**/*'],
      babelHelpers: 'bundled',
    }),
    // Create html file to serve bundles
    html({
      template: () => {
        return `
        <!DOCTYPE html>
        <html>
          <body>
            <div id="root"></div>
            <script type=module src="./ui.js"></script>
          </body>
        </html>
        `;
      },
    }),
  ],
  external: ['antd'],
};

// eslint-disable-next-line import/no-default-export
export default rollupOptions;
