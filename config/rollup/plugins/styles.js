const {resolve: resolvePath, dirname} = require('path');
const postcss = require('postcss');
const {readFileSync, ensureDirSync, writeFile} = require('fs-extra');
const {render} = require('node-sass');
const {createFilter} = require('rollup-pluginutils');
const cssnano = require('cssnano');

const cssModulesExtractImports = require('postcss-modules-extract-imports');
const cssModulesLocalByDefault = require('postcss-modules-local-by-default');
const cssModulesScope = require('postcss-modules-scope');
const cssModulesValues = require('postcss-modules-values');
const Parser = require('postcss-modules-parser');
const postcssShopify = require('postcss-shopify');
const genericNames = require('generic-names');

module.exports = function styles(options = {}) {
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
  const cssAndTokens = [];

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
      }).then((postCssOutput) => {
        cssAndTokens.push({...postCssOutput, id});

        const properties = Object.keys(postCssOutput.tokens)
          .map(
            (className) =>
              `  ${JSON.stringify(className)}: ${JSON.stringify(
                postCssOutput.tokens[className],
              )},`,
          )
          .join('\n');

        return `export default {\n${properties}\n};`;
      });
    },
    generateBundle(generateOptions) {
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

      // Items can be added to cssAndTokens in an unspecified order as
      // whatever transform gets resolved first appears first. Sort the list
      // so we get consistant output in the concatenated files
      const sortedCssAndTokens = cssAndTokens.sort((item1, item2) =>
        item1.id.localeCompare(item2.id),
      );

      const css = sortedCssAndTokens.map((item) => item.css).join('\n\n');
      const tokensByFile = sortedCssAndTokens.reduce((memo, item) => {
        memo[item.id] = item.tokens;
        return memo;
      }, {});

      ensureDirSync(dirname(cssDestination));

      return Promise.all([
        write(cssDestination, css),
        write(tokensDestination, `${JSON.stringify(tokensByFile, null, 2)}\n`),
        cssnano
          .process(css, {from: generateOptions.file})
          .then((result) => write(minifiedCSSDestination, result.css)),
      ]);
    },
  };
};

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
