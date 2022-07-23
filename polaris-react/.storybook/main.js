const path = require('path');
const spawn = require('child_process').spawn;
const CreateFileWebpack = require('create-file-webpack');
const postcssPlugins = require('../config/postcss-plugins');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../playground/stories.tsx', '../src/components/**/*.stories.tsx'],
  addons: [
    {name: '@storybook/addon-essentials', options: {docs: false}},
    '@storybook/addon-a11y',
  ],
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

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
                  return !resourcePath.includes('CustomProperties');
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
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
};
