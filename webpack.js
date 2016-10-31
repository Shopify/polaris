/* eslint-env node */

const {resolve} = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');
const postcssWillChange = require('postcss-will-change');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssCalc = require('postcss-calc');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssSelectorMatches = require('postcss-selector-matches');

const sourceRoot = resolve(__dirname, 'src');

class Env {
  constructor({target = 'client', mode = 'development'} = {}) {
    this.target = target;
    this.isClient = (target === 'client');
    this.isServer = !this.isClient;

    this.mode = mode;
    this.isDevelopment = (mode === 'development');
    this.isProduction = !this.isDevelopment;

    this.isProductionClient = this.isProduction && this.isClient;
    this.isDevelopmentClient = this.isDevelopment && this.isClient;
    this.isProductionServer = this.isProduction && this.isServer;
    this.isDevelopmentServer = this.isDevelopment && this.isServer;
  }

  ifClient(then, or) { return this.isClient ? then : or; }
  ifServer(then, or) { return this.isServer ? then : or; }
  ifDevelopment(then, or) { return this.isDevelopment ? then : or; }
  ifProduction(then, or) { return this.isProduction ? then : or; }
  ifDevelopmentClient(then, or) { return this.isClient && this.isDevelopment ? then : or; }
  ifProductionClient(then, or) { return this.isClient && this.isProduction ? then : or; }
  ifDevelopmentServer(then, or) { return this.isServer && this.isDevelopment ? then : or; }
  ifProductionServer(then, or) { return this.isServer && this.isProduction ? then : or; }
}

module.exports = function addQuiltWebpackConfig(base, options) {
  const env = new Env(options);

  base.module = base.module || {};
  base.module.loaders = base.module.loaders || [];

  base.module.loaders.unshift(
    createJSLoader(env),
    createCSSLoader(env)
  );

  if (env.isProductionClient) {
    base.plugins = base.plugins || [];

    const hasExtractTextPlugin = base.plugins.some((plugin) => plugin instanceof ExtractTextPlugin);
    if (!hasExtractTextPlugin) {
      base.plugins.push(
        new ExtractTextPlugin({filename: '[name]-[chunkhash].css', allChunks: true})
      );
    }
  }

  return base;
};

function createCSSLoader(env) {
  let loaders;
  const cssLoader = createCSSModulesLoader(env);
  const sassLoader = createSassLoader(env);
  const postCSSLoader = createPostCSSLoader(env);

  if (env.isServer) {
    cssLoader.loader = 'css-loader/locals';

    loaders = [
      cssLoader,
      sassLoader,
    ];
  } else if (env.isDevelopmentClient) {
    loaders = [
      'style-loader',
      cssLoader,
      sassLoader,
      postCSSLoader,
    ];
  } else if (env.isProductionClient) {
    loaders = ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        cssLoader,
        sassLoader,
        postCSSLoader,
      ],
    });
  }

  return {
    test: /\.scss$/,
    include: [sourceRoot],
    loaders,
  };
}

function createCSSModulesLoader(env) {
  return {
    loader: 'css-loader',
    query: {
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: env.ifDevelopment('[path]___[name]__[local]___[hash:base64:5]', '[hash:base64:5]'),
    },
  };
}

function createSassLoader() {
  return {
    loader: 'sass-loader',
    query: {
      sourceMap: true,
      includePaths: [
        resolve(sourceRoot, 'styles'),
      ],
    },
  };
}

function createPostCSSLoader() {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [
        postcssDiscardComments(),
        postcssCalc(),
        postcssFlexbugsFixes,
        postcssSelectorMatches,
        postcssWillChange,
        autoprefixer(),
      ],
    },
  };
}

function createJSLoader(env) {
  return {
    test: /\.jsx?$/,
    include: [sourceRoot],
    loader: 'babel',
    query: {
      presets: [
        [env.ifServer('shopify/node', 'shopify/web'), {modules: false}],
        'shopify/react',
        'shopify/flow',
      ],
      env: {
        development: {
          plugins: ['react-hot-loader/babel'],
        },
      },
    },
  };
}
