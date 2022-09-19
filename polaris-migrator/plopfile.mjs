import * as url from 'node:url';
import * as path from 'node:path';

import {plopDir} from 'plop-dir';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @param {import('plop').NodePlopAPI} plop */
// eslint-disable-next-line import/no-default-export
export default async function run(plop) {
  plop.setGenerator(
    'sass-migration',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/sass-migration'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. replace-sass-layout)',
        },
        {
          name: 'testFixtureName',
          message: 'Name of the initial input/output test fixtures',
          suffix: ' (e.g. replace-layout-mixins)',
        },
      ],
    }),
  );

  plop.setGenerator(
    'typescript-migration',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/typescript-migration'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {
          name: 'migrationName',
          message: 'Name of the migration',
          suffix: ' (e.g. replace-component-layout)',
        },
        {
          name: 'testFixtureName',
          message: 'Name of the initial input/output test fixtures',
          suffix: ' (e.g. replace-layout-props)',
        },
      ],
    }),
  );
}
