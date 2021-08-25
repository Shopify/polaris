import {
  createPackage,
  Runtime,
  createComposedWorkspacePlugin,
  createComposedProjectPlugin,
  createProjectPlugin,
} from '@sewing-kit/core';
import {babel} from '@sewing-kit/plugin-babel';
import {workspaceTypeScript} from '@sewing-kit/plugin-typescript';
import {eslint} from '@sewing-kit/plugin-eslint';
import {stylelint} from '@sewing-kit/plugin-stylelint';
import {prettier} from '@sewing-kit/plugin-prettier';
import {jest} from '@sewing-kit/plugin-jest';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.runtimes(Runtime.Node, Runtime.Browser);
  pkg.entry({root: './src/index'});
  pkg.use(libraryPackagePlugin(), libaryWorkspacePlugin());
});

function libraryPackagePlugin() {
  return createComposedProjectPlugin('PolarisPackage', [
    // this needs to be set here as the current setup cannot
    // find the babel.config.js file at the root of the project
    babel({
      config: {
        presets: [['@shopify/babel-preset', {typescript: true, react: true}]],
        configFile: false,
      },
    }),
    jestAdjustmentsPlugin(),
  ]);
}

function libaryWorkspacePlugin() {
  return createComposedWorkspacePlugin('PolarisWorkspace', [
    jest(),
    eslint(),
    stylelint({files: '**/*.scss'}),
    prettier({files: '**/*.{md,json,yaml,yml}'}),
    workspaceTypeScript(),
  ]);
}

function jestAdjustmentsPlugin() {
  return createProjectPlugin('PolarisJest', ({tasks: {test}}) => {
    test.hook(({hooks}) => {
      hooks.configure.hook((configuration) => {
        configuration.jestEnvironment?.hook(() => 'jsdom');

        // Aliases for root-level imports
        // These do not work in rollup builds, so perhaps we shouldn't configure
        // them to work here either
        configuration.jestModuleMapper?.hook((moduleMapper) => {
          moduleMapper['^(components|test-utilities|types|utilities)(.*)'] =
            '<rootDir>/src/$1$2';

          return moduleMapper;
        });

        // Ignore tests in the examples folder
        configuration.jestConfig?.hook((config) => ({
          ...config,
          testPathIgnorePatterns: ['/node_modules/', '<rootDir>/examples/'],
        }));

        // Novel file types - scss and images
        configuration.jestTransforms?.hook((transforms) => ({
          ...transforms,
          '\\.s?css$': require.resolve('./config/jest-transform-style'),
          '\\.svg$': require.resolve('./config/jest-transform-image'),
        }));
      });
    });
  });
}
