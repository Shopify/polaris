import fs from 'fs';
import path from 'path';

import {camelCase, camelCaseTransformMerge} from 'change-case';

import type {Entry, Entries} from '../src/types';
import type {Themes, ThemeShape} from '../src/themes/types';

import type {ExtractThemeValues} from './utils';
import {extractThemeValues, extractTokenGroupValues} from './utils';

const outputDir = path.join(__dirname, '../build');

export async function toValues(themeDefault: ThemeShape, themes: Themes) {
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
    ]
      .flat()
      .join('\n'),
  );

  await fs.promises.writeFile(
    path.join(outputDir, 'themes.ts'),
    Object.entries(themes)
      .map(([themeName, theme]): string =>
        createExport([
          // https://github.com/blakeembrey/change-case/blob/040a079f007879cb0472ba4f7cc2e1d3185e90ba/packages/camel-case/README.md?plain=1#L28
          camelCase(themeName, {transform: camelCaseTransformMerge}),
          extractThemeValues(theme),
        ]),
      )
      .join('\n'),
  );
}

function createExport(entry: [string | number, any]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
