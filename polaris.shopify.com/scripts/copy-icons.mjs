import path from 'path';
import {existsSync, rmSync, mkdirSync} from 'fs';
import {copyFile} from 'fs/promises';
import metadata from '@shopify/polaris-icons/metadata';

const srcDir = path.join(process.cwd(), '../polaris-icons/dist/svg');

const distDir = path.join(process.cwd(), 'public/icons');

if (existsSync(distDir)) rmSync(distDir, {recursive: true});
mkdirSync(distDir);

const copyPromises = Object.keys(metadata).map((iconName) =>
  copyFile(
    path.join(srcDir, `${iconName}.svg`),
    path.join(distDir, `${iconName}.svg`),
  ),
);

await Promise.all(copyPromises);
