const {basename} = require('path');

const ICON_REGEX = /icons\/.*\.svg$/;

module.exports = {
  process(src, filename) {
    const content = ICON_REGEX.test(filename)
      ? {body: '<path />', viewBox: '0 0 20 20'}
      : basename(filename);

    return `module.exports = ${JSON.stringify(content)};`;
  },
};
