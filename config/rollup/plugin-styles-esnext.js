import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import nodeSass from 'node-sass';
import postcss from 'postcss';
import cssModules from 'postcss-modules';
import postcssShopify from '@shopify/postcss-plugin';

import {getNamespacedClassName} from './namespaced-classname';

const renderSass = promisify(nodeSass.render);

export function stylesEsNext(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );

  const processedExt = '.css';

  let inputRoot;

  const styleProcessor = postcss([
    cssModules({
      generateScopedName: getNamespacedClassName,
      // eslint-disable-next-line no-empty-function
      getJSON() {},
    }),
    postcssShopify(),
  ]);

  return {
    name: 'styles-esnext',

    buildStart({input}) {
      inputRoot = path.dirname(input);
    },

    // Treat CSS files as external - don't try and resolve them within Rollup
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

      const postCssOutput = await styleProcessor
        .process(sassOutput, {from: id})
        .then(({css, root: {tokens}}) => ({css, tokens}));

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
        source: postCssOutput.css,
      });

      const properties = JSON.stringify(postCssOutput.tokens, null, 2);
      return `import './${relativePath}';\nexport default ${properties};`;
    },
  };
}
