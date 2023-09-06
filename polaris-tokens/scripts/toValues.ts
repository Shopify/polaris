import fs from 'fs';
import path from 'path';

import {camelCase, camelCaseTransformMerge} from 'change-case';

import type {Entry, Entries} from '../src/types';
import type {Themes} from '../src/themes';
import type {ThemeShape, TokenGroupShape} from '../src/themes/types';

const outputDir = path.join(__dirname, '../build');

export async function toValues(themes: Themes) {
  await fs.promises.mkdir(outputDir).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const themeLightEntries: Entries<ExtractValues<ThemeShape>> = Object.entries(
    themes.light,
  ).map(
    ([tokenGroupName, tokenGroup]): Entry<ExtractValues<ThemeShape>> => [
      tokenGroupName,
      extractValue(tokenGroup),
    ],
  );

  await fs.promises.writeFile(
    path.join(outputDir, 'index.ts'),
    [
      `export * from '../src/index';`,
      themeLightEntries.map(createExport),
      createExport(['tokens', Object.fromEntries(themeLightEntries)]),
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
          extractValues(theme),
        ]),
      )
      .join('\n'),
  );
}

function createExport(entry: [string | number, any]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}

export type ExtractValue<T extends TokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

export function extractValue<T extends TokenGroupShape>(tokenGroup: T) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(
      ([tokenName, {value}]): Entry<ExtractValue<TokenGroupShape>> => [
        tokenName,
        value,
      ],
    ),
  ) as ExtractValue<T>;
}

export type ExtractValues<T extends ThemeShape> = {
  [K in keyof T]: ExtractValue<T[K]>;
};

export function extractValues<T extends ThemeShape>(theme: T) {
  return Object.fromEntries(
    Object.entries(theme).map(
      ([tokenGroupName, tokenGroup]): Entry<ExtractValues<ThemeShape>> => [
        tokenGroupName,
        extractValue(tokenGroup),
      ],
    ),
  ) as ExtractValues<T>;
}
