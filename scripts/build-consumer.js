import {cp, mkdir, rm} from 'shelljs';
import {resolve} from 'path';

import packageJSON from '../package.json';

const root = resolve(__dirname, '..');
const projectDir = process.argv[2];

if (!projectDir) {
  // eslint-disable-next-line no-console
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

// eslint-disable-next-line no-console
console.log('Cleaning up old build...');
rm('-rf', projectPolarisDir);
// eslint-disable-next-line no-console
console.log('Creating new build directory...');
mkdir(projectPolarisDir);
// eslint-disable-next-line no-console
console.log('Copying build to node_modules...');
cp('-R', files, projectPolarisDir);
// eslint-disable-next-line no-console
console.log(
  'Build copied to consuming project. You can now run the consuming app and it will include your changes from Polaris.',
);
