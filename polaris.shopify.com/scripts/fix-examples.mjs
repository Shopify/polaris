import path from 'path';
import fs from 'fs';
import globby from 'globby';

const pathGlob = path.join(process.cwd(), 'app/examples/**/page.tsx');
const filePaths = globby.sync(pathGlob);

filePaths.forEach((filePath) => {
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  fileContent = `'use client';\n\n${fileContent}`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
});
