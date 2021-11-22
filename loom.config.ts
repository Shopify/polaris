import {
  createPackage,
  createWorkspacePlugin,
  createProjectPlugin,
  DiagnosticError,
} from '@shopify/loom';
import {
  buildLibrary,
  buildLibraryWorkspace,
  rollupPlugins,
} from '@shopify/loom-plugin-build-library';
import {eslint} from '@shopify/loom-plugin-eslint';
import {stylelint} from '@shopify/loom-plugin-stylelint';
import {prettier} from '@shopify/loom-plugin-prettier';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcssShopify from '@shopify/postcss-plugin';

import packageJSON from './package.json';
import {styles} from './config/rollup/plugin-styles';
import {generateScopedName} from './config/rollup/namespaced-classname';

// Needed so TS realises what configuration hooks are provided by Jest
import type {} from '@shopify/loom-plugin-jest';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './src/index.ts'});
  pkg.use(
    buildLibrary({
      jestTestEnvironment: 'jsdom',
      targets: 'extends @shopify/browserslist-config, node 12.20',
      commonjs: true,
      esmodules: true,
      esnext: true,
    }),
    buildLibraryWorkspace(),
    eslint(),
    stylelint({files: '**/*.scss'}),
    prettier({files: '**/*.{md,json,yaml,yml}'}),
    rollupAdjustPluginsPlugin(),
    rollupAdjustOutputPlugin(),
    jestAdjustmentsPlugin(),
    preAndPostBuildPlugin(),
  );
});

function jestAdjustmentsPlugin() {
  return createProjectPlugin('Polaris.Jest', ({tasks: {test}}) => {
    test.hook(({hooks}) => {
      hooks.configure.hook((configuration) => {
        // Aliases for root-level imports, which are used in test files
        // `tests/*` as an alias for test-only utilities is acceptable, but
        // avoid others as paths working in jest but not in rollup is confusing
        configuration.jestModuleNameMapper?.hook((moduleNameMapper) => ({
          ...moduleNameMapper,
          '^tests/(.*)': '<rootDir>/tests/$1',
          '^components$': '<rootDir>/src/components',
        }));

        // Ignore tests in the examples folder
        configuration.jestConfig?.hook((config) => ({
          ...config,
          testPathIgnorePatterns: ['/node_modules/', '<rootDir>/examples/'],
        }));

        // Novel file types - scss and images
        configuration.jestTransform?.hook((transforms) => ({
          ...transforms,
          '\\.s?css$': require.resolve('./config/jest-transform-style'),
          '\\.svg$': require.resolve('./config/jest-transform-image'),
        }));
      });
    });
  });
}

function preAndPostBuildPlugin() {
  return createWorkspacePlugin('Polaris.PrePost', ({api, tasks: {build}}) => {
    build.hook(({hooks}) => {
      hooks.pre.hook((steps) => [
        ...steps,
        api.createStep(
          {id: 'PolarisBuild.Pre', label: 'polaris pre-build'},
          async (step) => {
            try {
              await step.exec('yarn', ['run', 'copy-polaris-tokens'], {
                all: true,
              });
            } catch (error) {
              throw new DiagnosticError({
                title: 'Error runing prebuild steps',
                content: error.all,
              });
            }
          },
        ),
      ]);
      hooks.post.hook((steps) => [
        ...steps,
        api.createStep(
          {id: 'PolarisBuild.Post', label: 'polaris post-build'},
          async (step) => {
            try {
              await step.exec(
                'node_modules/.bin/downlevel-dts',
                ['build/ts/latest', 'build/ts/3.4'],
                {all: true},
              );

              await step.exec(
                'node_modules/.bin/copyfiles',
                ['./src/**/*.md', './build/docs', '--up=1'],
                {all: true},
              );

              await step.exec(
                'node_modules/.bin/copyfiles',
                ['./src/styles/**/*.scss', './build/styles', '--up=2'],
                {all: true},
              );
            } catch (error) {
              throw new DiagnosticError({
                title: 'Error runing postbuild steps',
                content: error.all,
              });
            }
          },
        ),
      ]);
    });
  });
}

function rollupAdjustPluginsPlugin() {
  return rollupPlugins((target) => {
    const stylesConfig = target.options.rollupEsnext
      ? {
          mode: 'esnext',
          modules: {
            generateScopedName: generateScopedName({includeHash: true}),
          },
          plugins: [postcssShopify],
        }
      : {
          mode: 'standalone',
          output: 'styles.css',
          modules: {
            generateScopedName: generateScopedName({includeHash: false}),
          },
          plugins: [postcssShopify],
        };

    return [
      replace({
        '{{POLARIS_VERSION}}': packageJSON.version,
        delimiters: ['', ''],
      }),
      image(),
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
