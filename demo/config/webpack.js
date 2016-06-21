import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

const demoRoot = path.join(__dirname, '..');

export default {
  context: demoRoot,
  resolve: {
    root: [
      path.join(demoRoot, '../src'),
    ],
  },
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.join(demoRoot, 'client/index.js'),
    ],
  },
  output: {
    path: path.join(demoRoot, 'build'),
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
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
      },
    ],
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
