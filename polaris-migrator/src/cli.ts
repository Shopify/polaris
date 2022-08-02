import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import chalk from 'chalk';
import globby from 'globby';
import meow from 'meow';
import pMap from 'p-map';

import type {MigrationFn} from './types';
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

  const {migration: migrationFn}: {migration: MigrationFn} = await import(
    `./migrations/${migration}/index.js`
  );

  process.stdout.write(`${chalk.green('Running migration:')} ${migration}\n`);

  await pMap(
    filePaths,
    async (filePath) => {
      const fileName = path.basename(filePath);
      const extName = path.extname(fileName);

      if (!migrationFn.extensions.includes(extName)) {
        return;
      }

      const content = await fs.promises.readFile(filePath, 'utf-8');
      const newContent = migrationFn(content);

      if (typeof newContent !== 'string') {
        throw new Error(`Unable to run migration on ${filePath}`);
      }

      if (cli.flags.print) {
        process.stdout.write(`${chalk.blue('File:')} ${fileName}\n`);
        process.stdout.write(`${newContent}\n`);
      }

      if (!cli.flags.dry) {
        process.stdout.write(
          `Writing content: ${fileName}\n${chalk.green('Done.')}\n`,
        );
        // await fs.promises.writeFile(filePath, newContent);
      }
    },
    {concurrency: os.cpus.length || Infinity},
  );
}
