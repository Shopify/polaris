// @flow
/* eslint-env node */

const autoprefixer = require('autoprefixer');
const postcssWillChange = require('postcss-will-change');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssCalc = require('postcss-calc');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssSelectorMatches = require('postcss-selector-matches');

module.exports = {
  plugins: [
    postcssDiscardComments(),
    postcssCalc(),
    postcssFlexbugsFixes,
    postcssSelectorMatches,
    postcssWillChange,
    autoprefixer(),
  ],
};
