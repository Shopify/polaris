import fs from 'fs';
import path from 'path';

import {Metadata, MetadataGroup} from '../src';

const outputDir = path.join(__dirname, '../dist/json');

export async function toJSON(metadata: Metadata) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, {recursive: true});
  }

  for (const entry of Object.entries(metadata)) {
    const [tokenGroupName, tokenGroup] = entry as [
      keyof Metadata,
      MetadataGroup,
    ];
    const filePath = path.join(outputDir, `${tokenGroupName}.json`);

    await fs.promises.writeFile(filePath, JSON.stringify(tokenGroup));
  }
}
