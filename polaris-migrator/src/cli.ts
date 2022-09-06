import fs from 'node:fs';
import path from 'node:path';

// @ts-expect-error TS can't resolve the type of this import
import * as jscodeshift from 'jscodeshift/src/Runner';
import chalk from 'chalk';
import isGitClean from 'is-git-clean';
import globby from 'globby';
import meow from 'meow';

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

type Args = [
  migration: string,
  path: string,
  flags?: {force?: boolean; dry?: boolean; print?: boolean},
];

export async function run(...args: Args) {
  const [migration, files] = args.length ? args : cli.input;
  const flags = args && args[2] ? args[2] : cli.flags;

  const migrationFile = path.join(
    __dirname,
    `./migrations/${migration}/${migration}.js`,
  );

  try {
    if (!fs.existsSync(migrationFile)) {
      throw new Error(`No migration found for ${migration}`);
    }

    if (!files) throw new Error(`No path provided for migration`);

    if (!flags.dry) {
      checkGitStatus(cli.flags.force);
    }

    const filepaths = globby.sync(files, {cwd: process.cwd()});
    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    }

    // eslint-disable-next-line no-console
    console.log(chalk.green('Running migration:'), migration);

    await jscodeshift.run(migrationFile, filepaths, {
      dry: flags.dry,
      print: flags.print,
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
