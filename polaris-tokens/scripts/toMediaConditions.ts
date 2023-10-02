import fs from 'fs';
import path from 'path';

import {getMediaConditions} from '../src';
import {metaThemeDefault} from '../src/themes';
import {extractMetaTokenGroupValues} from '../src/themes/utils';

const cssOutputDir = path.join(__dirname, '../dist/css');
const cssOutputPath = path.join(cssOutputDir, 'media-queries.css');

const scssOutputDir = path.join(__dirname, '../dist/scss');
const scssOutputPath = path.join(scssOutputDir, 'media-queries.scss');

const mediaConditionEntries = Object.entries(
  getMediaConditions(extractMetaTokenGroupValues(metaThemeDefault.breakpoints)),
);

export async function toMediaConditions() {
  await Promise.all([
    generateCssMediaCondition(),
    generateScssMediaCondition(),
  ]);
}

async function generateCssMediaCondition() {
  await fs.promises.mkdir(cssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });
  const cssStyles = generateMediaConditionStyles(
    (token, direction, mediaCondition) =>
      `@custom-media --p-${token}-${direction} ${mediaCondition};`,
  );
  await fs.promises.writeFile(cssOutputPath, cssStyles);
}

// Remove this function once we no longer need to support SCSS
async function generateScssMediaCondition() {
  await fs.promises.mkdir(scssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });
  const scssStyles = generateMediaConditionStyles(
    (token, direction, mediaCondition) =>
      `$p-${token}-${direction}: '${mediaCondition}';`,
  );
  await fs.promises.writeFile(scssOutputPath, scssStyles);
}

function generateMediaConditionStyles(
  styleGenerator: (
    token: string,
    direction: string,
    mediaCondition: string,
  ) => string,
): string {
  return mediaConditionEntries
    .map(([token, mediaConditions]) =>
      Object.entries(mediaConditions)
        .map(([direction, mediaCondition]) =>
          styleGenerator(token, direction, mediaCondition),
        )
        .join('\n'),
    )
    .join('\n\n');
}
