/* eslint-disable no-console */

import {resolve} from 'path';
import {execSync} from 'child_process';
import {writeFileSync, readFileSync} from 'fs';

import {version: newVersion} from '../package.json';
import {semverRegExp} from '../scripts/utilities';

const root = resolve(__dirname, '..');

const readmes = Object.freeze(['README.md']);

console.log(`🆕 Updating version in ${readmes.join(', ')}...`);
readmes
  .map((readme) => resolve(root, readme))
  .forEach((file) => {
    writeFileSync(
      file,
      readFileSync(file, 'utf8').replace(semverRegExp, newVersion),
    );
  });

console.log(`🏃‍♂️ Running \`git add -A ${readmes.join(' ')}\`...`);
const execOpts = {stdio: 'inherit'};
execSync(`git add -A ${readmes.join(' ')}`, execOpts);

export default readmes;
