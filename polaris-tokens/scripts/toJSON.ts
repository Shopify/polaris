import fs from 'fs';
import path from 'path';

import {MetaTokens, TokenGroup} from '../src';

const outputDir = path.join(__dirname, '../dist/json');

export async function toJSON(metaTokens: MetaTokens) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, {recursive: true});
  }

  for (const entry of Object.entries(metaTokens)) {
    const [tokenGroupName, tokenGroup] = entry as [
      keyof MetaTokens,
      TokenGroup,
    ];
    const filePath = path.join(outputDir, `${tokenGroupName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(tokenGroup));
  }
}
