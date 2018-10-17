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
        config.roots = [join(__dirname, 'src'), join(__dirname, 'tests')];
        config.testEnvironment = 'jest-environment-jsdom-global';
        config.modulePaths = [
          '<rootDir>/node_modules/',
          '<rootDir>/src/',
          '<rootDir>/tests/',
        ];

        config.setupFiles.push(join(tests, 'setup.ts'));

        // Needed because we set js: 'react-native' in our tsconfig to leave the
        // transformation up to consuming projects, but within Jest we want to
        // transform the jsx content
        // eslint-disable-next-line typescript/no-var-requires
        const {compilerOptions} = require('./tsconfig.json');
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

        // Can be removed once SK is updated to latest ts-jest
        config.transform = {
          ...config.transform,
          'tsx?$': 'ts-jest',
        };

        // Can be removed once SK is updated to latest ts-jest
        delete config.globals['ts-jest'].useBabelrc;

        return config;
      }),
    ],
  };
}
