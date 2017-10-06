/* eslint-disable no-console */
import {execSync} from 'child_process';
import {outputJsonSync, readFileSync, writeFileSync} from 'fs-extra';
import {join, resolve, basename} from 'path';
import {cp, rm, mkdir} from 'shelljs';
import glob from 'glob';

const polarisBotName = 'Shopify Polaris Bot';
const polarisBotEmail = 'shopify-polaris-bot@users.noreply.github.com';
const polarisBotToken = require('../secrets.json').github['shopify-polaris'];

const PRIVATE = 'polaris-react';
const PUBLIC = 'polaris';
const STRIP_PRIVATE_LINKS = /\s?\(\[.*?\]\([^\s].*\/shopify\/polaris-react\/.*?\)\)/gi;

const root = resolve(__dirname, '../');
const sandbox = resolve(root, 'sandbox');
const polarisPublic = resolve(sandbox, PUBLIC);
const polarisPrivate = resolve(sandbox, PRIVATE);
const scripts = resolve(polarisPrivate, 'scripts');
const polarisPackage = resolve(polarisPrivate, 'package.json');
const changelog = resolve(polarisPrivate, 'CHANGELOG.md');

// Files to 🔥
const privateFiles = [
  resolve(polarisPrivate, 'README.md'),
  resolve(polarisPrivate, 'secrets.ejson'),
  resolve(polarisPrivate, 'service.yml'),
  resolve(polarisPrivate, 'tests', 'build.test.js'),
  resolve(scripts, 'deploy.js'),
  resolve(scripts, 'public-repo-deploy.js'),
  resolve(scripts, 'build-consumer.js'),
];

// Scripts to 🔥
const privateScripts = [
  'precdn',
  'public',
  'cdn:secrets',
  'cdn:deploy',
  'cdn',
  'dev:host',
  'public-release:secrets',
  'prepublic-release',
  'public-release',
  'prepublish',
  'postpublish',
  'hide-private-readme',
  'show-private-readme',
  'prebuild-consumer',
  'build-consumer',
  'postbuild-consumer',
];

mkdir(sandbox);
const execOpts = {stdio: 'inherit'};
execSync(`git clone https://${polarisBotToken}@github.com/Shopify/${PRIVATE}.git ${polarisPrivate}`, execOpts);
execSync(`git clone https://${polarisBotToken}@github.com/Shopify/${PUBLIC}.git ${polarisPublic}`, execOpts);

// Strip package.json scripts
const packageJSON = require(polarisPackage);
const releaseVersion = `v${packageJSON.version}`;
privateScripts.forEach((script) => delete packageJSON.scripts[script]);
outputJsonSync(polarisPackage, packageJSON, {spaces: 2});

// Delete private files
rm(privateFiles);

// Regex to remove polaris-react links in CHANGELOG.md
let changelogFile = readFileSync(changelog, 'utf8');
changelogFile = changelogFile.replace(STRIP_PRIVATE_LINKS, '');
writeFileSync(changelog, changelogFile);

const hiddenFilesGlob = '{.vscode,.eslintignore,.gitignore,.nvmrc,.github,.babelrc}';

// 🔥 ./sandbox/polaris
rm('-rf', [
  join(polarisPublic, '*'),
  join(polarisPublic, hiddenFilesGlob),
]);

// There should always be a .git folder as a match
const emptyRepoFiles = glob.sync(join(polarisPublic, '{.*,*}'));
if (emptyRepoFiles.length !== 1) {
  throw new Error(`Stale files exist in the public Polaris repo. Found ${JSON.stringify(emptyRepoFiles)}.`);
}
if (basename(emptyRepoFiles[0]) !== '.git') {
  throw new Error(`.git directory must exist to preserve commit history. Found ${JSON.stringify(emptyRepoFiles)}.`);
}

cp('-rf', [
  resolve(polarisPrivate, '*'),
  resolve(polarisPrivate, hiddenFilesGlob),
], polarisPublic);

// Dump sandbox/polaris-react/public into sandbox/polaris
cp('-rf', [
  resolve(polarisPrivate, 'public', '.github'),
  resolve(polarisPrivate, 'public', '*'),
], polarisPublic);
rm('-rf', join(polarisPublic, 'public'));
rm('-rf', polarisPrivate);

// Replace variables in the main README with the appropriate details
const publicReadme = resolve(polarisPublic, 'README.md');
writeFileSync(
  publicReadme,
  readFileSync(publicReadme, 'utf8').replace(/\{\{VERSION\}\}/g, packageJSON.version)
);

// Replace variables in the component README with the appropriate details
const componentReadme = resolve(polarisPublic, './src/components/README.md');
writeFileSync(
  componentReadme,
  readFileSync(componentReadme, 'utf8').replace(/\{\{VERSION\}\}/g, packageJSON.version)
);

// Used to make git operations in polarisPublic dir instead of current working dir
const gitDirectoryOveride = `--git-dir ${polarisPublic}/.git --work-tree=${polarisPublic}`;
const shopifyPolarisBotGitOveride = `GIT_COMMITTER_NAME='${polarisBotName}' GIT_COMMITTER_EMAIL='${polarisBotEmail}'`;
execSync(`git ${gitDirectoryOveride} add .`, execOpts);
execSync(`${shopifyPolarisBotGitOveride} git ${gitDirectoryOveride} commit --author "${polarisBotName} <${polarisBotEmail}>" -m "${releaseVersion}"`, execOpts);
execSync(`git ${gitDirectoryOveride} tag ${releaseVersion}`, execOpts);
execSync(`git ${gitDirectoryOveride} push`);
execSync(`git ${gitDirectoryOveride} push --tags`);

console.log(`Done: Succesfully pushed to ${PUBLIC}`);
