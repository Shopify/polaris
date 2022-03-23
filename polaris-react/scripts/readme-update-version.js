/* eslint-disable no-console */

const {resolve} = require('path');
const {execSync} = require('child_process');

const {writeFileSync, readFileSync} = require('fs-extra');

const {version: newVersion} = require('../package.json');

const {semverRegExp, readmes} = require('./utilities');

const root = resolve(__dirname, '..');

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
