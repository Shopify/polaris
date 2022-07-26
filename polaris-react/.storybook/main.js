const path = require('path');
const spawn = require('child_process').spawn;
const CreateFileWebpack = require('create-file-webpack');
const postcssPlugins = require('../config/postcss-plugins');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../playground/stories.tsx', '../src/components/**/*/README.md'],
  addons: ['@storybook/addon-a11y'],
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

    const extraRules = [
      {
        test: /src\/components\/.+\/README\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
              cacheDirectory: path.resolve(
                'build-internal/cache/storybook/markdown',
              ),
            },
          },
          {
            loader: `${__dirname}/polaris-readme-loader.js`,
          },
        ],
      },
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

    config.module.rules = [
      // Strip out existing rules that apply to md files
      ...config.module.rules.filter(
        (rule) => rule.test.toString() !== '/\\.md$/',
      ),
      ...extraRules,
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
};
