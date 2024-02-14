// Vite is used by Storybook.
// Rollup is used directly to build for prod.
import {readFileSync} from 'fs';

import {defineConfig} from 'vite';
import {replaceCodePlugin} from 'vite-plugin-replace';

import {generateScopedName} from './config/rollup/namespaced-classname.mjs';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)),
);

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => ({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: '{{POLARIS_VERSION}}',
          to: pkg.version,
        },
      ],
    }),
  ],
  css: {
    modules: {
      generateScopedName: generateScopedName({includeHash: false}),
      globalModulePaths: [/global\.scss$/],
    },
  },
}));
