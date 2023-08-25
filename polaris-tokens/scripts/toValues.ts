import fs from 'fs';
import path from 'path';

import type {Entry, Entries} from '../src/types';
import type {MetaThemeShape} from '../src/themes/types';
import {
  createMetaThemeVariant,
  metaThemeVariantPartials,
  metaThemeDefault,
} from '../src/themes';

import type {ExtractMetaThemeValues} from './utils';
import {extractMetaThemeValues, extractMetaTokenGroupValues} from './utils';

const outputDir = path.join(__dirname, '../build');

export async function toValues() {
  await fs.promises.mkdir(outputDir).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const metaThemeDefaultEntries: Entries<
    ExtractMetaThemeValues<MetaThemeShape>
  > = Object.entries(metaThemeDefault).map(
    ([tokenGroupName, metaTokenGroup]): Entry<
      ExtractMetaThemeValues<MetaThemeShape>
    > => [tokenGroupName, extractMetaTokenGroupValues(metaTokenGroup)],
  );

  await fs.promises.writeFile(
    path.join(outputDir, 'index.ts'),

    [
      `export * from '../src/index';`,
      metaThemeDefaultEntries.map(createExport),
      createExport(['tokens', Object.fromEntries(metaThemeDefaultEntries)]),
      createExport([
        'themePartials',
        Object.fromEntries(
          Object.entries(metaThemeVariantPartials).map(
            ([themeName, metaThemeVariantPartial]) => [
              themeName,
              extractMetaThemeValues(metaThemeVariantPartial),
            ],
          ),
        ),
      ]),
      createExport([
        'themes',
        Object.fromEntries(
          Object.entries(metaThemeVariantPartials).map(
            ([themeName, metaThemeVariantPartial]) => [
              themeName,
              extractMetaThemeValues(
                createMetaThemeVariant(metaThemeVariantPartial),
              ),
            ],
          ),
        ),
      ]),
    ]
      .flat()
      .join('\n'),
  );
}

function createExport(entry: [string | number, any]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
