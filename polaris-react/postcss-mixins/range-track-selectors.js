/*
  This mixin exists because we can't have comma separated selector lists for browser prefixes
  REASON UNKNOWN
*/

module.exports = () => ({
  '&::-ms-track': {
    '@mixin-content': {},
  },
  '&::-webkit-slider-runnable-track': {
    '@mixin-content': {},
  },
  '&::-moz-range-track': {
    '@mixin-content': {},
  },
});
