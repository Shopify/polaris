import path from 'path';
import {mkdir, writeFile} from 'fs/promises';

import type {Theme} from '@shopify/polaris-tokens';
import {
  createVarName,
  isTokenName,
  themeDefault,
} from '@shopify/polaris-tokens';
import ora from 'ora';

import {basePath} from '../constants';

/**
 * Static replacement for the old `/api/tokens/v0/…` route.
 *
 * That route read `?format=` and `?scheme=` query params, which a static export
 * can't do. Instead we write one file per token group per format, with real
 * extensions so GitHub Pages serves them with the right content type, plus an
 * index page pointing at them. The canonical source is still the
 * `@shopify/polaris-tokens` npm package — this exists so links to the old API
 * land somewhere useful rather than on a 404.
 */
type TokenGroupName = keyof Theme;

const tokenGroupNames = Object.keys(themeDefault) as TokenGroupName[];

const toCss = (tokens: Record<string, string>) =>
  `:root {\n${Object.keys(tokens)
    .map((tokenName) => {
      if (!isTokenName(tokenName)) {
        throw new Error(`Invalid token name: ${tokenName}`);
      }
      return `  ${createVarName(tokenName)}: ${tokens[tokenName]};`;
    })
    .join('\n')}\n}\n`;

const githubUrl = (tokenGroupName: string) =>
  `https://github.com/Shopify/polaris/blob/main/polaris-tokens/src/themes/base/${tokenGroupName}.ts`;

const indexHtml = (apiRoot: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Token API - Shopify Polaris</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem auto; max-width: 60rem; padding: 0 1rem; }
      td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }
      tr:nth-child(even) { background-color: #f4f4f4; }
    </style>
  </head>
  <body>
    <h1>Polaris Token API</h1>
    <p>
      These docs are archived. The Polaris tokens themselves are still published
      to npm as
      <a href="https://www.npmjs.com/package/@shopify/polaris-tokens">@shopify/polaris-tokens</a>,
      which is the recommended way to consume them.
    </p>
    <p>
      The old <code>/api/tokens/v0/:group?format=</code> endpoint was backed by a
      server that no longer exists. The same data is published here as static
      files instead: append <code>.json</code> or <code>.css</code> to the token
      group name.
    </p>
    <h2>Token groups</h2>
    <table>
      <thead>
        <tr><th>Token group</th><th>JSON</th><th>CSS</th><th>Source</th></tr>
      </thead>
      <tbody>
${['all', ...tokenGroupNames]
  .map(
    (name) => `        <tr>
          <td>${name}</td>
          <td><a href="${apiRoot}/${name}.json">${name}.json</a></td>
          <td><a href="${apiRoot}/${name}.css">${name}.css</a></td>
          <td>${
            name === 'all'
              ? '&mdash;'
              : `<a href="${githubUrl(name)}">${name}.ts</a>`
          }</td>
        </tr>`,
  )
  .join('\n')}
      </tbody>
    </table>
  </body>
</html>
`;

const genTokenApi = async () => {
  const spinner = ora('Generating public/api/tokens/v0').start();

  const outputDir = path.join(process.cwd(), 'public', 'api', 'tokens', 'v0');
  await mkdir(outputDir, {recursive: true});

  const allTokens: Record<string, string> = {};

  await Promise.all(
    tokenGroupNames.map(async (tokenGroupName) => {
      const tokens = themeDefault[tokenGroupName] as Record<string, string>;
      Object.assign(allTokens, tokens);

      await writeFile(
        path.join(outputDir, `${tokenGroupName}.json`),
        `${JSON.stringify(tokens, null, 2)}\n`,
        'utf-8',
      );
      await writeFile(
        path.join(outputDir, `${tokenGroupName}.css`),
        toCss(tokens),
        'utf-8',
      );
    }),
  );

  await writeFile(
    path.join(outputDir, 'all.json'),
    `${JSON.stringify(allTokens, null, 2)}\n`,
    'utf-8',
  );
  await writeFile(path.join(outputDir, 'all.css'), toCss(allTokens), 'utf-8');
  await writeFile(
    path.join(outputDir, 'index.html'),
    indexHtml(`${basePath}/api/tokens/v0`),
    'utf-8',
  );

  spinner.succeed(
    `Generated public/api/tokens/v0 (${tokenGroupNames.length + 1} groups)`,
  );
};

export default genTokenApi;
