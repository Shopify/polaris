const path = require('path');
const spawn = require('child_process').spawn;
const CreateFileWebpack = require('create-file-webpack');
const postcssPlugins = require('../polaris-react/config/postcss-plugins');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    {
      directory: '../polaris-react/playground/',
      files: 'stories.tsx',
    },
    {
      directory: '../polaris-react/src/components/',
      titlePrefix: 'All components',
      files: '**/*.stories.tsx',
    },
    {
      directory: '../polaris-patterns/src/components/',
      titlePrefix: 'Patterns',
      files: '**/*.stories.tsx',
    },
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
  ],
  webpackFinal: (config) => {
    const extraRules = [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
                auto: (resourcePath) => {
                  return !resourcePath.includes('global');
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.module.rules = [...config.module.rules, ...extraRules];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@shopify/polaris': path.resolve(__dirname, '..', 'polaris-react', 'src'),
    };
    return config;
  },
};
