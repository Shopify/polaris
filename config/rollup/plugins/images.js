import {readFileSync} from 'fs';
import {extname} from 'path';

import {createFilter} from '@rollup/pluginutils';

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const EXTENSIONS_FOR_GLOB = Object.keys(MIME_TYPES)
  .map((ext) => ext.slice(1))
  .join(',');

export function images(options = {}) {
  const filter = createFilter(
    options.include || [`**/*.{${EXTENSIONS_FOR_GLOB}}`],
    options.exclude,
  );

  return {
    name: 'images',

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
}
