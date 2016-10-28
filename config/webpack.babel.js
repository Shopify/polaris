/* eslint-env node */
/* eslint flowtype/require-valid-file-annotation: off */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import addQuiltWebpackConfig from '../webpack';

const {
  optimize: {OccurrenceOrderPlugin, UglifyJsPlugin},
  LoaderOptionsPlugin,
  DefinePlugin,
  NoErrorsPlugin,
} = webpack;

const config = {
  output: {
    library: 'Quilt',
    libraryTarget: 'var',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new NoErrorsPlugin(),
    new ExtractTextPlugin({filename: 'quilt.css', allChunks: true}),
    new OccurrenceOrderPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin({
      compress: {
        // eslint-disable-next-line camelcase
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        // eslint-disable-next-line camelcase
        screw_ie8: true,
      },
      output: {
        comments: false,
        // eslint-disable-next-line camelcase
        screw_ie8: true,
      },
    }),
  ],
};

addQuiltWebpackConfig(config, {mode: 'production', target: 'client'});

export default config;
