import fs from 'fs';
import path from 'path';

import {Tokens, TokenProperties} from '../src';

const outputDir = path.join(__dirname, '../dist/json');

function getFileName(fileName: string) {
  return path.join(outputDir, fileName);
}

export async function toJSON(tokens: Tokens) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, {recursive: true});
  }

  for (const entry of Object.entries(tokens)) {
    const [tokenGroup, tokenProps] = entry as [string, TokenProperties];

    if (tokenGroup === 'colorSchemes') {
      for (const colorEntry of Object.entries(tokenProps)) {
        const [colorTokenGroup, colorTokenProps] = colorEntry as [
          string,
          TokenProperties,
        ];

        const fileName = getFileName(`colors.${colorTokenGroup}.json`);

        await fs.promises.writeFile(fileName, JSON.stringify(colorTokenProps));
      }
    } else {
      const fileName = getFileName(`${tokenGroup}.json`);

      await fs.promises.writeFile(fileName, JSON.stringify(tokenProps));
    }
  }
}
