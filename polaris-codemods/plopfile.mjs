import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

import {plopDir} from 'plop-dir';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @param {import('plop').NodePlopAPI} plop */
// eslint-disable-next-line import/no-default-export
export default async function run(plop) {
  plop.setGenerator(
    'scss-codemod',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/scss-codemod'),
      outputDir: path.join(__dirname, './src/codemods'),
      prompts: [
        {
          name: 'transformName',
          message: 'Name of the codemod',
          suffix: ' (e.g. v9-scss-replace-function)',
          validate: (input) => validateTransformName(plop, input),
        },
      ],
    }),
  );

  plop.setGenerator(
    'typescript-codemod',
    await plopDir({
      plop,
      templateDir: path.join(__dirname, './templates/typescript-codemod'),
      outputDir: path.join(__dirname, './src/codemods'),
      prompts: [
        {
          name: 'transformName',
          message: 'Name of the codemod',
          suffix: ' (e.g. v9-component-replace-prop)',
          validate: (input) => validateTransformName(plop, input),
        },
      ],
    }),
  );
}

function validateTransformName(plop, input) {
  const transformName = plop.renderString('{{kebabCase input}}', {
    input,
  });

  return (
    !fs.existsSync(path.join(__dirname, `./src/codemods/${transformName}`)) ||
    'That codemod name already exists'
  );
}
