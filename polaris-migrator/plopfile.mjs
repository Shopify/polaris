import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

import {plopDir} from 'plop-dir';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @param {import('plop').NodePlopAPI} plop */
// eslint-disable-next-line import/no-default-export
export default async function run(plop) {
  plop.setGenerator(
    'scss',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/scss'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. v9-scss-replace-function)',
          validate: (input) => validateMigrationName(plop, input),
        },
      ],
    }),
  );

  plop.setGenerator(
    'typescript',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/typescript'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. v9-component-replace-prop)',
          validate: (input) => validateMigrationName(plop, input),
        },
      ],
    }),
  );
}

function validateMigrationName(plop, input) {
  const migrationName = plop.renderString('{{kebabCase input}}', {
    input,
  });

  return (
    !fs.existsSync(path.join(__dirname, `./src/migrations/${migrationName}`)) ||
    'That migration name already exists'
  );
}
