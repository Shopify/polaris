/* eslint-env node */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import postcss from './config/postcss';

const {
  optimize: {OccurenceOrderPlugin, UglifyJsPlugin},
  DefinePlugin,
  NoErrorsPlugin,
} = webpack;

const cssExtractor = new ExtractTextPlugin('../style.css', {
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
        test: /\.css$/,
        loader: cssExtractor.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss'
        ),
      },
    ],
  },
  postcss() {
    return postcss({minify: true});
  },
  plugins: [
    new NoErrorsPlugin(),
    cssExtractor,
    new OccurenceOrderPlugin(),
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
