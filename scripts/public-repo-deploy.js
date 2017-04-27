/* eslint-disable no-console */
import {execSync} from 'child_process';
import {join, resolve} from 'path';
import {cp, mkdir, cd, rm} from 'shelljs';
import {outputJsonSync, readFileSync, writeFileSync} from 'fs-extra';

const PRIVATE = 'polaris-internal';
const PUBLIC = 'polaris';
const PRIVATE_GIT_REPO = `https://github.com/Shopify/${PRIVATE}`;
const PUBLIC_GIT_REPO = `https://github.com/Shopify/${PUBLIC}`;
const STRIP_PRIVATE_LINKS = /\s?\(\[.*?\]\([^\s].*\/shopify\/polaris-internal\/.*?\)\)/gi;

const root = resolve(__dirname, '..');
const sandbox = resolve(root, 'sandbox');
const polarisPublic = resolve(sandbox, PUBLIC);
const polarisInternal = resolve(sandbox, PRIVATE);
const polarisPackage = resolve(polarisInternal, 'package.json');
const scripts = resolve(polarisInternal, 'scripts');
const changelog = resolve(polarisInternal, 'CHANGELOG.md');

// Files to 🔥
const privateFiles = [
  resolve(polarisInternal, 'README.md'),
  resolve(polarisInternal, 'secrets.ejson'),
  resolve(polarisInternal, 'service.yml'),
  resolve(polarisInternal, 'tests', 'build.test.js'),
  resolve(scripts, 'deploy.js'),
  resolve(scripts, 'public-repo-deploy.js'),
];

// Scripts to 🔥
const privateScripts = [
  'precdn',
  'public',
  'cdn:secrets',
  'cdn:deploy',
  'cdn',
  'prepublish',
  'postpublish',
];

mkdir(sandbox);
cd(sandbox);

execSync(`git clone ${PRIVATE_GIT_REPO}`);
cd(polarisInternal);

// Strip package.json scripts
const packageJSON = require(polarisPackage);
const releaseVersion = `v${packageJSON.version}`;
privateScripts.forEach((script) => delete packageJSON.scripts[script]);
outputJsonSync(polarisPackage, packageJSON);

// Delete private files
rm(privateFiles);

// Regex to remove polaris-internal links in CHANGELOG.md
let changelogFile = readFileSync(changelog, 'utf8');
changelogFile = changelogFile.replace(STRIP_PRIVATE_LINKS, '');
writeFileSync(changelog, changelogFile);

cd(sandbox);
execSync(`git clone ${PUBLIC_GIT_REPO}`);
const hiddenFilesGlob = '{.vscode,.eslintignore,.gitignore,.nvmrc}';
rm('-rf', [
  join(polarisPublic, '*'),
  join(polarisPublic, hiddenFilesGlob),
]);
cp('-rf', [
  resolve(polarisInternal, '*'),
  resolve(polarisInternal, hiddenFilesGlob),
], polarisPublic);
cp('-rf', [
  resolve(polarisInternal, 'public', '.github'),
  resolve(polarisInternal, 'public', '*'),
], polarisPublic);
rm('-rf', join(polarisPublic, 'public'));
rm('-rf', polarisInternal);

cd(polarisPublic);
execSync('git add .');
execSync(`git commit -m ${releaseVersion}`);
execSync(`git tag ${releaseVersion}`);
execSync('git push && git push --tags');
