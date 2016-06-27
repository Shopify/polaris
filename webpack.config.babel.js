/* eslint-env node */

import {resolve} from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const {
  optimize: {OccurenceOrderPlugin, UglifyJsPlugin, DedupePlugin},
  DefinePlugin,
  NoErrorsPlugin,
} = webpack;

const cssExtractor = new ExtractTextPlugin('quilt.css', {
  allChunks: true,
});

export default {
  output: {
    library: 'Quilt',
    libraryTarget: 'var',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  debug: false,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: cssExtractor.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!sass!postcss'
        ),
      },
    ],
  },
  postcss() {
    return [autoprefixer(), cssnano()];
  },
  sassLoader: {
    includePaths: [resolve(__dirname, './src')],
  },
  plugins: [
    new NoErrorsPlugin(),
    cssExtractor,
    new OccurenceOrderPlugin(),
    new DedupePlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin({
      compressor: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
      },
    }),
  ],
};
