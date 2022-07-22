import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

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
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const fileTitle = filePath.split('/').at(-2);
  const exampleContent = fileContent
    .split('---')
    .filter((fileChunk) => fileChunk.startsWith('\n\n## Examples'))[0]
    .replace('\n\n## Examples', '');

  const examples = {};
  exampleContent.split('\n\n### ').forEach((example) => {
    const title = example.split('\n')[0].trim();
    if (title === '') return;
    const exampleId = kebabize(title);
    const code = example.split('```jsx').at(-1).replace('```', '').trim();
    const fileName = `${exampleId}.stories.tsx`;
    examples[
      fileName
    ] = `import React, {useCallback, useState, useMemo} from 'react';\nimport type { ComponentMeta } from '@storybook/react';\n\n`;
    examples[fileName] += `import {${fileTitle}} from '../${fileTitle}';\n\n`;
    examples[fileName] += `${code}`;
    examples[
      fileName
    ] += `\n\nexport default {\n  title: '${fileTitle}/${title}',\n  component: ${fileTitle}Example,\n} as ComponentMeta<typeof ${fileTitle}>;`;
  });

  Object.entries(examples).map(([fileName, fileContent]) => {
    const fileLocation = `${filePath.replace('/README.md', '')}/examples/`;
    fs.mkdirSync(fileLocation, {recursive: true});
    fs.writeFileSync(`${fileLocation}${fileName}`, fileContent);
  });

  fs.rmSync(filePath);
};

const migrateFiles = readmeFiles
  .slice(0, 1)
  .map((filePath) => migrateFile(filePath));

await Promise.all(migrateFiles);
