import {extname} from 'path';
import {createFilter} from 'rollup-pluginutils';
import SVGO from 'svgo';

import {svgOptions} from '@shopify/images/optimize';

const VIEWBOX_REGEX = /viewBox="([^"]*)"/;
const SVG_REGEX = /(<svg[^>]*>|<\/svg>)/g;
const FILL_REGEX = /fill="[^"]*"/g;

const svgo = new SVGO(svgOptions());

export default function icon(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'shopify-icon',

    transform(source, id) {
      if (extname(id) !== '.svg') { return null; }
      if (!filter(id)) { return null; }

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
}
