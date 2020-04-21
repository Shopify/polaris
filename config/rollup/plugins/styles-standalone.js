import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import glob from 'glob';
import nodeSass from 'node-sass';
import postcss from 'postcss';
import cssNano from 'cssnano';
import cssModulesExtractImports from 'postcss-modules-extract-imports';
import cssModulesLocalByDefault from 'postcss-modules-local-by-default';
import cssModulesScope from 'postcss-modules-scope';
import cssModulesValues from 'postcss-modules-values';
import Parser from 'postcss-modules-parser';
import postcssShopify from '@shopify/postcss-plugin';

import {getNamespacedClassName} from '../namespaced-classname';

const renderSass = promisify(nodeSass.render);

export function stylesStandalone(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );

  const {output} = options;
  const cssByFile = {};

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
    name: 'styles-standalone',

    buildStart({input}) {
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

      const postCssOutput = await getPostCSSOutput(
        styleProcessor,
        sassOutput,
        id,
      );

      cssByFile[id] = postCssOutput.css;

      const properties = JSON.stringify(postCssOutput.tokens, null, 2);
      return `export default ${properties};`;
    },

    async generateBundle(generateOptions, bundles) {
      // generateBundle gets called once per call to bundle.write(). We call
      // that twice - one for the cjs build (polaris.js), one for the esm build
      // (polaris.es.js). We only want to do perform this logic once though
      if (!generateOptions.file.endsWith('/index.js')) {
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

      // Regular css file
      this.emitFile({type: 'asset', fileName: output, source: css});
      // Minified css file
      this.emitFile({
        type: 'asset',
        fileName: output.replace(/\.css$/, '.min.css'),
        source: await cssNano
          .process(css, {from: undefined})
          .then((result) => result.css),
      });

      generateSass(this.emitFile, inputRoot, orderedCssByFile);
    },
  };
}

function getPostCSSOutput(processor, source, fromPath) {
  return processor
    .process(source, {from: fromPath})
    .then(({css, root: {tokens}}) => ({css, tokens}));
}

/**
 * The Sass build - the styles folder.
 * We precompile our source Sass to avoid the possibility that people may
 * accidentally overwrite some of our Sass variables / mixins / functions.
 * The only Sass feature we use in the built output is the importing of partials
 * to generate fewer entrypoints.
 *
 * - global.scss: previously contained standard css that must be included by all
 *   applications as it contained global styles. This css is now handled by
 *   AppProvider.scss which is imported as a side effect of importing
 *   AppProvider. Exists as an empty file for backwards compatibility with
 *   versions of sewing-kit prior to v0.113.0. Shall be removed in v6.
 * - components.scss and the components folder: a suite of the compiled css for
 *  every component
 * - foundation.scss, shared.scss and the foundation and shared folders: our
 *   public Sass API.
 */
function generateSass(emitFile, inputFolder, cssByFile) {
  // Copy contents of $inputFolder/styles/shared.scss and $inputFolder/styles/foundation.scss
  // and the foundation, shared and polaris-tokens folders into into build/styles
  // We need to transform the contents of the files as some of them contain
  // `:global` css modules definitions that we want to strip out
  const stripGlobalRegex = /:global\s*\(([^)]+)\)|:global\s*{\s*([^}]+)\s*}\s*/g;
  const globOptions = {cwd: inputFolder, ignore: 'styles/_common.scss'};

  glob.sync(`styles/**/*.scss`, globOptions).forEach((filePath) => {
    const file = fs
      .readFileSync(`${inputFolder}/${filePath}`, 'utf8')
      .replace(stripGlobalRegex, '$1$2');
    emitFile({type: 'asset', fileName: filePath, source: file});
  });

  const componentFilesContent = [];
  cssByFile.forEach((compiledCss, filename) => {
    // For every referenced file that lives in the components folder:
    // - make a note of the contents to use in styles/components.scss
    if (filename.startsWith(`${inputFolder}/components`)) {
      componentFilesContent.push(compiledCss);
    }
  });

  // Generate styles/components.scss
  // Contains contents for all the individual components that we collected above
  emitFile({
    type: 'asset',
    fileName: `styles/components.scss`,
    source: componentFilesContent.join('\n\n'),
  });

  // Generate styles.scss
  emitFile({
    type: 'asset',
    fileName: `styles.scss`,
    source: `@import 'styles/public-api';
@import 'styles/components';
`,
  });
}
