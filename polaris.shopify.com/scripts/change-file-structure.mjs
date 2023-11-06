import path from 'path';
import fs from 'fs';
import globby from 'globby';

const pathGlob = path.join(process.cwd(), 'content/**/index.mdx');

const filePaths = globby.sync(pathGlob);

filePaths.forEach((filePath) => {
  const segments = filePath.split('/');
  const folderPath = segments.slice(0, segments.length - 1).join('/');
  const newPath = `${segments.slice(0, segments.length - 2).join('/')}/${
    segments[segments.length - 2]
  }.mdx`;
  const folderContent = fs.readdirSync(folderPath);
  if (folderContent.length === 1) {
    fs.copyFileSync(filePath, newPath);
    fs.rmSync(folderPath, {recursive: true, force: true});
  }
});
