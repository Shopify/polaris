const postcssShopify = require('@shopify/postcss-plugin');
const pxtorem = require('postcss-pxtorem');

module.exports = [
  postcssShopify,
  pxtorem({
    rootValue: 10,
    replace: true,
    propList: ['*'],
  }),
];
