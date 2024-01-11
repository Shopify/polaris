const path = require('path');

const postcssShopify = require('@shopify/postcss-plugin');
const pxtorem = require('postcss-pxtorem');
const postcssCustomMedia = require('postcss-custom-media');
const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssAdvancedVariables = require('postcss-advanced-variables');

const mediaQueriesCssPath = path.resolve(
  __dirname,
  '../../node_modules/@shopify/polaris-tokens/dist/css/media-queries.css',
);

module.exports = [
  // SASS-ish-support
  postcssAdvancedVariables(),
  postcssGlobalData({
    files: [mediaQueriesCssPath],
  }),
  postcssCustomMedia(),
  postcssShopify,
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
];
