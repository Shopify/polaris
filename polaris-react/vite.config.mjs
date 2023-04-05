import {readFileSync} from 'fs';
import path from 'path';

import {defineConfig} from 'vite';

import {generateScopedName} from './config/rollup/namespaced-classname-module.mjs';

// WEVE CHANGED THE ACTIONLIST.SCSS FILE TO ACTIONLIST.MODULE.SCSS TO GET THIS WORKING
// REMEMBER TO CHANGE IT BACK YOU NONCES

const pkg = JSON.parse(
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  readFileSync(new URL('./package.json', import.meta.url).pathname),
);
// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  // const isProduction = command === 'build';
  return {
    build: {
      outDir: 'dist',
      lib: {
        entry: './src/index.ts',
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ],
        output: [
          {
            format: 'cjs',
            dir: path.dirname(pkg.main),
            preserveModules: true,
            entryFileNames: '[name].js',
            exports: 'named',
            cssCodeSplit: false,
          },
          {
            format: 'esm',
            dir: path.dirname(pkg.module),
            preserveModules: true,
            entryFileNames: '[name].js',
            cssCodeSplit: false,
          },
        ],
      },
    },
    css: {
      modules: {
        generateScopedName: generateScopedName({includeHash: false}),
        globalModulePaths: [/global\.scss$/],
      },
    },
    define: {
      '{{POLARIS_VERSION}}': pkg.version,
    },
  };
});
