import fs from 'fs';
import path from 'path';

import type {Themes, ThemeShape} from '../src/themes/types';

const outputDir = path.join(__dirname, '../dist/json');
const outputThemesDir = path.join(outputDir, 'themes');

export async function toJSON(themeDefault: ThemeShape, themes: Themes) {
  await fs.promises.mkdir(outputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  await fs.promises.mkdir(outputThemesDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  for (const [tokenGroupName, tokenGroup] of Object.entries(themeDefault)) {
    const filePath = path.join(outputDir, `${tokenGroupName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(tokenGroup));
  }

  await Promise.all(
    Object.entries(themes).map(([themeName, theme]) =>
      fs.promises.writeFile(
        path.join(outputThemesDir, `${themeName}.json`),
        JSON.stringify(theme),
      ),
    ),
  );
}
