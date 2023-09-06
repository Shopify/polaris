import fs from 'fs';
import path from 'path';

import type {Themes} from '../src/themes';

const outputDir = path.join(__dirname, '../dist/json');
const outputThemesDir = path.join(outputDir, 'themes');

export async function toJSON(themes: Themes) {
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

  for (const [tokenGroupName, tokenGroup] of Object.entries(themes.light)) {
    const filePath = path.join(outputDir, `${tokenGroupName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(tokenGroup));
  }

  for (const [themeName, theme] of Object.entries(themes)) {
    const filePath = path.join(outputThemesDir, `${themeName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(theme));
  }
}
