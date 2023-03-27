import fs from 'fs';
import path from 'path';

import {removeMetadata} from '../src';
import type {Metadata} from '../src';
import type {Entry, Entries, Tokens} from '../src/types';

const outputDir = path.join(__dirname, '../build');
const outputFile = path.join(outputDir, 'index.ts');

export async function toTokenValues(metadata: Metadata) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir);
  }

  const tokensEntries: Entries<Tokens> = Object.entries(metadata).map(
    (entry): Entry<Tokens> => {
      const [tokenGroupName, tokenGroup] = entry as Entry<Metadata>;

      return [tokenGroupName, removeMetadata(tokenGroup)];
    },
  );

  await fs.promises.writeFile(
    outputFile,
    [
      `export * from '../src/index'`,
      tokensEntries.map(createExport),
      createExport(['tokens', Object.fromEntries(tokensEntries)]),
    ]
      .flat()
      .join('\n'),
  );
}

function createExport(
  entry: [string, {[key: string]: unknown}] | Entry<Tokens>,
) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
