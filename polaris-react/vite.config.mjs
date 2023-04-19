// Vite is used by Storybook.
// Rollup is used directly to build for prod.
import {readFileSync} from 'fs';

import {defineConfig} from 'vite';

import {generateScopedName} from './config/rollup/namespaced-classname.mjs';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname),
);

// eslint-disable-next-line import/no-default-export
export default defineConfig(({command}) => {
  const isProduction = command === 'build';
  return {
    css: {
      modules: {
        generateScopedName: generateScopedName({includeHash: false}),
        globalModulePaths: [/global\.scss$/],
      },
    },
    define: {
      // In production, Vite uses rollup to replace constants, but it functions
      // differently to esbuild which Vite uses in dev mode.
      '{{POLARIS_VERSION}}': isProduction ? pkg.version : `'${pkg.version}'`,
    },
  };
});
