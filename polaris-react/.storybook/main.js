import path from 'node:path';
import {mergeConfig} from 'vite';

module.exports = {
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  stories: [
    {
      directory: '../playground/',
      files: 'stories.tsx',
    },
    {
      directory: '../src/components/',
      titlePrefix: 'All components',
      files: '**/*.stories.tsx',
    },
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
    './addons/global-controls-panel/preset.js',
  ],
  // This Vite config is only used by Storybook for building the preview iframe
  // (ie; the code in our stories and preview.jsx). This does not apply to the
  // add-ons and any other storybook UI code.

  // The config argument passed to viteFinal is a merge of the default storybook
  // vite config, and the config specified in our `polaris-react/vite.config.js`
  // file.
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        // Set any environment variables here. At this point we're able to
        // access env vars used when Storybook was built / run. After this,
        // `process.env` becomes unavailable (ie; if we want to change the
        // behaviour of a storybook addon based on an environment variable).
        // Environment variables set here are available as `import.meta.env.*`
        // and will be a literal string replacement.
        // For example, to forcibly enable a feature flag, add this config:
        // 'process.env.FEATURE': JSON.stringify(process.env.FEATURE) ?? 'undefined',
        // Then edit `polaris-react/.storybook/preview.jsx` to read
        // `import.meta.env.FEATURE` and pass the value to `AppProvider`.
      },
      resolve: {
        alias: {
          // Stories import `@shopify/polaris` so they match the actual code
          // people will write. But when running in storybook, we want to use
          // the actual source code (not the built code) to avoid running build
          // twice (once to build Polaris, then again in storybook).
          '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
          // Similarly, we want to link against the src version of
          // polaris-patterns
          '@shopify/polaris-patterns': path.resolve(
            __dirname,
            '..',
            '..',
            'polaris-patterns',
            'src',
          ),
        },
      },
    });
  },
};
