import fs from 'fs';
import path from 'path';

import type {MetaTokens, MetaTokenGroup, Tokens, TokenGroup} from '../src';

const outputDir = path.join(__dirname, '../build-internal');
const outputFile = path.join(outputDir, 'tokens.ts');

export async function toTokenValues(metaTokens: MetaTokens) {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir);
  }

  const filteredTokenGroupEntries: [keyof Tokens, TokenGroup][] = [];

  for (const entry of Object.entries(metaTokens)) {
    const [tokenGroupName, tokenGroup] = entry as [
      keyof MetaTokens,
      MetaTokenGroup,
    ];

    const tokenGroupValues = Object.fromEntries(
      Object.entries(tokenGroup).map(([tokenName, {value}]) => [
        tokenName,
        value,
      ]),
    );

    filteredTokenGroupEntries.push([tokenGroupName, tokenGroupValues]);
  }

  await fs.promises.writeFile(
    outputFile,
    [
      `export * from '../src/index'`,
      filteredTokenGroupEntries.map(createExport),
      createExport(['tokens', Object.fromEntries(filteredTokenGroupEntries)]),
    ]
      .flat()
      .join('\n'),
  );
}

function createExport<T extends [string, {[key: string]: any}]>(entry: T) {
  return `export const ${entry[0]} = ${JSON.stringify(entry[1])} as const;`;
}
