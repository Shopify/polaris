import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import nodeSass from 'node-sass';
import postcss from 'postcss';
import cssModules from 'postcss-modules';

import {getNamespacedClassName} from './namespaced-classname';

export function styles({
  output,
  plugins = [],
  mode,
  include = ['**/*.css', '**/*.scss'],
  exclude,
} = {}) {
  if (!['standalone', 'esnext'].includes(mode)) {
    throw new Error(
      `Expected mode to be either "standalone" or "esnext", but got "${mode}"`,
    );
  }

  const filter = createFilter(include, exclude);

  const renderSass = promisify(nodeSass.render);

  const styleProcessor = postcss([
    cssModules({
      generateScopedName: getNamespacedClassName,
      // eslint-disable-next-line no-empty-function
      getJSON() {},
    }),
    ...plugins,
  ]);

  let inputRoot;

  const processedExt = '.css';

  const cssByFile = {};

  function transformStandalone(rollup, id, postCssOutput) {
    cssByFile[id] = postCssOutput.css;

    const properties = JSON.stringify(postCssOutput.tokens, null, 2);
    return `export default ${properties};`;
  }

  function transformEsNext(rollup, id, postCssOutput) {
    const relativePath = `./${path.relative(
      path.dirname(id),
      id.replace(/\.scss$/, processedExt),
    )}`;

    rollup.emitFile({
      type: 'asset',
      fileName: id
        .replace(`${inputRoot}/`, '')
        .replace(/\.scss$/, processedExt),
      source: postCssOutput.css,
    });

    const properties = JSON.stringify(postCssOutput.tokens, null, 2);
    return `import './${relativePath}';\nexport default ${properties};`;
  }

  function generateBundleStandalone(rollup, generateOptions, bundles) {
    // generateBundle gets called once per call to bundle.write(). We call
    // that twice - one for the cjs build (index.js), one for the esm build
    // (index.mjs). We only want to do perform this logic once though
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
    rollup.emitFile({type: 'asset', fileName: output, source: css});
  }

  return {
    name: 'styles',

    buildStart({input}) {
      inputRoot = path.dirname(input);
    },

    // Treat CSS files as external - don't try and resolve them within Rollup
    // This only gets triggered in esnext mode when we emit imports of css files
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
        .then((result) => ({
          css: result.css,
          tokens: result.messages.find(({plugin, type}) => {
            return plugin === 'postcss-modules' && type === 'export';
          }).exportTokens,
        }));

      if (mode === 'standalone') {
        return transformStandalone(this, id, postCssOutput);
      }
      if (mode === 'esnext') {
        return transformEsNext(this, id, postCssOutput);
      }
    },

    generateBundle(generateOptions, bundles) {
      if (mode === 'standalone') {
        return generateBundleStandalone(this, generateOptions, bundles);
      }
    },
  };
}
