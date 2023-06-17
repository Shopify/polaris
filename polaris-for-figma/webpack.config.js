const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) =>
  /** @type {import('webpack').Configuration} */
  ({
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
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader'},
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
    ],
  });
