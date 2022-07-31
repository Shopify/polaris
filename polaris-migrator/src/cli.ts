/**
 * Example:
 * yarn start -f templateBabel ./example.js
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

import chalk from 'chalk';
import globby from 'globby';
import meow from 'meow';

import {checkGitStatus} from './utilities/checkGitStatus';

const cli = meow({
  description: 'Code migrations for updating Polaris apps.',
  help: `
    Usage
      $ npx @shopify/polaris-migrator <migration> <path> <...options>
        migration    One of the choices from https://polaris.shopify.com/docs/advanced-features/migrations
        path         Files or directory to transform. Can be a glob like src/**.scss
    Options
      --force            Bypass Git safety checks and forcibly run migrations
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
    `,
  flags: {
    force: {
      alias: 'f',
      type: 'boolean',
    },
    dry: {
      type: 'boolean',
    },
    print: {
      type: 'boolean',
    },
  },
});

export async function run() {
  const [migration, pathGlob] = cli.input;

  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force);
  }

  if (!migration) {
    throw new Error(
      `Missing migration argument. Ex. @shopify/polaris-migrator <migration>`,
    );
  }

  if (!pathGlob) {
    throw new Error(
      `Missing path argument. Ex. @shopify/polaris-migrator <migration> <path>`,
    );
  }

  const migrationNames = await fs.promises.readdir(
    path.join(__dirname, './migrations'),
  );

  if (!migrationNames.includes(migration)) {
    throw new Error(`No migration found for ${migration}`);
  }

  const filePaths = await globby(pathGlob, {
    absolute: true,
  });

  if (filePaths.length === 0) {
    throw new Error(`No files found for ${pathGlob}`);
  }

  const {migration: migrationFunction} = await import(
    `./migrations/${migration}/index.js`
  );

  process.stdout.write(`${chalk.green('Running migration:')} ${migration}\n`);

  // TODO: Use pMap and limit concurrency
  await Promise.all(filePaths.map(migrationFunction));
}
