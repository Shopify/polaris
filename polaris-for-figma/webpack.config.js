const path = require('path');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.tsx',
    plugin: './src/plugin.ts',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          {loader: 'ts-loader'},
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {test: /\.(png|jpg|gif|webp|svg)$/, loader: [{loader: 'url-loader'}]},
    ],
  },
  resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js']},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
    }),
  ],
  node: {
    fs: 'empty',
  },
});
