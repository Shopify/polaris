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
  const breakpointMediaQueries = generateMediaConditionStyles(
    (token, direction, mediaCondition) =>
      `@custom-media --p-${token}-${direction} ${mediaCondition};`,
  );
  const interactionMediaQueries = generateInteractionStyles(
    (interaction, mediaCondition) =>
      `@custom-media --p-interaction-${interaction} ${mediaCondition};`,
  );
  await fs.promises.writeFile(
    cssOutputPath,
    [breakpointMediaQueries, interactionMediaQueries].join('\n\n'),
  );
}

// Remove this function once we no longer need to support SCSS
async function generateScssMediaCondition() {
  await fs.promises.mkdir(scssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });
  const breakpointMediaQueries = generateMediaConditionStyles(
    (token, direction, mediaCondition) =>
      `$p-${token}-${direction}: '${mediaCondition}';`,
  );
  const interactionMediaQueries = generateInteractionStyles(
    (interaction, mediaCondition) =>
      `$p-interaction-${interaction}: '${mediaCondition}';`,
  );
  await fs.promises.writeFile(
    scssOutputPath,
    [breakpointMediaQueries, interactionMediaQueries].join('\n\n'),
  );
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

const interactionMediaQueries = {
  touch: '(hover: none) and (pointer: coarse)',
  stylus: '(hover: none) and (pointer: fine)',
  pointer: '(hover) and (pointer: coarse)',
  mouse: '(hover) and (pointer: fine)',
};

function generateInteractionStyles(
  styleGenerator: (interaction: string, mediaCondition: string) => string,
): string {
  return Object.entries(interactionMediaQueries)
    .map(([interaction, mediaCondition]) =>
      styleGenerator(interaction, mediaCondition),
    )
    .join('\n');
}
