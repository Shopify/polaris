/* eslint-disable no-console */

const {resolve} = require('path');

const {config, cp, mkdir, rm} = require('shelljs');

const packageJSON = require('../package.json');

const root = resolve(__dirname, '..');
const projectDir = process.argv[2];

config.fatal = true;

if (!projectDir) {
  console.log(
    'A target project directory is required. `yarn build-consumer PROJECT_DIRECTORY`',
  );
  process.exit(1);
}

const projectPolarisDir = resolve(
  root,
  `../${projectDir}/node_modules/@shopify/polaris`,
);
const files = [
  'package.json',
  'README.md',
  'LICENSE.md',
  'CHANGELOG.md',
  ...packageJSON.files,
];

console.log('Cleaning up old build...');
rm('-rf', projectPolarisDir);

console.log('Creating new build directory...');
mkdir('-p', projectPolarisDir);

console.log('Copying build to node_modules...');
cp('-R', files, projectPolarisDir);

console.log(
  'Build copied to consuming project. You can now run the consuming app and it will include your changes from Polaris.',
);
