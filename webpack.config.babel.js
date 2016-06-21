/* eslint-env node */

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssExtractor = new ExtractTextPlugin('build/style.css');

export default {
  output: {
    library: 'Quilt',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          cssExtractor.extract([
            'style',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'postcss',
          ]),
        ],
      },
    ],
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    cssExtractor,
  ],
};
