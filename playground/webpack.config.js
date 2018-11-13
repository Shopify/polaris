const path = require('path');
const {
  svgOptions: svgOptimizationOptions,
} = require('@shopify/images/optimize');
const postcssShopify = require('postcss-shopify');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'eval',
  stats: {warnings: false},
  devServer: {
    port: process.env.PORT || 8080,
    disableHostCheck: true,
    stats: {warnings: false},
  },
  entry: [
    'react-hot-loader/patch',
    '@shopify/polaris/styles/global.scss',
    path.join(__dirname, 'index.tsx'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -20,
        },
        polaris: {
          // test accepts a regex. The replace escapes any special characters
          // in the path so they are treated literally
          // see https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
          test: new RegExp(
            path
              .resolve(__dirname, '..', 'src')
              .replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'),
          ),
          name: 'polaris',
          priority: -15,
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    alias: {
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    },
  },
  plugins: [],
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
              silent: true,
              useBabel: true,
              useCache: true,
              useTranspileModule: true,
              transpileOnly: true,
              cacheDirectory: path.resolve(
                __dirname,
                'build/.cache/typescript',
              ),
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
