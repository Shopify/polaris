/*
  This mixin exists because we can't have comma separated selector lists for browser prefixes
  REASON UNKNOWN
*/
const duplicate = require('./duplicate');

module.exports = (_) =>
  duplicate(
    _,
    '&::-ms-thumb',
    '&::-moz-range-thumb',
    '&::-webkit-slider-thumb',
  );
