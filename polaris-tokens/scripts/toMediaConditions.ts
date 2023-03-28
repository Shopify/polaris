import fs from 'fs';
import path from 'path';

import {getMediaConditions, removeMetadata} from '../src';
import type {MetaBreakpointsTokenGroup} from '../src';

const scssOutputDir = path.join(__dirname, '../dist/scss');
const scssOutputPath = path.join(scssOutputDir, 'media-queries.scss');

export async function toMediaConditions(
  breakpoints: MetaBreakpointsTokenGroup,
) {
  if (!fs.existsSync(scssOutputDir)) {
    await fs.promises.mkdir(scssOutputDir, {recursive: true});
  }

  const mediaConditionEntries = Object.entries(
    getMediaConditions(removeMetadata(breakpoints)),
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
