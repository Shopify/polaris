/**
 * Usage:
 * node src/recommend.mjs --target ../polaris-react/src/components
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';

import {globby} from 'globby';
import meow from 'meow';
import pAll from 'p-map';
import sass from 'node-sass';
import {SourceMapConsumer} from 'source-map';
import postcss from 'postcss';
import {tokens} from '@shopify/polaris-tokens';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const breakpointsRecommendationsPath = path.join(
  __dirname,
  'breakpoints-recommendations.md',
);

const cli = meow({
  importMeta: import.meta,
  flags: {
    target: {
      type: 'string',
    },
  },
});

if (!cli.flags.target) {
  throw new Error(`Missing '--target' option`);
}

const targetPath = path.join(process.cwd(), cli.flags.target);

if (!fs.existsSync(targetPath)) {
  throw new Error(`The '--target' path does not exist: ${targetPath}`);
}

const files = await globby('**/*.scss', {
  cwd: targetPath,
  ignoreFiles: ['node_modules/**'],
});

/**
 * @typedef {object} DeviceSizeMediaCondition
 * @property {string} mediaCondition
 * @property {string} value
 * @property {string} unit
 * @property {number} sizeInPx
 * @property {string[]} selectors
 * @property {string} sourceFile
 * @property {string} mediaConditionFile
 * @property {number} line
 * @property {number} column
 */

/**
 * @type {DeviceSizeMediaCondition[]}
 */
const deviceSizeMediaConditions = [];

async function updateDeviceSizeMediaConditions(file) {
  const result = await sass.renderSync({
    file: path.join(targetPath, file),
    // Note: `outFile` is a required option to include source maps in the
    // `result` object. However, no file is actually written to disk.
    outFile: path.join(__dirname, 'tmp.css'),
    sourceMap: true,
  });

  const fileDeviceSizeMediaConditions = [];

  postcss.parse(result.css.toString()).walkAtRules('media', (atRule) => {
    const mediaCondition = atRule.params;

    const matchedDeviceSizeMediaConditions = Array.from(
      mediaCondition.matchAll(/([\d.]+)(px|em|rem)/g),
    );

    if (matchedDeviceSizeMediaConditions.length) {
      let selectors = [];

      atRule.walkRules((rule) => {
        // If we matched device size media conditions, we grab each associated
        // selector to easily find what to update in the original SCSS file.
        selectors = rule.selectors;
      });

      for (const [, value, unit] of matchedDeviceSizeMediaConditions) {
        fileDeviceSizeMediaConditions.push({
          mediaCondition,
          value,
          unit,
          sizeInPx:
            parseFloat(value) * (unit === 'em' || unit === 'rem' ? 16 : 1),
          selectors,
          sourceFile: file,
          line: atRule.source.start.line,
          column: atRule.source.start.column,
        });
      }
    }
  });

  if (fileDeviceSizeMediaConditions.length) {
    // If the file has device size media conditions, we consume the source map
    // to add the position of each media condition in the original SCSS file.
    const consumer = await new SourceMapConsumer(result.map.toString());

    for (const fileDeviceSizeMediaCondition of fileDeviceSizeMediaConditions) {
      const mappedPosition = consumer.originalPositionFor({
        line: fileDeviceSizeMediaCondition.line,
        column: fileDeviceSizeMediaCondition.column,
      });

      deviceSizeMediaConditions.push({
        ...fileDeviceSizeMediaCondition,
        mediaConditionFile: mappedPosition.source,
        line: mappedPosition.line,
        column: mappedPosition.column,
      });
    }
  }
}

await pAll(files, updateDeviceSizeMediaConditions, {
  concurrency: os.cpus().length,
});

const [, xsMiddleInPx] = getBreakpointInPx('xs', 'sm');
const [smInPx, smMiddleInPx] = getBreakpointInPx('sm', 'md');
const [mdInPx, mdMiddleInPx] = getBreakpointInPx('md', 'lg');
const [lgInPx, lgMiddleInPx] = getBreakpointInPx('lg', 'xl');
const [xlInPx] = getBreakpointInPx('xl');

const breakpointsRecommendations = `
# Breakpoints migration

Use this guide to help migrate you responsive design to the
new breakpoint tokens and utilities.

## Recommended updates

---

${categorizeMediaConditions(deviceSizeMediaConditions)
  .map((data) =>
    `
### ${formatData('Source file', data.sourceFile)}
- ${formatData('Media condition', data.mediaCondition)}
- ${formatData('Size in pixels', `${data.sizeInPx}px`)}
- ${formatData('Recommended update', data.recommend)}
- ${formatData('Target file', data.mediaConditionFile)}
- ${formatData('Selectors', data.selectors.join(', '))}
- ${formatData('Line', data.line)}
- ${formatData('Column', data.column)}
	`.trim(),
  )
  .join('\n---\n')}
`.trim();

function formatData(key, value) {
  return `**${key}**: \`${value}\``;
}

// await fs.promises.writeFile(
//   path.join(__dirname, 'device-size-conditions.json'),
//   JSON.stringify(categorizeMediaConditions(deviceSizeMediaConditions), null, 2),
// );
await fs.promises.writeFile(
  breakpointsRecommendationsPath,
  breakpointsRecommendations,
);

function categorizeMediaConditions(mediaConditions) {
  return mediaConditions
    .sort((mediaA, mediaB) => mediaA.sizeInPx - mediaB.sizeInPx)
    .map((mediaCondition) => {
      const sizeInPx = mediaCondition.sizeInPx;
      const isUpCondition = mediaCondition.mediaCondition.includes('min-width');

      if (sizeInPx < smInPx) {
        if (sizeInPx < xsMiddleInPx) {
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-xs-up`
            : `$p-breakpoints-sm-down`;
        } else {
          // Greater than or equal to xs-half
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-sm-up`
            : `$p-breakpoints-sm-down`;
        }
      } else if (sizeInPx < mdInPx) {
        if (sizeInPx < smMiddleInPx) {
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-sm-up`
            : `$p-breakpoints-sm-down`;
        } else {
          // Greater than or equal to sm-half
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-md-up`
            : `$p-breakpoints-md-down`;
        }
      } else if (sizeInPx < lgInPx) {
        if (sizeInPx < mdMiddleInPx) {
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-md-up`
            : `$p-breakpoints-md-down`;
        } else {
          // Greater than or equal to md-half
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-lg-up`
            : `$p-breakpoints-lg-down`;
        }
      } else if (sizeInPx < xlInPx) {
        if (sizeInPx < lgMiddleInPx) {
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-lg-up`
            : `$p-breakpoints-lg-down`;
        } else {
          // Greater than or equal to lg-half
          mediaCondition.recommend = isUpCondition
            ? `$p-breakpoints-xl-up`
            : `$p-breakpoints-xl-down`;
        }
      } else {
        // Greater than or equal to xl
        mediaCondition.recommend = isUpCondition
          ? `$p-breakpoints-xl-up`
          : `Remove media condition`;
      }

      return mediaCondition;
    });
}

function getBreakpointInPx(targetBreakpoint, nextBreakpoint) {
  const targetBreakpointInPx =
    parseFloat(tokens.breakpoints[`breakpoints-${targetBreakpoint}`].value) *
    16;

  if (!nextBreakpoint) return [targetBreakpointInPx];

  const nextBreakpointInPx =
    parseFloat(tokens.breakpoints[`breakpoints-${nextBreakpoint}`].value) * 16;

  const middleOfTargetBreakpointInPx =
    (nextBreakpointInPx - targetBreakpointInPx) / 2 + targetBreakpointInPx;

  return [targetBreakpointInPx, middleOfTargetBreakpointInPx];
}
