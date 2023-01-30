// rollup.config.js
import * as fs from 'fs';
import * as path from 'path';

import {createFilter} from '@rollup/pluginutils';
import {babel} from '@rollup/plugin-babel';
import virtual from '@rollup/plugin-virtual';
import globby from 'globby';
import jsYaml from 'js-yaml';
import svgr from '@svgr/core';
import {optimize} from 'svgo';

const convert = svgr.default;
const iconBasePath = new URL('./icons', import.meta.url).pathname;
const iconPaths = globby.sync(path.join(iconBasePath, '*.yml'));

const iconExports = [];
const iconTypes = [];
const iconMetadata = {};
const ommitedKeys = [
  'version',
  'exclusive_use',
  'authors',
  'date_modified',
  'date_added',
];

iconPaths.forEach((filename) => {
  const iconData = jsYaml.load(fs.readFileSync(filename), {
    schema: jsYaml.JSON_SCHEMA,
  });

  ommitedKeys.forEach((key) => delete iconData[key]);

  const exportName = filename
    .replace(`${iconBasePath}/`, '')
    .replace('.yml', '');

  iconMetadata[exportName] = {
    id: exportName,
    ...iconData,
  };
  iconExports.push(
    `export {default as ${exportName}} from '../icons/${exportName}.svg';`,
  );
  iconTypes.push(
    `export declare const ${exportName}: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;`,
  );
});

const entrypointContent = iconExports.join('\n');
const entrypointTypes = iconTypes.join('\n');

const metadataContent = `
const metadata = ${JSON.stringify(iconMetadata, null, 2)};
export default metadata;
`.trim();
const metadataTypes = `export interface Icon {
  id: string;
  name: string;
  set: 'major' | 'minor';
  description: string;
  keywords: string[];
}

declare const metadata: {
  [iconId: string]: Icon;
};

export default metadata;
`.trim();

// We know react only ships cjs with a default export. By being explicit here,
// we get to shave off some unneeded interop code
const interop = (id) => (id === 'react' ? 'defaultOnly' : 'auto');

function customTypes({fileName, source}) {
  return {
    name: 'custom-types',
    buildEnd() {
      if (source.length === 0) {
        this.warn('source content is empty');
      }

      this.emitFile({type: 'asset', fileName, source});
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

  svgoConfig.plugins.push({
    ...replaceFillAttributeSvgoPlugin(),
  });

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
function replaceFillAttributeSvgoPlugin() {
  return {
    type: 'perItem',
    name: 'replaceFillAttibute',
    description: 'replaces fill attributes using a user-defined function',
    fn(item) {
      if (!item.isElem() || !item.attr('fill')) {
        return;
      }

      item.removeAttr('fill');
    },
  };
}

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        interop,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        manualChunks: (id) => {
          if (id.startsWith(iconBasePath)) {
            return id.replace(iconBasePath, 'icons/');
          }
        },
      },
      {
        dir: 'dist',
        format: 'esm',
        interop,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        manualChunks: (id) => {
          if (id.startsWith(iconBasePath)) {
            return id.replace(iconBasePath, 'icons/');
          }
        },
      },
    ],

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
      svgBuild({include: `${iconBasePath}/*.svg`}),
      babel({
        rootMode: 'upward',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        envName: 'production',
        babelHelpers: 'bundled',
      }),
      customTypes({fileName: `index.d.ts`, source: entrypointTypes}),
    ],
  },
  {
    input: 'src/metadata.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].js',
        exports: 'default',
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].mjs',
      },
    ],
    plugins: [
      virtual({
        'src/metadata.ts': metadataContent,
      }),
      customTypes({fileName: `metadata.d.ts`, source: metadataTypes}),
    ],
  },
];
