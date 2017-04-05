import postcss from 'postcss';
import {readFileSync, ensureDirSync, writeFile} from 'fs-extra';
import {resolve as resolvePath, dirname} from 'path';
import {render} from 'node-sass';
import {createFilter} from 'rollup-pluginutils';

import cssModulesExtractImports from 'postcss-modules-extract-imports';
import cssModulesLocalByDefault from 'postcss-modules-local-by-default';
import cssModulesScope from 'postcss-modules-scope';
import cssModulesValues from 'postcss-modules-values';
import Parser from 'postcss-modules-parser';
import postcssShopify from 'postcss-shopify';
import genericNames from 'generic-names';

export default function styles(options = {}) {
  const filter = createFilter(options.include || ['**/*.css', '**/*.scss'], options.exclude);
  const includePaths = options.includePaths || [];
  const compiledStyles = [];
  const tokensByFile = {};

  const generateScopedName = typeof options.generateScopedName === 'function'
    ? options.generateScopedName
    : genericNames(options.generateScopedName || '[path]___[name]___[local]___[hash:base64:5]', {
      context: process.cwd(),
    });

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
      if (!filter(id)) { return null; }

      return new Promise((resolve, reject) => {
        render({
          data: source,
          includePaths: includePaths.concat(dirname(id)),
        }, (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          const sassOutput = result.css.toString();
          resolve(getPostCSSOutput(processor, sassOutput, id));
        });
      })
        .then(({css, tokens}) => {
          tokensByFile[id] = tokens;

          const code = Object
            .keys(tokens)
            .map((className) => `export var ${className} = ${JSON.stringify(tokens[className])};`)
            .join('\n');

          compiledStyles.push(css);
          return code;
        });
    },
    ongenerate(generateOptions) {
      if (options.output === false) {
        return null;
      }

      const jsDestination = generateOptions.dest || 'bundle.js';
      let cssDestination = typeof options.output === 'string' ? options.output : null;

      if (cssDestination == null) {
        cssDestination = jsDestination.endsWith('.js')
          ? `${jsDestination.slice(0, -3)}.css`
          : `${jsDestination}.css`;
      }

      const tokensDestination = `${cssDestination.slice(0, -4)}.tokens.json`;

      ensureDirSync(dirname(cssDestination));

      return Promise.all([
        write(cssDestination, compiledStyles.join('\n\n')),
        write(tokensDestination, JSON.stringify(tokensByFile, null, 2)),
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
