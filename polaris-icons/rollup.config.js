// rollup.config.js
import fs from 'fs';
import path from 'path';

import {parse, traverse} from '@babel/core';
import {createFilter} from '@rollup/pluginutils';
import babel from '@rollup/plugin-babel';
import virtual from '@rollup/plugin-virtual';
import glob from 'glob';
import jsYaml from 'js-yaml';
import convert from '@svgr/core';
import {optimize} from 'svgo';

const WHITE_REGEX = /^#fff(?:fff)?$/i;

const iconBasePath = path.resolve(__dirname, 'icons');

const entrypointContent = glob
  .sync('*.yml', {cwd: iconBasePath})
  .map(exportsForMetadata)
  .join('\n\n');

// We know react only ships cjs with a default export. By being explicit here,
// we get to shave off some unneeded interop code
const interop = (id) => (id === 'react' ? 'defaultOnly' : 'auto');

function generateTypesFile(iconExports) {
  return iconExports
    .map(
      (exportName) =>
        `export declare const ${exportName}: React.SFC<React.SVGProps<SVGSVGElement>>;`,
    )
    .join('\n');
}

function customTypes(options = {}) {
  const filter = createFilter(options.include, options.exclude, {
    resolve: false,
  });
  const iconExports = [];
  const virtualPrefix = '\u0000virtual:';

  return {
    name: 'shopify-icon',

    transform(source, id) {
      const nonVirtualId = id.startsWith(virtualPrefix)
        ? id.replace(virtualPrefix, '')
        : id;

      if (filter(nonVirtualId)) {
        const ast = parse(source, {filename: nonVirtualId});

        traverse(ast, {
          ExportNamedDeclaration(filePath) {
            const exportDeclarationName = filePath.node.specifiers
              .filter((obj) => obj.local.name === 'default')
              .map((obj) => obj.exported.name);
            iconExports.push(...exportDeclarationName);
          },
        });
      }

      return null;
    },
    buildEnd() {
      if (iconExports.length === 0) {
        this.warn('Found no exports when processing types');
      }

      this.emitFile({
        type: 'asset',
        fileName: `index.d.ts`,
        source: generateTypesFile(iconExports),
      });
    },
  };
}

/**
 * A rollup plugin that acts upon SVG files. It will:
 *
 * - Run our SVGO optimization config over the SVG contents
 * - Write the SVG to the specified `outputFolder`, for people that wish to use
 *   the raw icons
 * - Pass the optimized SVG into SVGR and return the result so that rollup can
 *   inline the result into JavaScript output, for people who wish to import
 *   React components from the index file
 */
function svgBuild(options = {}) {
  const filter = createFilter(options.include || '**/*.svg', options.exclude);

  /** @type {import('svgo').OptimizeOptions} */
  const svgoConfig = {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            /**
             * viewBox is needed in order to produce 20px by 20px containers
             * with smaller (minor) icons inside.
             */
            removeViewBox: false,

            /**
             * The following 2 settings are disabled to reduce rendering inconsistency
             * on Android. Android uses a subset of the SVG spec called SVG Tiny:
             * https://developer.android.com/studio/write/vector-asset-studio#svg-support
             */

            /**
             * Merging mutliple detached paths into a single path can lead to
             * rendering issues on some platforms where detatched paths are joined
             * by hairlines. Not merging paths results in greater compatibility
             * with minimal additional overhead.
             */
            mergePaths: false,

            convertPathData: {
              /**
               * Mixing absolute and relative path commands can lead to rendering
               * issues on some platforms. This disables converting some path data to
               * absolute if it is shorter, keeping all path data relative. Using
               * relative paths means that data points are relative  to the current
               * point at the start of the path command, which does not greatly
               * increase the quantity of path data.
               */
              utilizeAbsolute: false,
            },
          },
        },
      },
    ],
  };

  if (options.replaceFill) {
    svgoConfig.plugins.push({
      ...replaceFillAttributeSvgoPlugin(options.replaceFill),
    });
  }

  const optimizedSvgs = [];

  return {
    name: 'svgBuild',
    async transform(source, id) {
      if (!filter(id) || id.slice(-4) !== '.svg') {
        return null;
      }

      const rawSvg = fs.readFileSync(id, 'utf8');
      const {data: optimizedSvg} = await optimize(rawSvg, {
        ...svgoConfig,
        path: id,
      });

      optimizedSvgs.push({id, optimizedSvg});

      const svgrState = {filePath: id, caller: {name: 'svgBuild'}};
      const jsCode = await convert(optimizedSvg, {}, svgrState);

      return {
        code: jsCode,
        ast: {
          type: 'Program',
          sourceType: 'module',
          start: 0,
          end: null,
          body: [],
        },
        map: {mappings: ''},
      };
    },
    buildEnd() {
      optimizedSvgs.forEach(({id, optimizedSvg}) => {
        this.emitFile({
          type: 'asset',
          fileName: `svg/${path.basename(id)}`,
          source: optimizedSvg,
        });
      });
    },
  };
}

/**
 * An SVGO plugin that applies a transform function to every fill attribute
 * in an SVG. This lets you replace fill colors or remove them entirely.
 */
function replaceFillAttributeSvgoPlugin(options) {
  return {
    type: 'perItem',
    name: 'replaceFillAttibute',
    description: 'replaces fill attributes using a user-defined function',
    params: options,
    fn(item, {transform}) {
      if (!item.isElem()) {
        return;
      }

      const fillAttr = item.attr('fill');
      if (!fillAttr) {
        return;
      }

      const transformedFill = transform(fillAttr.value);
      if (transformedFill === '') {
        item.removeAttr('fill');
      } else {
        fillAttr.value = transformedFill;
      }
    },
  };
}

const config = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      interop,
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
    },
    {
      dir: 'dist',
      format: 'esm',
      interop,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name].mjs',
    },
  ],
  manualChunks: (id) => {
    // Generate distinct chunks for each icon
    // This allows consuming apps to split up the icons into multiple subchunks
    // containing a few icons each instead of always having to put every icon
    // into a single shared chunk
    if (id.startsWith(iconBasePath)) {
      return id.replace(iconBasePath, 'icons/');
    }
  },
  external: ['react'],
  onwarn: (warning, warn) => {
    // Unresolved imports means Rollup couldn't find an import, possibly because
    // we made a typo in the file name. Fail the build in that case so we know
    // when the library is no longer self-contained or we have bad imports
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(warning.message);
    }

    // Use default for everything else
    warn(warning);
  },
  plugins: [
    virtual({
      'src/index.ts': entrypointContent,
    }),
    svgBuild({
      include: `${iconBasePath}/*.svg`,
      replaceFill: {
        transform: (fill) => (WHITE_REGEX.test(fill) ? 'currentColor' : ''),
      },
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      envName: 'production',
      babelHelpers: 'bundled',
    }),
    customTypes({
      include: 'src/index.ts',
    }),
  ],
};

// eslint-disable-next-line import/no-default-export
export default config;

function exportsForMetadata(filename) {
  const metadata = jsYaml.load(
    fs.readFileSync(`${iconBasePath}/${filename}`, 'utf8'),
  );
  const exportName = filenameToExportName(filename);
  const exportFile = filename.replace(/yml$/, 'svg');

  let deprecatedExportStrings = [];
  if (metadata.deprecated_aliases) {
    deprecatedExportStrings = (metadata.deprecated_aliases || []).map(
      (deprecatedBaseName) =>
        aliasExportString(exportName, exportFile, deprecatedBaseName),
    );
  }

  return [
    mainExportString(exportName, exportFile, metadata.deprecated),
    ...deprecatedExportStrings,
  ].join('\n\n');
}

function mainExportString(exportName, exportFile, isDeprecated) {
  return exportString(exportName, exportFile, isDeprecated ? '' : undefined);
}

function aliasExportString(exportName, exportFile, deprecatedBaseName) {
  return exportString(
    filenameToExportName(deprecatedBaseName),
    exportFile,
    exportName,
  );
}

/**
 * Capitalizes the first letter and any letter following a hyphen or underscore
 * and removes hyphens and underscores
 *
 * E.g. viewport-wide_major becomes ViewportWideMajor.
 */
function filenameToExportName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/(?:^|[-_])([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 *
 * @param {*} exportedName
 * @param {*} svgFilename
 * @param {undefined|string} replaceWith
 *   If undefined then the current export is not deprecated.
 *   If an empty string then the current export is deprected with no replacement.
 *   If a non-empty string then the current export is deprecated with a replacement.
 */
function exportString(exportedName, svgFilename, replaceWith) {
  const replaceWithSuffix = replaceWith ? ` Use ${replaceWith} instead.` : '';
  const deprecatedNotice =
    replaceWith === undefined
      ? ''
      : `/** @deprecated ${exportedName} will be removed in the next major version.${replaceWithSuffix} */\n`;

  return `${deprecatedNotice}export {default as ${exportedName}} from '../icons/${svgFilename}';`;
}
