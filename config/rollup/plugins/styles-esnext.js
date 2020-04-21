import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import nodeSass from 'node-sass';

const renderSass = promisify(nodeSass.render);

export function stylesEsNext(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );

  const processedExt = '.processed.scss';

  let inputRoot;

  return {
    name: 'styles-esnext',

    buildStart({input}) {
      inputRoot = path.dirname(input);
    },

    // Treat processed scss files as external - don't try and resolve them within Rollup
    resolveId(source, importer) {
      if (source.endsWith(processedExt)) {
        return {
          id: path.resolve(path.dirname(importer), source),
          external: true,
        };
      }
    },

    async transform(source, id) {
      if (!filter(id)) {
        return null;
      }

      const sassOutput = await renderSass({
        data: source,
        includePaths: [path.dirname(id)],
      }).then((result) => result.css.toString());

      const assetFileName = id
        .replace(`${inputRoot}/`, '')
        .replace(/\.scss$/, processedExt);

      const relativePath = `./${path.relative(
        path.dirname(id),
        id.replace(/\.scss$/, processedExt),
      )}`;

      this.emitFile({
        type: 'asset',
        fileName: assetFileName,
        source: sassOutput,
      });

      return {
        code: `export {default} from './${relativePath}'`,
      };
    },
  };
}
