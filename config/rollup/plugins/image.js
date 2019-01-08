const {readFileSync} = require('fs');
const {extname} = require('path');
const {createFilter} = require('rollup-pluginutils');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

module.exports = function image(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'shopify-image',

    load(id) {
      if (!filter(id)) {
        return null;
      }

      const mime = MIME_TYPES[extname(id)];
      if (!mime) {
        return null;
      }

      const data = readFileSync(id, 'base64');
      return `export default 'data:${mime};base64,${data}';`;
    },
  };
};
