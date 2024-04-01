/*
  This mixin exists because we can't have comma separated selector lists for browser prefixes
  REASON UNKNOWN
*/
const duplicate = require('./duplicate');

module.exports = (_) =>
  duplicate(
    _,
    '&::-ms-track',
    '&::-moz-range-track',
    '&::-webkit-slider-runnable-track',
  );
