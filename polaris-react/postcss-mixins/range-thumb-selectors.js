/*
  This mixin exists because we can't have comma separated selector lists for browser prefixes
  REASON UNKNOWN
*/

module.exports = () => ({
  '&::-ms-thumb': {
    '@mixin-content': {},
  },
  '&::-moz-range-thumb': {
    '@mixin-content': {},
  },
  '&::-webkit-slider-thumb': {
    '@mixin-content': {},
  },
});
