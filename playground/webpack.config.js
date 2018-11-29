const path = require('path');
const {
  svgOptions: svgOptimizationOptions,
} = require('@shopify/images/optimize');
const postcssShopify = require('postcss-shopify');

// Use the version of webpack-bundle-analyzer (and other plugins/loaders) from
// sewing-kit in order avoid a bunch of duplication in our devDependencies
// eslint-disable-next-line node/no-extraneous-require, import/no-extraneous-dependencies
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = (env = {production: false}) => ({
  target: 'web',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'eval',
  stats: {
    // When transpiling TS using isolatedModules, the compiler doesn't strip
    // out exported types as it doesn't know if an item is a type or not.
    // Ignore those warnings as we don't care about them.
    warningsFilter: /export .* was not found in/,
  },
  devServer: {
    port: process.env.PORT || 8080,
    disableHostCheck: true,
    historyApiFallback: true,
    stats: {
      // When transpiling TS using isolatedModules, the compiler doesn't strip
      // out exported types as it doesn't know if an item is a type or not.
      // Ignore those warnings as we don't care about them.
      warningsFilter: /export .* was not found in/,
    },
  },
  entry: [
    'react-hot-loader/patch',
    '@shopify/polaris/styles/global.scss',
    path.join(__dirname, 'client/index.ts'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -20,
        },
        polaris: {
          // Include polaris code files, but not markdown files
          // We don't want to include the readme samples in here
          test: (module) => {
            const name = module.nameForCondition && module.nameForCondition();
            const polarisDir = path.resolve(__dirname, '..', 'src');

            return name && name.startsWith(polarisDir) && !name.endsWith('.md');
          },
          name: 'polaris',
          priority: -15,
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    alias: {
      '@shopify/polaris': path.resolve(__dirname, '..', 'src'),
    },
  },
  plugins: env.production
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.resolve(
            __dirname,
            'build/bundle-analysis/report.html',
          ),
          generateStatsFile: true,
          statsFilename: path.resolve(
            __dirname,
            'build/bundle-analysis/stats.json',
          ),
          openAnalyzer: false,
        }),
      ]
    : [],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [{loader: `${__dirname}/webpack/parseMarkdown.js`}],
      },
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
          return (
            IMAGE_PATH_REGEX.test(resource) && !ICON_PATH_REGEX.test(resource)
          );
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              minified: Boolean(env.production),
              presets: [
                ['shopify/web', {modules: false}],
                ['shopify/react', {hot: true}],
              ],
              cacheDirectory: path.resolve(__dirname, 'build/cache/typescript'),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              transpileOnly: true,
              experimentalFileCaching: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => postcssShopify(),
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              includePaths: [path.resolve(__dirname, '..', 'src', 'styles')],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(
                  __dirname,
                  '..',
                  'src',
                  'styles',
                  'foundation.scss',
                ),
                path.resolve(__dirname, '..', 'src', 'styles', 'shared.scss'),
              ],
            },
          },
        ],
      },
    ],
  },
});
