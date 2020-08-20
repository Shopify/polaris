const path = require('path');
const spawn = require('child_process').spawn;

const postcssShopify = require('@shopify/postcss-plugin');

// Use the version of webpack-bundle-analyzer (and other plugins/loaders) from
// sewing-kit in order avoid a bunch of duplication in our devDependencies
// eslint-disable-next-line node/no-extraneous-require, import/no-extraneous-dependencies
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  stories: ['../playground/stories.tsx', '../src/components/**/*/README.md'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-contexts',
    '@storybook/addon-knobs',
  ],
  webpackFinal: (config) => {
    const isProduction = config.mode === 'production';

    // Shrink ray only strips hashes when comparing filenames with this format.
    // Without this there will be lots of "add 1 file and removed 1 file" notices.
    config.output.filename = '[name]-[hash].js';

    const extraRules = [
      {
        test: /src\/components\/.+\/README\.md$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                '../build/cache/storybook/markdown',
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
              sourceMap: false,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => postcssShopify(),
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ];

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          spawn('yarn splash --show-disable-tip', {
            shell: true,
            stdio: 'inherit',
          });
        });
      },
    });

    if (isProduction) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.resolve(
            __dirname,
            '../build/storybook/bundle-analysis/report.html',
          ),
          generateStatsFile: true,
          statsFilename: path.resolve(
            __dirname,
            '../build/storybook/bundle-analysis/stats.json',
          ),
          openAnalyzer: false,
        }),
      );
    }

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
