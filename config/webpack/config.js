const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const svgOptimizationOptions = require('@shopify/images/optimize').svgOptions;

const {
  TsConfigPathsPlugin,
  CheckerPlugin,
} = require('awesome-typescript-loader');

const getClassName = require('./css-modules');

const root = path.resolve(__dirname, '..', '..');
const src = path.resolve(root, 'src');
const build = path.resolve(root, 'build');
const styles = path.resolve(root, src, 'styles');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = function createWebpackConfig() {
  return {
    target: 'node',
    devtool: 'source-map',
    entry: {
      quilt: [
        path.resolve(root, 'src/index.ts'),
      ],
    },
    output: {
      path: build,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.ts',
        '.tsx',
      ],
    },
    externals: [
      /^[a-z\-0-9]+$/,
    ],
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new TsConfigPathsPlugin(),
      new CheckerPlugin(),
      new CaseSensitivePathsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   compress: {
      //     // eslint-disable-next-line camelcase
      //     screw_ie8: true,
      //     warnings: false,
      //   },
      //   mangle: {
      //     // eslint-disable-next-line camelcase
      //     screw_ie8: true,
      //   },
      //   output: {
      //     comments: false,
      //     // eslint-disable-next-line camelcase
      //     screw_ie8: true,
      //   },
      // }),

      new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    ],
    module: {
      loaders: [
        {
          test(resource) {
            return ICON_PATH_REGEX.test(resource) && resource.endsWith('.svg');
          },
          use: [
            {
              loader: '@shopify/images/icon-loader',
            },
            {
              loader: 'image-webpack-loader',
              options: {
                svgo: svgOptimizationOptions(),
              },
            },
          ],
        },
        {
          test(resource) {
            return IMAGE_PATH_REGEX.test(resource) && !ICON_PATH_REGEX.test(resource);
          },
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [
            /node_modules/,
          ],
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                silent: true,
                useBabel: true,
                useCache: true,
                cacheDirectory: path.resolve(build, 'cache', 'typescript'),
                babelOptions: {
                  presets: [
                    ['shopify/web', {modules: false}],
                    ['shopify/react', {hot: false}],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: [
            /node_modules/,
          ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  ident: 'css',
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  getLocalIdent: getClassName,
                },
              },
              // {
              //   loader: 'postcss-loader',
              //   options: {sourceMap: true},
              // },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: [styles],
                },
              },
            ],
          }),
        },
      ],
    },
  };
};
