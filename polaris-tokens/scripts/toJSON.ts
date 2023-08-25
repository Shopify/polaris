import fs from 'fs';
import path from 'path';

import {themeDefault} from '../src/themes';

const outputDir = path.join(__dirname, '../dist/json');

export async function toJSON() {
  await fs.promises.mkdir(outputDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  });

  for (const [tokenGroupName, tokenGroup] of Object.entries(themeDefault)) {
    const filePath = path.join(outputDir, `${tokenGroupName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(tokenGroup));
  }
}
