// rollup.config.js
import fs from 'fs';
import path from 'path';

import babel from '@rollup/plugin-babel';
import virtual from '@rollup/plugin-virtual';
import glob from 'glob';
import jsYaml from 'js-yaml';

import customTypes from '../../config/rollup/plugins/customTypes';
import svgBuild from '../../config/rollup/plugins/svgBuild';

const WHITE_REGEX = /^#fff(?:fff)?$/i;

const iconBasePath = path.resolve(__dirname, '../../icons');

const entrypointContent = glob
  .sync('*.yml', {cwd: iconBasePath})
  .map(exportsForMetadata)
  .join('\n\n');

// We know react only ships cjs with a default export. By being explicit here,
// we get to shave off some unneeded interop code
const interop = (id) => (id === 'react' ? 'defaultOnly' : 'auto');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
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
    const iconsSrcPath = `${path.resolve(__dirname, '../../icons')}/`;
    if (id.startsWith(iconsSrcPath)) {
      return id.replace(iconsSrcPath, 'icons/');
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
      include: '../../icons/*.svg',
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

  return `${deprecatedNotice}export {default as ${exportedName}} from '../../../icons/${svgFilename}';`;
}
