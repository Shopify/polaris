import {join} from 'path';
import {ConfigurationCallback, Env, Plugins} from '@shopify/sewing-kit';

const tests = join(__dirname, 'tests');

export default function sewingKitConfig(
  plugins: Plugins,
  env: Env,
): ReturnType<ConfigurationCallback> {
  return {
    name: 'polaris',
    library: true,
    plugins: [
      plugins.jest((config) => {
        config.roots = [join(__dirname, 'src'), join(__dirname, 'tests')];

        config.setupFiles.push(join(tests, 'setup.ts'));

        // svg transform have to go before the existing transforms so that .svg
        // files match our declaration first, and thus run the svg transform,
        // instead of matching the file transform
        config.transform = {
          '\\.svg$': join(__dirname, 'config/jest/transformers/svg.js'),
          ...config.transform,
        };

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
        config.collectCoverageFrom = [
          'src/**/*.{ts,tsx}',
          '!src/test-utilities/**/*.*',
          '!src/**/index.{ts,tsx}',
          '!src/**/*.d.ts',
          '!src/**/*.test.{ts,tsx}',
        ];

        return config;
      }),
    ],
  };
}
