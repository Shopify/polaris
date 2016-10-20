// @flow

import {resolve} from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

const demoRoot = resolve(__dirname, '..');
const sourceRoot = resolve(demoRoot, '../src');

export default {
  context: demoRoot,
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      resolve(demoRoot, './client/index.js'),
    ],
  },
  resolve: {
    alias: {
      '@shopify/quilt': sourceRoot,
    },
  },
  output: {
    path: resolve(demoRoot, './build'),
    publicPath: '/static/',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [
            'shopify/web',
            'shopify/react',
            'shopify/flow',
          ],
          plugins: ['react-hot-loader/babel'],
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
          'postcss?sourceMap',
        ],
      },
    ],
  },
  postcss() {
    return [autoprefixer()];
  },
  sassLoader: {
    includePaths: [resolve(sourceRoot, 'styles')],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
