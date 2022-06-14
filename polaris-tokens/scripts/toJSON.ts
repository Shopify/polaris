import fs from 'fs';
import path from 'path';

import {MetaTokens, TokenGroup} from '../src';

const outputDir = path.join(__dirname, '../dist/json');

function getFileName(fileName: string) {
  return path.join(outputDir, fileName);
}

export async function toJSON(tokens: MetaTokens) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, {recursive: true});
  }

  for (const entry of Object.entries(tokens)) {
    const [tokenGroupName, tokenGroup] = entry as [
      keyof MetaTokens,
      TokenGroup,
    ];
    const fileName = getFileName(`${tokenGroupName}.json`);

    await fs.promises.writeFile(fileName, JSON.stringify(tokenGroup));
  }
}
