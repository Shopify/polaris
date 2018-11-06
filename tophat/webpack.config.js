const path = require('path');
const webpack = require('webpack');
const {
  svgOptions: svgOptimizationOptions,
} = require('@shopify/images/optimize');
const postcssShopify = require('postcss-shopify');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  stats: {warnings: false},
  entry: [
    '@shopify/polaris/styles/global.scss',
    path.join(__dirname, 'index.tsx'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    alias: {
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test(resource) {
          return ICON_PATH_REGEX.test(resource) && resource.endsWith('.svg');
        },
        use: [
          {
            loader: '@shopify/images/icon-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: svgOptimizationOptions(),
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
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              sourceMap: true,
              silent: true,
              useBabel: true,
              useCache: true,
              useTranspileModule: true,
              transpileOnly: true,
              cacheDirectory: path.resolve(__dirname, '.cache', 'typescript'),
              babelOptions: {
                babelrc: false,
                presets: [
                  ['shopify/web', {modules: false}],
                  ['shopify/react', {hot: true}],
                ],
              },
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
              includePaths: [path.resolve(__dirname, '..', 'src', 'styles')],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(
                  __dirname,
                  '..',
                  'src',
                  'styles',
                  'foundation.scss',
                ),
                path.resolve(__dirname, '..', 'src', 'styles', 'shared.scss'),
              ],
            },
          },
        ],
      },
    ],
  },
};
