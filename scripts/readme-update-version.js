import {execSync} from 'child_process';
import {writeFileSync, readFileSync} from 'fs-extra';
import {resolve} from 'path';

const {version: currentVersion} = require('../package.json');

const root = resolve(__dirname, '..');
const newVersion = process.argv[2];
const regExCurrentVersion = new RegExp(currentVersion, 'g');
const readmes = Object.freeze(['README.md', 'src/components/README.md']);

console.log({currentVersion, newVersion});

console.log(`🆕 Updating version in ${readmes.join(', ')}...`);
readmes.map((readme) => resolve(root, readme)).forEach((file) => {
  writeFileSync(
    file,
    readFileSync(file, 'utf8').replace(regExCurrentVersion, newVersion),
  );
});

console.log(`🏃‍♂️ Running \`git add -A ${readmes.join(' ')}\`...`);
const execOpts = {stdio: 'inherit'};
execSync(`git add -A ${readmes.join(' ')}`, execOpts);
