import fs from 'fs';
import path from 'path';

import {metaThemes} from '../src/themes';
import {
  extractMetaThemeValues,
  resolveMetaThemeRefs,
} from '../src/themes/utils';

const outputDir = path.join(__dirname, '../build');

export async function toValues() {
  await fs.promises.mkdir(outputDir).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  await fs.promises.writeFile(
    path.join(outputDir, 'index.ts'),
    [
      `import {themeNameDefault} from '../src/index';`,
      `import {createIsTokenName} from '../src/themes/utils';`,
      `export * from '../src/index';`,
      createExport([
        'themes',
        Object.fromEntries(
          Object.entries(metaThemes).map(([themeName, metaTheme]) => [
            themeName,
            extractMetaThemeValues(resolveMetaThemeRefs(metaTheme)),
          ]),
        ),
      ]),
      `export const themeDefault = themes[themeNameDefault];`,
      `export const isTokenName = createIsTokenName(themes[themeNameDefault]);`,
    ]
      .flat()
      .join('\n'),
  );
}

function createExport(entry: [string | number, any]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
