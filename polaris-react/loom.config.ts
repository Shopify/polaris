import {
  createPackage,
  createProjectPlugin,
  DiagnosticError,
} from '@shopify/loom';
import {
  buildLibrary,
  buildLibraryWorkspace,
  rollupPlugins,
} from '@shopify/loom-plugin-build-library';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';

import packageJSON from './package.json';
import {styles} from './config/rollup/plugin-styles';
import {generateScopedName} from './config/rollup/namespaced-classname';
import postcssPlugins from './config/postcss-plugins';

// Needed so TS realises what configuration hooks are provided by Jest
import type {} from '@shopify/loom-plugin-jest';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './src/index.ts'});
  pkg.use(
    buildLibrary({
      rootEntrypoints: false,
      jestTestEnvironment: 'jsdom',
      targets: 'extends @shopify/browserslist-config, node 12.20',
      commonjs: true,
      esmodules: true,
      esnext: true,
    }),
    buildLibraryWorkspace(),
    rollupAdjustPluginsPlugin(),
    rollupAdjustOutputPlugin(),
  );
});

function rollupAdjustPluginsPlugin() {
  return rollupPlugins((target) => {
    const stylesConfig = target.options.rollupEsnext
      ? {
          mode: 'esnext',
          modules: {
            globalModulePaths: [/CustomProperties\.scss$/],
            generateScopedName: generateScopedName({includeHash: true}),
          },
          plugins: postcssPlugins,
        }
      : {
          mode: 'standalone',
          output: 'styles.css',
          modules: {
            globalModulePaths: [/CustomProperties\.scss$/],
            generateScopedName: generateScopedName({includeHash: false}),
          },
          plugins: postcssPlugins,
        };

    return [
      replace({
        '{{POLARIS_VERSION}}': packageJSON.version,
        delimiters: ['', ''],
      }),
      image(),
      json({
        compact: true,
      }),
      styles(stylesConfig),
    ];
  });
}

/**
 * Output .js files for the esm build instead of .mjs files
 *
 * By default webpack 4 handles imports within js and mjs files differently.
 * mjs files are subject to a stricter set of rules when importing from commonjs
 * files such as react.
 * Some apps (including sewing-kit based apps) work around this by adding
 * `config.module.rules.push({test: /\.mjs$/, type: 'javascript/auto'});`
 * to their webpack config, which tells webpack to treat .mjs files the same
 * as .js files. However we should not rely on this behaviour being present.
 *
 * Thus publish our esm files with a .js file extension.
 */
function rollupAdjustOutputPlugin() {
  return createProjectPlugin('Polaris.RollupOutput', ({tasks: {build}}) => {
    build.hook(({hooks}) => {
      hooks.target.hook(({hooks, target}) => {
        const isDefaultBuild = Object.keys(target.options).length === 0;
        if (!isDefaultBuild) {
          return;
        }

        hooks.configure.hook(async (configuration) => {
          configuration.babelConfig?.hook((config) => ({
            ...config,
            rootMode: 'upward',
          }));

          configuration.rollupOutputs?.hook((outputs) => {
            for (const output of outputs) {
              if (typeof output.entryFileNames === 'string') {
                output.entryFileNames = output.entryFileNames.replace(
                  /\.mjs$/,
                  '.js',
                );
              }
            }

            return outputs;
          });
        });
      });
    });
  });
}
