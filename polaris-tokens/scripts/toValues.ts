import fs from 'fs';
import path from 'path';

import {camelCase, camelCaseTransformMerge} from 'change-case';

import type {Entry, Entries} from '../src/types';
import type {ThemeShape} from '../src/themes/types';
import {createThemeVariant, themePartials, themeDefault} from '../src/themes';

import type {ExtractThemeValues} from './utils';
import {extractThemeValues, extractTokenGroupValues} from './utils';

const outputDir = path.join(__dirname, '../build');

export async function toValues() {
  await fs.promises.mkdir(outputDir).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const themeDefaultEntries: Entries<ExtractThemeValues<ThemeShape>> =
    Object.entries(themeDefault).map(
      ([tokenGroupName, tokenGroup]): Entry<ExtractThemeValues<ThemeShape>> => [
        tokenGroupName,
        extractTokenGroupValues(tokenGroup),
      ],
    );

  await fs.promises.writeFile(
    path.join(outputDir, 'index.ts'),

    [
      `export * from '../src/index';`,
      themeDefaultEntries.map(createExport),
      createExport(['tokens', Object.fromEntries(themeDefaultEntries)]),
      createExport([
        'themePartials',
        Object.fromEntries(
          Object.entries(themePartials).map(([themeName, themePartial]) => [
            themeName,
            extractThemeValues(themePartial),
          ]),
        ),
      ]),
      createExport([
        'themes',
        Object.fromEntries(
          Object.entries(themePartials).map(([themeName, themePartial]) => [
            themeName,
            extractThemeValues(createThemeVariant(themePartial)),
          ]),
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
