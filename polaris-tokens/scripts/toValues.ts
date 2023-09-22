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
      "import {resolveThemeRefs} from '../src/themes/utils';",
      `export * from '../src/index';`,
      Object.entries(themeDefault).map(createExport),
      createExport(['tokens', themeDefault]),
      createExportThemes(),
    ]
      .flat()
      .join('\n'),
  );
}

function createExport(entry: [string | number, any]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}

function createExportThemes() {
  const themes = Object.entries(metaThemes)
    .map(([themeName, metaTheme]) => {
      const theme = extractMetaThemeValues(metaTheme);
      const themeJSON = JSON.stringify(theme, null, 2);

      return `'${themeName}': resolveThemeRefs(${themeJSON})`;
    })
    .join(',\n');

  return `export const themes = {\n${themes}\n} as const;`;
}
