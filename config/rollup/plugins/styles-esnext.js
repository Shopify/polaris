import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import glob from 'glob';
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

    // Generate the esnext/styles folder.
    // This is only needed because we allow consuming apps to use our helper
    // functions and mixins in shared.scss/foundations.scss
    // We can't point SK consumers to use the versions living in the top level
    // generated styles folder (as build in styles-standalone) because those
    // SK consumers need to have the raw contents, instead of the ones that have
    // :global declarations stripped out of them
    generateBundle() {
      const globOptions = {cwd: inputRoot, ignore: 'styles/_common.scss'};

      glob.sync(`styles/**/*.scss`, globOptions).forEach((filePath) => {
        const file = fs.readFileSync(`${inputRoot}/${filePath}`, 'utf8');

        this.emitFile({type: 'asset', fileName: filePath, source: file});
      });
    },
  };
}
