const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const {
  TsConfigPathsPlugin,
  CheckerPlugin,
} = require('awesome-typescript-loader');

const getClassName = require('./css-modules');
const version = require('../../package.json').version;

const root = path.resolve(__dirname, '..', '..');
const build = path.resolve(root, 'build');
const styles = path.resolve(root, 'styles');

module.exports = function createWebpackConfig() {
  return {
    target: 'web',
    devtool: 'source-map',
    entry: {
      quilt: [
        path.resolve(root, 'index.ts'),
      ],
    },
    output: {
      path: build,
      filename: `[name]-${version}.js`,
      libraryTarget: 'umd',
      library: 'Quilt',
    },
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.ts',
        '.tsx',
      ],
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react',
        amd: 'react-dom',
        root: 'ReactDOM',
      },
    },
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

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
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

      new ExtractTextPlugin({filename: `[name]-${version}.css`, allChunks: true}),
    ],
    module: {
      loaders: [
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
