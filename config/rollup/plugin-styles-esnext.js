import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import nodeSass from 'node-sass';
import postcss from 'postcss';
import cssModulesExtractImports from 'postcss-modules-extract-imports';
import cssModulesLocalByDefault from 'postcss-modules-local-by-default';
import cssModulesScope from 'postcss-modules-scope';
import cssModulesValues from 'postcss-modules-values';
import Parser from 'postcss-modules-parser';
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
    cssModulesValues,
    cssModulesLocalByDefault,
    cssModulesExtractImports,
    cssModulesScope({generateScopedName: getNamespacedClassName}),
    new Parser({
      fetch(to, from) {
        const fromDirectoryPath = path.dirname(from);
        const toPath = path.resolve(fromDirectoryPath, to);
        const source = fs.readFileSync(toPath, 'utf8');
        return getPostCSSOutput(styleProcessor, source, toPath);
      },
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

      const postCssOutput = await getPostCSSOutput(
        styleProcessor,
        sassOutput,
        id,
      );

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

function getPostCSSOutput(processor, source, fromPath) {
  return processor
    .process(source, {from: fromPath})
    .then(({css, root: {tokens}}) => ({css, tokens}));
}
