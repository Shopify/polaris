// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const path = require('path');
const spawn = require('child_process').spawn;

const postcssShopify = require('postcss-shopify');

// Use the version of webpack-bundle-analyzer (and other plugins/loaders) from
// sewing-kit in order avoid a bunch of duplication in our devDependencies
// eslint-disable-next-line node/no-extraneous-require, import/no-extraneous-dependencies
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = ({config, mode}) => {
  const isProduction = mode === 'PRODUCTION';

  // When transpiling TS using isolatedModules, the compiler doesn't strip
  // out exported types as it doesn't know if an item is a type or not.
  // Ignore those warnings as we don't care about them.
  const stats = {warningsFilter: /export .* was not found in/};
  config.stats = stats;
  config.devServer = {stats};

  // Shrink ray only strips hashes when comparing filenames with this format.
  // Without this there will be lots of "add 1 file and removed 1 file" notices.
  config.output.filename = '[name]-[hash].js';

  const cacheDir = path.resolve(__dirname, '../build/cache/storybook');

  const extraRules = [
    {
      test: /src\/components\/.+\/README\.md$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: `${cacheDir}/markdown`,
          },
        },
        {
          loader: `${__dirname}/polaris-readme-loader.js`,
        },
      ],
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: `${cacheDir}/typescript`,
          },
        },
      ],
    },
    {
      test(resource) {
        return (
          IMAGE_PATH_REGEX.test(resource) && !ICON_PATH_REGEX.test(resource)
        );
      },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
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
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]-[local]_[hash:base64:5]',
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

  config.module.rules = [config.module.rules[0], ...extraRules];

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

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...config.resolve.alias,
    '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
  };
  return config;
};
