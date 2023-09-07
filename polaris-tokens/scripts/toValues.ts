import fs from 'fs';
import path from 'path';

import {metaThemes, metaThemeDefault} from '../src/themes';
import {extractMetaThemeValues} from '../src/themes/utils';

const outputDir = path.join(__dirname, '../build');

export async function toValues() {
  await fs.promises.mkdir(outputDir).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  const themeDefault = extractMetaThemeValues(metaThemeDefault);

  await fs.promises.writeFile(
    path.join(outputDir, 'index.ts'),
    [
      `export * from '../src/index';`,
      Object.entries(themeDefault).map(createExport),
      createExport(['tokens', themeDefault]),
      createExport([
        'themes',
        Object.fromEntries(
          Object.entries(metaThemes).map(([themeName, metaTheme]) => [
            themeName,
            extractMetaThemeValues(metaTheme),
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
