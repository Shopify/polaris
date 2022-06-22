import fs from 'fs';
import path from 'path';

import type {MetaTokens, Tokens} from '../src';

const outputDir = path.join(__dirname, '../build-internal');
const outputFile = path.join(outputDir, 'tokens.ts');

type Entry<T> = [keyof T, T[keyof T]];
type Entries<T> = Entry<T>[];

export async function toTokenValues(metaTokens: MetaTokens) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir);
  }

  const tokensEntries: Entries<Tokens> = Object.entries(metaTokens).map(
    (entry) => {
      const [tokenGroupName, tokenGroup] = entry as Entry<MetaTokens>;

      const tokenGroupValues = Object.fromEntries(
        Object.entries(tokenGroup).map(([tokenName, {value}]) => [
          tokenName,
          value,
        ]),
      );

      return [tokenGroupName, tokenGroupValues];
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

function createExport(entry: [string, {[key: string]: unknown}]) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
