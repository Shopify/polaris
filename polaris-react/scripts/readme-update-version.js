/* eslint-disable no-console */

const {resolve} = require('path');
const {execSync} = require('child_process');
const {writeFileSync, readFileSync} = require('fs');

const getReleasePlan = require('@changesets/get-release-plan').default;

const {name: pkgName} = require('../package.json');
const {semverRegExp} = require('../scripts/utilities');

const root = resolve(__dirname, '..');

const readmes = Object.freeze(['README.md']);

const run = async () => {
  const {releases} = await getReleasePlan(resolve(process.cwd(), '../'));
  const {newVersion} = releases.find((release) => release.name === pkgName);

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
};

try {
  run();
} catch (err) {
  console.error(err);
  process.exit(1);
}

module.exports = readmes;
