import {join} from 'path';
import {ConfigurationCallback, Env, Plugins} from '@shopify/sewing-kit';

const tests = join(__dirname, 'tests');

interface InitialOptions extends jest.InitialOptions {
  setupFilesAfterEnv: string[];
}

// eslint-disable-next-line import/no-default-export
export default function sewingKitConfig(
  plugins: Plugins,
  env: Env,
): ReturnType<ConfigurationCallback> {
  return {
    name: 'polaris',
    library: true,
    plugins: [
      plugins.jest((config: InitialOptions) => {
        config.roots = [
          join(__dirname, 'src'),
          join(__dirname, 'tests'),
          join(__dirname, 'scripts'),
        ];

        // Code coverage
        config.collectCoverageFrom = [
          'src/**/*.{ts,tsx}',
          'scripts/**/*.{ts,tsx}',
          '!src/test-utilities/**/*.*',
          '!src/**/index.{ts,tsx}',
          '!src/**/*.d.ts',
          '!src/**/*.test.{ts,tsx}',
        ];

        if (!config.transformIgnorePatterns) {
          config.transformIgnorePatterns = [];
        }
        // babel-jest does not transpile import/export in node_modules when Babel 7 is used
        // https://github.com/facebook/jest/issues/6229
        config.transformIgnorePatterns.push(
          '/node_modules/(?!use-sticky).+\\.js$',
        );

        return config;
      }),
    ],
  };
}
