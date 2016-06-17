import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

const rootDir = path.join(__dirname, '..');

export default {
  context: rootDir,
  resolve: {
    root: [
      path.join(rootDir, 'client'),
    ],
  },
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.join(rootDir, 'client/index.js'),
    ],
  },
  output: {
    path: path.join(rootDir, 'build'),
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
        include: path.join(rootDir, 'client'),
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.scss$/,
        include: path.join(rootDir, 'quilt'),
        loaders: [
          'style',
          'css',
          'sass',
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
