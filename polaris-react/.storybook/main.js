const path = require('path');
const postcssPlugins = require('../config/postcss-plugins');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: ['@storybook/addon-a11y'],
  stories: [
    '../playground/stories.tsx',
    '../src/components/**/examples/*.stories.tsx',
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

    config.resolve.alias = {
      ...config.resolve.alias,
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
};
