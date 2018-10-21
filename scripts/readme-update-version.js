const {execSync} = require('child_process');
const {writeFileSync, readFileSync} = require('fs-extra');
const {resolve} = require('path');
const {version: newVersion} = require('../package.json');
const {semverRegExp, readmes} = require('./utilities');

const root = resolve(__dirname, '..');

// eslint-disable-next-line no-console
console.log(`🆕 Updating version in ${readmes.join(', ')}...`);
readmes.map((readme) => resolve(root, readme)).forEach((file) => {
  writeFileSync(
    file,
    readFileSync(file, 'utf8').replace(semverRegExp, newVersion),
  );
});

// eslint-disable-next-line no-console
console.log(`🏃‍♂️ Running \`git add -A ${readmes.join(' ')}\`...`);
const execOpts = {stdio: 'inherit'};
execSync(`git add -A ${readmes.join(' ')}`, execOpts);
