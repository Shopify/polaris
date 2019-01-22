const {extname} = require('path');
const {createFilter} = require('rollup-pluginutils');
const SVGO = require('svgo');

const {svgOptions} = require('@shopify/images/optimize');

const VIEWBOX_REGEX = /viewBox="([^"]*)"/;
const SVG_REGEX = /(<svg[^>]*>|<\/svg>)/g;
const FILL_REGEX = /fill="[^"]*"/g;

const svgo = new SVGO(svgOptions());

module.exports = function icon(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'shopify-icon',

    transform(source, id) {
      if (extname(id) !== '.svg') {
        return null;
      }
      if (!filter(id)) {
        return null;
      }

      return new Promise((resolve) => {
        svgo.optimize(source, (result) => {
          const finalSource = result.data.replace(FILL_REGEX, (fill) => {
            return fill.includes('#FFF') ? 'fill="currentColor"' : '';
          });

          const viewBox = VIEWBOX_REGEX.exec(finalSource)[1];
          const svgExport = JSON.stringify({
            viewBox,
            body: finalSource.replace(SVG_REGEX, ''),
          });

          resolve(`export default ${svgExport};`);
        });
      });
    },
  };
};
