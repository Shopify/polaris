import fs from 'fs';

import chalk from 'chalk';
import globby from 'globby';
import meow from 'meow';

import {migrations} from './migrations';
import {checkGitStatus} from './utilities/checkGitStatus';

type Migration = keyof typeof migrations;

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

export const runMigration = (
  filePath: string,
  migrationFunction: (fileContent: string) => string,
) => {
  const oldContent = fs.readFileSync(filePath, 'utf-8');
  const newContent = migrationFunction(oldContent);
  fs.writeFileSync(filePath, newContent);
};

export async function run() {
  const [migration, pathGlob] = cli.input;

  try {
    if (!(migration in migrations)) {
      throw new Error(`No migration found for ${migration}`);
    }

    if (!pathGlob) throw new Error(`No path provided for migration`);

    if (!cli.flags.dry) {
      checkGitStatus(cli.flags.force);
    }

    const filepaths = globby.sync(pathGlob);
    if (filepaths.length === 0) {
      throw new Error(`No files found for ${pathGlob}`);
    }

    // eslint-disable-next-line no-console
    console.log(chalk.green('Running migration:'), migration);

    await Promise.all(
      filepaths.map((filepath: string) =>
        runMigration(filepath, migrations[migration as Migration]),
      ),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
