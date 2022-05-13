import fs from 'fs';

import meow from 'meow';
import glob from 'glob';

import {v9SassSpacing, v9SassShadow} from './migrations.mjs';

const cli = meow(
  `
	Usage
	  $ polaris-migrator <migration> <path>

	Examples
	  $ polaris-migrator v9-sass-spacing src/components/**/*.scss
`,
  {importMeta: import.meta},
);

const migrations = {
  'v9-sass-spacing': v9SassSpacing,
  'v9-sass-shadow': v9SassShadow,
};

const runMigration = (filePath, migrationFunction) => {
  const oldContent = fs.readFileSync(filePath, 'utf-8');
  const newContent = migrationFunction(oldContent);
  fs.writeFileSync(filePath, newContent);
};

const polarisMigrator = async (migration, pathGlob) => {
  if (!migrations[migration])
    throw new Error(`No migration found for ${migration}`);

  if (!pathGlob) throw new Error(`No path provided for migration`);

  const filepaths = glob.sync(pathGlob);
  if (filepaths.length === 0) {
    throw new Error(`No files found for ${pathGlob}`);
  }

  await Promise.all(
    filepaths.map((filepath) => runMigration(filepath, migrations[migration])),
  );
};

try {
  await polarisMigrator(cli.input[0], cli.input[1]);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}
