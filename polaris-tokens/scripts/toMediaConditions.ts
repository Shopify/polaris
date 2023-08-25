import fs from 'fs';
import path from 'path';

import {getMediaConditions} from '../src';
import {themeDefault} from '../src/themes';

import {extractTokenGroupValues} from './utils';

const scssOutputDir = path.join(__dirname, '../dist/scss');
const scssOutputPath = path.join(scssOutputDir, 'media-queries.scss');

export async function toMediaConditions() {
  await fs.promises.mkdir(scssOutputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const mediaConditionEntries = Object.entries(
    getMediaConditions(extractTokenGroupValues(themeDefault.breakpoints)),
  );

  const styles = mediaConditionEntries
    .map(([token, mediaConditions]) =>
      Object.entries(mediaConditions)
        .map(
          ([direction, mediaCondition]) =>
            `$p-${token}-${direction}: '${mediaCondition}';`,
        )
        .join('\n'),
    )
    .join('\n\n');

  await fs.promises.writeFile(scssOutputPath, styles);
}
