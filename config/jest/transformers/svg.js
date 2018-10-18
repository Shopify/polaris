const {basename} = require('path');

const ICON_REGEX = /icons\/.*\.svg$/;
const LARGE_SPINNER_REGEX = /spinner-large\.svg$/;

module.exports = {
  process(src, filename) {
    const svgViewbox = LARGE_SPINNER_REGEX.test(filename)
      ? '0 0 44 44'
      : '0 0 20 20';

    const content = ICON_REGEX.test(filename)
      ? {body: '<path />', viewBox: svgViewbox}
      : basename(filename);

    return `module.exports = ${JSON.stringify(content)};`;
  },
};
