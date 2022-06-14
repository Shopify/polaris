import fs from 'fs';
import path from 'path';

import glob from 'glob';

import {rem, Tokens} from '../src';

const sourceDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../build-internal');

const valueRegex = /'([^:]*)',/gm;
const metadataTransforms: [string | RegExp, string][] = [
  [/\s+description:\s+'.*'/gm, ''],
  [/{\s+value:\s+(['"].*['"])[\s,]+}/gm, '$1'],
];
const valueTransforms: {
  [Key in keyof Tokens]: ((value: string) => string)[];
} = {
  breakpoints: [rem],
  colors: [],
  depth: [],
  legacy: [rem],
  motion: [rem],
  shape: [rem],
  spacing: [rem],
  typography: [rem],
  zIndex: [],
};

async function copySrcFiles() {
  await fs.promises.cp(sourceDir, outputDir, {recursive: true});
  await fs.promises.cp(
    `${outputDir}/token-groups`,
    `${outputDir}/token-values`,
    {recursive: true},
  );
}

async function createMetadataFile() {
  await fs.promises.copyFile(
    `${outputDir}/tokens.ts`,
    `${outputDir}/metadata.ts`,
  );
  const metadataTs = await fs.promises.readFile(
    `${outputDir}/metadata.ts`,
    'utf-8',
  );
  await fs.promises.writeFile(
    `${outputDir}/metadata.ts`,
    metadataTs.replace('export const tokens', 'export const metadata'),
  );
}
async function updateTokensFile() {
  const tokensTs = await fs.promises.readFile(
    `${outputDir}/tokens.ts`,
    'utf-8',
  );
  await fs.promises.writeFile(
    `${outputDir}/tokens.ts`,
    tokensTs
      .replaceAll('./token-groups', './token-values')
      .replaceAll('MetaTokens', 'Tokens'),
  );
}

async function updateTokenValues() {
  const tokenValuesFiles = glob.sync(`${outputDir}/token-values/**/*.ts`, {
    cwd: __dirname,
    absolute: true,
  });

  for (const tokenFile of tokenValuesFiles) {
    const code = fs.readFileSync(tokenFile, 'utf8');
    const tokenGroupName = path.basename(tokenFile, '.ts') as keyof Tokens;

    const keyValuePairs = metadataTransforms.reduce(
      (str, [regex, subst]) => str.replace(regex, subst),
      code,
    );

    const result = valueTransforms[tokenGroupName].reduce(
      (str, fn) => str.replaceAll(valueRegex, (_, p1) => `'${fn(p1)}',`),
      keyValuePairs,
    );

    await fs.promises.writeFile(tokenFile, result);
  }
}

export async function toTokenValues() {
  await copySrcFiles();
  await createMetadataFile();
  await updateTokensFile();
  await updateTokenValues();
}
