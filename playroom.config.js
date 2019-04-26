const path = require('path');
const postcssShopify = require('postcss-shopify');

const ICON_PATH_REGEX = /icons\//;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;

module.exports = {
  components: './playroom.components.ts',
  frameComponent: './playroom.wrapper.tsx',
  outputPath: './build/playroom',
  title: 'Polaris',
  widths: [320, 375, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `<div>Check out https://polaris.shopify.com/components/get-started for more info</div>`,
  // Disable all the type parsing as it throws an error for now
  typeScriptFiles: [],
  webpackConfig: () => {
    const cacheDir = path.resolve(__dirname, '../build/cache/playroom');

    // When transpiling TS using isolatedModules, the compiler doesn't strip
    // out exported types as it doesn't know if an item is a type or not.
    // Ignore those warnings as we don't care about them.
    const stats = {warningsFilter: /export .* was not found in/};

    return {
      // Custom webpack config goes here...
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  minified: false,
                  cacheDirectory: `${cacheDir}/typescript`,
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
            test(resource) {
              return (
                IMAGE_PATH_REGEX.test(resource) &&
                !ICON_PATH_REGEX.test(resource)
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
                  includePaths: [path.resolve(__dirname, 'src', 'styles')],
                },
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.resolve(__dirname, 'src', 'styles', 'foundation.scss'),
                    path.resolve(__dirname, 'src', 'styles', 'shared.scss'),
                  ],
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    };
  },
};
