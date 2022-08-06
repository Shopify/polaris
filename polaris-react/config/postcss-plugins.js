import postcssShopify from '@shopify/postcss-plugin';
import pxtorem from 'postcss-pxtorem';

export default [
  postcssShopify,
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
];
