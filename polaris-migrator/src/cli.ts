import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import isGitClean from 'is-git-clean';
import globby from 'globby';
import meow from 'meow';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as jscodeshift from 'jscodeshift/src/Runner';

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

export function checkGitStatus(force?: boolean) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    /* eslint-disable no-console */
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using @shopify/polaris-migrator!');
      console.log(
        chalk.yellow(
          '\nBut before we continue, please stash or commit your git changes.',
        ),
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.',
      );
      process.exit(1);
    }
    /* eslint-enable no-console */
  }
}

export async function run() {
  const [migrationName, files] = cli.input;
  const migrationFile = path.join(
    __dirname,
    './migrations',
    migrationName,
    'migration.ts',
  );
  const migration = require.resolve(migrationFile);

  try {
    if (!fs.existsSync(migration)) {
      throw new Error(`No migration found for ${migrationName}`);
    }

    if (!files) throw new Error(`No path provided for migration`);

    if (!cli.flags.dry) {
      checkGitStatus(cli.flags.force);
    }

    // eslint-disable-next-line no-console
    console.log(`cwd: ${process.cwd()}`);

    const filepaths = globby.sync(files, {cwd: process.cwd()});
    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    }

    // eslint-disable-next-line no-console
    console.log(chalk.green('Running migration:'), migrationName);

    await jscodeshift.run(migration, filepaths, {
      dry: cli.flags.dry,
      print: cli.flags.print,
      babel: true,
      ignorePattern: ['**/node_modules/**', '**/.next/**', '**/build/**'],
      extensions: 'tsx,ts,jsx,js',
      parser: 'tsx',
      verbose: 2,
      runInBand: true,
      silent: false,
      stdin: false,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
