import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import readmeLoader from '../.storybook/polaris-readme-loader.js';

import glob from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readmeFiles = glob.sync(
  path.join(__dirname, '../src/components/*/README.md'),
);

const kebabize = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

const migrateFile = async (filePath) => {
  const mdContent = fs.readFileSync(filePath, 'utf-8');
  const fileTitle = filePath.split('/').at(-2); // Button

  const fileContent = readmeLoader.call({cacheable: () => {}}, mdContent);

  fs.writeFileSync(
    path.dirname(filePath) + '/' + fileTitle + `.stories.tsx`,
    fileContent,
  );
  // fs.rmSync(filePath);
};

// TODO pass the omitAppProvider and fullscreen arg from

const migrateFiles = readmeFiles.map((filePath) => migrateFile(filePath));

await Promise.all(migrateFiles);
