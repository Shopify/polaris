import fs from 'fs';
import path from 'path';

import {
  createMetaThemeVariant,
  metaThemeVariantPartials,
  metaThemeDefault,
} from '../src/themes';
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
      `import {getCreateThemeVariant} from '../src/themes/utils';`,
      `export * from '../src/index';`,
      Object.entries(themeDefault).map(createExportConst),
      createExportConst(['tokens', themeDefault]),
      createExportConst([
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
      createExportConst([
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
      createExport(
        `const createThemeVariant = getCreateThemeVariant(${JSON.stringify(
          themeDefault,
        )});`,
      ),
    ]
      .flat()
      .join('\n'),
  );
}

function createExportConst(entry: [string | number, any]) {
  return createExport(
    `const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`,
  );
}

function createExport(value: string) {
  return `export ${value}`;
}
