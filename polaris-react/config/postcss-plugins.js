const path = require('path');

const postcssShopify = require('@shopify/postcss-plugin');
const pxtorem = require('postcss-pxtorem');
const postcssCustomMedia = require('postcss-custom-media');
const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssNesting = require('postcss-nesting');
const postcssMixins = require('postcss-mixins');
const postcssDiscardComments = require('postcss-discard-comments');

const mediaQueriesCssPath = path.resolve(
  __dirname,
  '../../node_modules/@shopify/polaris-tokens/dist/css/media-queries.css',
);

module.exports = [
  postcssMixins({
    mixinsDir: path.join(__dirname, '../postcss-mixins'),
  }),
  postcssNesting({
    // The way native CSS nesting & SASS nesting behave with complex selectors
    // differ; SASS expands out every selector into a comma separated list, but
    // native CSS wraps the complex selectors in an `:is()` which can result in
    // a different specificity. We favour the SASS convention here to ensure
    // compatibility with our ported-in SASS styles.
    // See: https://sass-lang.com/blog/sass-and-native-nesting/
    noIsPseudoSelector: true,
  }),
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
  postcssDiscardComments(),
];
