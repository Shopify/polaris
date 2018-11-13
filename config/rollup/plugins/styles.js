import {resolve as resolvePath, dirname} from 'path';
import postcss from 'postcss';
import {readFileSync, ensureDirSync, writeFile} from 'fs-extra';
import {render} from 'node-sass';
import {createFilter} from 'rollup-pluginutils';
import cssnano from 'cssnano';

import cssModulesExtractImports from 'postcss-modules-extract-imports';
import cssModulesLocalByDefault from 'postcss-modules-local-by-default';
import cssModulesScope from 'postcss-modules-scope';
import cssModulesValues from 'postcss-modules-values';
import Parser from 'postcss-modules-parser';
import postcssShopify from 'postcss-shopify';
import genericNames from 'generic-names';

export default function styles(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );
  const {
    output,
    includePaths = [],
    includeAlways = [],
    generateScopedName: userGenerateScopedName,
  } = options;
  const compiledStyles = [];
  const tokensByFile = {};

  const generateScopedName =
    typeof userGenerateScopedName === 'function'
      ? userGenerateScopedName
      : genericNames(
          userGenerateScopedName ||
            '[path]___[name]___[local]___[hash:base64:5]',
          {
            context: process.cwd(),
          },
        );

  const includeAlwaysSource = includeAlways
    .map((resource) => readFileSync(resource, 'utf8'))
    .join('\n');

  const processor = postcss([
    cssModulesValues,
    cssModulesLocalByDefault,
    cssModulesExtractImports,
    cssModulesScope({generateScopedName}),
    new Parser({
      fetch(to, from) {
        const fromDirectoryPath = dirname(from);
        const toPath = resolvePath(fromDirectoryPath, to);
        const source = readFileSync(toPath, 'utf8');
        return getPostCSSOutput(processor, source, toPath);
      },
    }),
    postcssShopify(),
  ]);

  return {
    name: 'shopify-styles',

    transform(source, id) {
      if (!filter(id)) {
        return null;
      }

      return new Promise((resolve, reject) => {
        render(
          {
            data: `${includeAlwaysSource}\n${source}`,
            includePaths: includePaths.concat(dirname(id)),
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            const sassOutput = result.css.toString();
            resolve(getPostCSSOutput(processor, sassOutput, id));
          },
        );
      }).then(({css, tokens}) => {
        tokensByFile[id] = tokens;

        const properties = Object.keys(tokens)
          .map(
            (className) =>
              `  ${JSON.stringify(className)}: ${JSON.stringify(
                tokens[className],
              )},`,
          )
          .join('\n');

        compiledStyles.push(css);
        return `export default {\n${properties}\n};`;
      });
    },
    ongenerate(generateOptions) {
      if (output === false) {
        return null;
      }

      const jsDestination = generateOptions.dest || 'bundle.js';
      let cssDestination = typeof output === 'string' ? output : null;

      if (cssDestination == null) {
        cssDestination = jsDestination.endsWith('.js')
          ? `${jsDestination.slice(0, -3)}.css`
          : `${jsDestination}.css`;
      }

      const minifiedCSSDestination = `${cssDestination.slice(0, -4)}.min.css`;
      const tokensDestination = `${cssDestination.slice(0, -4)}.tokens.json`;
      const css = compiledStyles.join('\n\n');

      ensureDirSync(dirname(cssDestination));

      return Promise.all([
        write(cssDestination, css),
        write(tokensDestination, JSON.stringify(tokensByFile, null, 2)),
        cssnano
          .process(css)
          .then((result) => write(minifiedCSSDestination, result.css)),
      ]);
    },
  };
}

function write(file, content) {
  return new Promise((resolve, reject) => {
    writeFile(file, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function getPostCSSOutput(processor, source, path) {
  return processor
    .process(source, {
      from: path,
    })
    .then(({css, root: {tokens}}) => ({
      css,
      tokens,
    }));
}
