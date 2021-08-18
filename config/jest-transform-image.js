const {basename} = require('path');

const ICON_REGEX = /icons\/.*\.svg$/;

module.exports = {
  process(src, filename) {
    if (ICON_REGEX.test(filename)) {
      return `const React = require('react');
      module.exports = () => React.createElement("svg", {"data-src": ${JSON.stringify(
        basename(filename),
      )}});`;
    }

    return `module.exports = ${JSON.stringify(basename(filename))};`;
  },
};
