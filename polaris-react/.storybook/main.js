const path = require('path');
const spawn = require('child_process').spawn;
const CreateFileWebpack = require('create-file-webpack');
const postcssPlugins = require('../config/postcss-plugins');
const {generateScopedName} = require('../config/rollup/namespaced-classname');

const moduleIdentCreator = generateScopedName({includeHash: true});

module.exports = {
  core: {
    builder: 'webpack5',
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
                getLocalIdent: ({resourcePath}, _, localName) =>
                  moduleIdentCreator(localName, resourcePath),
                auto: true,
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
