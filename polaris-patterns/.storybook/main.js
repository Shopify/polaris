const path = require('path');
const postcssPlugins = require('../config/postcss-plugins');

module.exports = {
  stories: [
    {
      directory: '../src/components/',
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
      '@shopify/polaris': path.resolve(
        __dirname,
        '..',
        '..',
        'polaris-react',
        'src',
      ),
      '@shopify/polaris-patterns': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
