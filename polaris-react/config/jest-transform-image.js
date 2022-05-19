const {basename} = require('path');

module.exports = {
  process(src, filename) {
    const stringifedBasename = JSON.stringify(basename(filename));
    return `module.exports = ${stringifedBasename};`;
  },
};
