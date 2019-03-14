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
