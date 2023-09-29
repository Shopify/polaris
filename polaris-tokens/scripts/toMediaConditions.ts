import fs from 'fs';
import path from 'path';

import {getMediaConditions} from '../src';
import {metaThemeDefault} from '../src/themes';
import {extractMetaTokenGroupValues} from '../src/themes/utils';

const scssOutputDir = path.join(__dirname, '../dist/scss');
const scssOutputPath = path.join(scssOutputDir, 'media-queries.scss');
const jsOutputPath = path.join(scssOutputDir, 'media-queries.js');

export async function toMediaConditions() {
  await fs.promises.mkdir(scssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const mediaConditionEntries = Object.entries(
    getMediaConditions(
      extractMetaTokenGroupValues(metaThemeDefault.breakpoints),
    ),
  );

  const scssVars = mediaConditionEntries
    .map(([token, mediaConditions]) =>
      Object.entries(mediaConditions)
        .map(
          ([direction, mediaCondition]) =>
            `$p-${token}-${direction}: '${mediaCondition}';`,
        )
        .join('\n'),
    )
    .join('\n\n');

  const jsVars = mediaConditionEntries.reduce(
    (acc, [token, mediaConditions]) => {
      const mediaConditionEntries = Object.entries(mediaConditions);
      const mediaConditionObject = mediaConditionEntries.reduce(
        (acc, [direction, mediaCondition]) => {
          return {
            ...acc,
            [`--p-${token}-${direction}`]: mediaCondition,
          };
        },
        {},
      );

      return {
        ...acc,
        ...mediaConditionObject,
      };
    },
    {},
  );

  await fs.promises.writeFile(scssOutputPath, scssVars, 'utf-8');
  await fs.promises.writeFile(
    jsOutputPath,
    `module.exports = {environmentVariables: ${JSON.stringify(
      jsVars,
      null,
      2,
    )}}`,
    'utf-8',
  );
}
