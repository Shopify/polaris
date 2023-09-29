const postcssShopify = require('@shopify/postcss-plugin');
const postcssEnvFunction = require('postcss-env-function');
const pxtorem = require('postcss-pxtorem');

module.exports = [
  postcssShopify,
  postcssEnvFunction({
    importFrom:
      '../node_modules/@shopify/polaris-tokens/dist/scss/media-queries.js',
  }),
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
];
