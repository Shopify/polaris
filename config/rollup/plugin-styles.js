import path from 'path';
import {promisify} from 'util';

import {createFilter} from '@rollup/pluginutils';
import nodeSass from 'node-sass';
import postcss from 'postcss';
import cssModules from 'postcss-modules';

export function styles({
  output,
  plugins = [],
  modules = {},
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
      ...modules,
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

  function generateBundleStandalone(rollup, generateOptions, bundle) {
    // generateBundle gets called once per call to bundle.write(). We call
    // that twice - one for the cjs build (index.js), one for the esm build
    // (index.es.js). We only want to do perform this logic once though
    if (!generateOptions.file.endsWith('/index.js')) {
      return;
    }

    if (typeof output !== 'string') {
      return;
    }

    // Items are added to cssByFile based on the order that transforms are
    // resolved. This may change between runs so we can't rely on it.
    // The contents of the emitted css file should use the order in which the
    // files were referenced in the compiled javascript, which can be obtained
    // by looking at bundles[].modules.
    // Rollup v2.0 changes the behaviour of bundles[].modules so that it no
    // longer includes tree-shaken modules - which includes CSS files that don't
    // expose any classnames via css-modules. So we can't update till we have a
    // better mechanism to build this list.
    // See https://github.com/rollup/rollup/issues/3651

    const bundleModuleIds = flatMap(Object.values(bundle), (fileInfo) =>
      Object.keys(fileInfo.modules),
    );

    const missingReferences = Object.keys(cssByFile).filter(
      (id) => !bundleModuleIds.includes(id),
    );

    if (missingReferences.length) {
      const formatedMissingIds = missingReferences.join('\n');
      rollup.warn(
        `cssByFile contains ids not present in bundleModuleIds. Your output may be incomplete. Missing:\n${formatedMissingIds} `,
      );
    }

    const css = bundleModuleIds
      .filter((id) => id in cssByFile)
      .map((id) => cssByFile[id])
      .join('\n\n');

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

// We're still using node 10. Array.flat(fn)/Array.flatMap(fn) are added in v11
function flatMap(array, fn) {
  return array.reduce((memo, item) => memo.concat(fn(item)), []);
}
