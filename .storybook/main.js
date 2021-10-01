const path = require('path');
const spawn = require('child_process').spawn;
const CreateFileWebpack = require('create-file-webpack');

const postcssShopify = require('@shopify/postcss-plugin');

// Enabling docs means the preview panel takes an extra 2ish seconds to load
// This usually isn't a big deal, except when we're running all of our stories
// through our a11y tests, and a 2s delay over several hundred stories adds up.
// This is an escape hatch to disable docs only wheile we're running a11y tests
const enableDocs = !parseInt(process.env.STORYBOOK_DISABLE_DOCS || '0', 10);

module.exports = {
  stories: ['../playground/stories.tsx', '../src/components/**/*/README.md'],
  addons: [
    {name: '@storybook/addon-essentials', options: {docs: enableDocs}},
    '@storybook/addon-a11y',
    '@storybook/addon-contexts',
    '@storybook/addon-knobs',
  ],
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

    const extraRules = [
      {
        test: /src\/components\/.+\/README\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                '../build-internal/cache/storybook/markdown',
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
            query: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssShopify()],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.plugins.push(
      new CreateFileWebpack({
        path: './build-internal/storybook/static/services/',
        fileName: 'ping.html',
        content:
          '<!DOCTYPE html><html lang="en"><head></head><body>OK</body></html>',
      }),
    );

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
