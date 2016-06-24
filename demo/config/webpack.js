import {resolve} from 'path';
import webpack from 'webpack';

import postcss from '../../config/postcss';

const demoRoot = resolve(__dirname, '..');
const sourceRoot = resolve(demoRoot, '../src');

export default {
  context: demoRoot,
  resolve: {
    root: [sourceRoot],
  },
  entry: {
    app: [
      'webpack-hot-middleware/client',
      resolve(demoRoot, './client/index.js'),
    ],
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
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
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
    return postcss({minify: false});
  },
  sassLoader: {
    includePaths: [sourceRoot],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
