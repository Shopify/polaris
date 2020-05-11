const util = require('util');
const path = require('path');

const postcss = require('postcss');
const {ensureDir, outputFile, readFileSync, writeFile} = require('fs-extra');
const glob = require('glob');
const nodeSass = require('node-sass');
const {createFilter} = require('rollup-pluginutils');
const cssnano = require('cssnano');
const cssModulesExtractImports = require('postcss-modules-extract-imports');
const cssModulesLocalByDefault = require('postcss-modules-local-by-default');
const cssModulesScope = require('postcss-modules-scope');
const cssModulesValues = require('postcss-modules-values');
const Parser = require('postcss-modules-parser');
const postcssShopify = require('postcss-shopify');

const generateScopedName = require('../namespaced-classname');

const renderSass = util.promisify(nodeSass.render);

module.exports = function styles(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );

  const {output} = options;
  const cssByFile = {};

  let inputRoot;

  const processor = postcss([
    cssModulesValues,
    cssModulesLocalByDefault,
    cssModulesExtractImports,
    cssModulesScope({generateScopedName}),
    new Parser({
      fetch(to, from) {
        const fromDirectoryPath = path.dirname(from);
        const toPath = path.resolve(fromDirectoryPath, to);
        const source = readFileSync(toPath, 'utf8');
        return getPostCSSOutput(processor, source, toPath);
      },
    }),
    postcssShopify(),
  ]);

  return {
    name: 'shopify-styles',

    options({input}) {
      inputRoot = path.dirname(input);
    },

    async transform(source, id) {
      if (!filter(id)) {
        return null;
      }

      const sassOutput = await renderSass({
        data: source,
        includePaths: [path.dirname(id)],
      }).then((result) => result.css.toString());

      const postCssOutput = await getPostCSSOutput(processor, sassOutput, id);

      cssByFile[id] = postCssOutput.css;

      const properties = JSON.stringify(postCssOutput.tokens, null, 2);
      return `export default ${properties};`;
    },

    async generateBundle(generateOptions, bundles) {
      // generateBundle gets called once per call to bundle.write(). We call
      // that twice - one for the cjs build (polaris.js), one for the esm build
      // (polaris.es.js). We only want to do perform this logic once though
      if (generateOptions.file.endsWith('/polaris.js')) {
        return;
      }

      if (typeof output !== 'string') {
        return;
      }

      // Items are added to cssAndTokensByFile in an unspecified order as
      // whatever transform gets resolved first appears first. The contents of
      // the css file should use the order in which scss files were referenced
      // in the compiled javascript file.
      const styleIds = Object.keys(cssByFile);
      const includedStyleIds = Array.from(
        Object.values(bundles).reduce((memo, bundle) => {
          Object.keys(bundle.modules).forEach((moduleName) => {
            if (styleIds.includes(moduleName)) {
              memo.add(moduleName);
            }
          });
          return memo;
        }, new Set()),
      );

      const orderedCssByFile = includedStyleIds.reduce((memo, id) => {
        return memo.set(id, cssByFile[id]);
      }, new Map());

      const css = Array.from(orderedCssByFile.values()).join('\n\n');

      await ensureDir(path.dirname(output));
      await Promise.all([
        writeFile(output, css),
        generateMinifiedCss(output, css),
        generateSass(inputRoot, path.dirname(output), orderedCssByFile),
      ]);
    },
  };
};

function getPostCSSOutput(processor, source, fromPath) {
  return processor
    .process(source, {from: fromPath})
    .then(({css, root: {tokens}}) => ({css, tokens}));
}

/**
 * Generate a minified css file next to the input file
 */
function generateMinifiedCss(sourceFilePath, css) {
  const outputPath = `${sourceFilePath.slice(0, -4)}.min.css`;

  return cssnano
    .process(css, {from: sourceFilePath, to: outputPath})
    .then((result) => writeFile(outputPath, result.css));
}

/**
 * The Sass build - the styles folder.
 * We precompile our source Sass to avoid the possibility that people may
 * accidentally overwrite some of our Sass variables / mixins / functions.
 * The only Sass feature we use in the built output is the importing of partials
 * to generate fewer entrypoints.
 *
 * - global.scss: standard css that must be included by all applications.
 *   per-ccomponent styles (e.g. Button.scss) rely on the typography defined in
 *   this base file.
 * - components.scss and the components folder: a suite of the compiled css for
 *  every component
 * - _public-api.scss, foundation.scss, shared.scss and the foundation and
 *  shared folders: our public Sass API.
 */
async function generateSass(inputFolder, outputFolder, cssByFile) {
  // Copy contents of $inputFolder/styles/shared.scss and $inputFolder/styles/foundation.scss
  // and the foundation, shared and polaris-tokens folders into into build/styles
  // We need to transform the contents of the files as some of them contain
  // `:global` css modules definitions that we want to strip out
  const stripGlobalRegex = /:global\s*\(([^)]+)\)|:global\s*{\s*([^}]+)\s*}\s*/g;
  const globOptions = {cwd: inputFolder, ignore: 'styles/_common.scss'};
  await Promise.all(
    glob.sync(`styles/**/*.scss`, globOptions).map((filePath) => {
      const file = readFileSync(`${inputFolder}/${filePath}`, 'utf8').replace(
        stripGlobalRegex,
        '$1$2',
      );
      return outputFile(`${outputFolder}/${filePath}`, file);
    }),
  );

  const writeStylesFolderFilesPromises = [];
  const componentFilesContent = [];
  cssByFile.forEach((compiledCss, filename) => {
    // Promises to copy the files referenced that live in the styles folder
    if (filename.startsWith(`${inputFolder}/styles`)) {
      writeStylesFolderFilesPromises.push(
        outputFile(filename.replace(inputFolder, outputFolder), compiledCss),
      );
    }

    // For every referenced file that lives in the components folder:
    // - make a note of the contents to use in styles/components.scss
    if (filename.startsWith(`${inputFolder}/components`)) {
      componentFilesContent.push(compiledCss);
    }
  });

  // Generate styles/components.scss
  // Contains contents for all the individual components that we collected above
  const componentsScssContents = componentFilesContent.join('\n\n');

  // Generate polaris.scss
  const polarisScssContent = `@import 'styles/public-api';
@import 'styles/global';
@import 'styles/components';
`;

  await Promise.all([
    ...writeStylesFolderFilesPromises,
    outputFile(
      `${outputFolder}/styles/components.scss`,
      componentsScssContents,
    ),
    outputFile(`${outputFolder}/styles.scss`, polarisScssContent),
  ]);
}
