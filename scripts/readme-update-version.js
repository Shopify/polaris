import {execSync} from 'child_process';
import {writeFileSync, readFileSync} from 'fs-extra';
import {resolve} from 'path';

const {version: newVersion} = require('../package.json');

const root = resolve(__dirname, '..');
const regExSemVer = new RegExp(
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/,
  'g',
);
const readmes = Object.freeze(['README.md', 'src/components/README.md']);

// eslint-disable-next-line no-console
console.log(`🆕 Updating version in ${readmes.join(', ')}...`);
readmes.map((readme) => resolve(root, readme)).forEach((file) => {
  writeFileSync(
    file,
    readFileSync(file, 'utf8').replace(regExSemVer, newVersion),
  );
});

// eslint-disable-next-line no-console
console.log(`🏃‍♂️ Running \`git add -A ${readmes.join(' ')}\`...`);
const execOpts = {stdio: 'inherit'};
execSync(`git add -A ${readmes.join(' ')}`, execOpts);
