// @flow

import {resolve} from 'path';
import webpack from 'webpack';
import addQuiltWebpackConfig from '../../webpack';

const demoRoot = resolve(__dirname, '..');
const projectRoot = resolve(demoRoot, '..');

const config = {
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
      '@shopify/quilt': projectRoot,
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
            ['shopify/web', {modules: false}],
            'shopify/react',
            'shopify/flow',
          ],
          plugins: ['react-hot-loader/babel'],
        },
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

addQuiltWebpackConfig(config);

export default config;
