import {readFileSync} from 'fs';
import path from 'path';

import {defineConfig} from 'vite';

import {keys} from './config/postcss-plugins';

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
            entryFileNames: (chunkInfo) => {
              console.log(Object.keys(chunkInfo), chunkInfo.type);
              return `${chunkInfo.name}.js`;
            },
            exports: 'named',
          },
          {
            format: 'esm',
            dir: path.dirname(pkg.module),
            preserveModules: true,
            entryFileNames: (chunkInfo) => {
              console.log(Object.keys(chunkInfo), chunkInfo.type);
              return `${chunkInfo.name}.js`;
            },
          },
        ],
      },
    },
    define: {
      '{{POLARIS_VERSION}}': pkg.version,
    },
  };
});
