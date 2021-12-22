const postcssShopify = require('@shopify/postcss-plugin');
const pxToRem = require('postcss-pxtorem');
const pxToEmMediaQuery = require('postcss-em-media-query');

module.exports = [
  postcssShopify,
  pxToRem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
  pxToEmMediaQuery(),
];
