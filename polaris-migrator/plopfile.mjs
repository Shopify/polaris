import * as url from 'node:url';
import * as path from 'node:path';

import {plopDir} from 'plop-dir';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @param {import('plop').NodePlopAPI} plop */
// eslint-disable-next-line import/no-default-export
export default async function run(plop) {
  plop.setGenerator(
    'scss-migration',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/scss-migration'),
      outputDir: path.join(__dirname, './src/migrations'),
      prompts: [
        {name: 'migrationName', message: "What's the name of your migration?"},
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
        {name: 'migrationName', message: "What's the name of your migration?"},
      ],
    }),
  );
}
