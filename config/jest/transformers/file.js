const {basename} = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(basename(filename))};`;
  },
};
