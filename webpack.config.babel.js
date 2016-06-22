/* eslint-env node */

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssExtractor = new ExtractTextPlugin('style.css', {
  allChunks: true,
});

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
        loader: cssExtractor.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss'
        ),
      },
    ],
  },
  postcss() {
    return [autoprefixer, cssnano()];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    cssExtractor,
  ],
};
