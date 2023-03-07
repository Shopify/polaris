import path from 'path';
import fs from 'fs';
import globby from 'globby';

const pathGlob = path.join(process.cwd(), 'pages/examples/*.tsx');

const filePaths = globby.sync(pathGlob);

filePaths.forEach((filePath) => {
  const segments = filePath.split('/');
  const dir = `app/examples/${segments[segments.length - 1].replace(
    '.tsx',
    '',
  )}`;
  console.log({dir});
  fs.mkdirSync(dir);
  const newPath = `${dir}/page.tsx`;
  fs.copyFileSync(filePath, newPath);
});
