import {ConfigurationCallback, Env, Plugins} from '@shopify/sewing-kit';
import {join} from 'path';
import {pathsToModuleNameMapper} from 'ts-jest/utils';

const tests = join(__dirname, 'tests');

export default function sewingKitConfig(
  plugins: Plugins,
  env: Env,
): ReturnType<ConfigurationCallback> {
  return {
    name: 'polaris',
    plugins: [
      plugins.jest((config) => {
        // eslint-disable-next-line typescript/no-var-requires
        const {compilerOptions} = require('./tsconfig.json');

        config.roots = [join(__dirname, 'src'), join(__dirname, 'tests')];

        // build test currently breaks everything, possibly becaue it runs a
        // `yarn clean` in its beforeAll, which nukes ts-jest's cache output,
        // causing everything else to fail
        config.testPathIgnorePatterns = ['tests/build.test.js'];

        config.testEnvironment = 'jest-environment-jsdom-global';

        config.modulePaths = [
          '<rootDir>/node_modules/',
          '<rootDir>/src/',
          '<rootDir>/tests/',
        ];

        // Can be removed once SK is updated to latest ts-jest
        config.transform = {
          ...config.transform,
          'tsx?': 'ts-jest',
        };
        config.setupFiles.push(join(tests, 'setup.ts'));

        // TODO look at setting this up in SK?
        config.moduleNameMapper = {
          ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
            prefix: '<rootDir>/src',
          }),
          ...config.moduleNameMapper,
        };

        // Can be removed once SK is updated to latest ts-jest
        delete config.globals['ts-jest'].useBabelrc;

        // Needed because we set js: 'react-native' in our tsconfig to leave the
        // transformation up to consuming projects, but within Jest we want to
        // transform the jsx content
        config.globals['ts-jest'].tsConfig = {
          ...compilerOptions,
          jsx: 'react',
        };

        // Code coverage
        config.coverageDirectory = 'coverage';
        config.coverageReporters = ['text-summary', 'html'];
        if (env.isCI) {
          config.coverageReporters.push('lcov');
        }
        config.collectCoverageFrom = [
          'src/**/*.{ts,tsx}',
          '!src/**/index.{ts,tsx}',
          '!src/**/*.d.ts',
          '!src/**/*.test.{ts,tsx}',
        ];

        return config;
      }),
    ],
  };
}
