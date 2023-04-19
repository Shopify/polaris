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
  // This Vite config, is only used by Storybook, for building the preview iframe (read, the code in our stories and preview.jsx).
  // This does not apply to the add-ons and any other storybook UI code.

  // The config argument passed to viteFinakl is a merge of
  // the default storybook vite config, and the config specified in our `../vite.config.js` file.
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        // We set process.env.STORYBOOK_SE23 here to normalize how we access
        // process.env variables in client context.
        // If we didn't then the preview.jsx file would have to access STORYBOOK_SE23 as
        // import.meta.env.STORYBOOK_SE23.
        'process.env.STORYBOOK_SE23':
          JSON.stringify(process.env.STORYBOOK_SE23) ?? 'undefined',
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
