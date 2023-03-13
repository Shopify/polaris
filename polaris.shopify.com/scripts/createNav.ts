import * as fs from 'fs';
import {content} from '../src/content';
import {getPageInfo, getPageInfoWithUrl} from '../src/components/Editor/utils';

const nav = content.pages.map((page) =>
  getPageInfoWithUrl(content, getPageInfo(page)),
);

const fileContent = `export const nav = ${JSON.stringify(nav, null, 2)};`;
fs.writeFileSync('src/nav.ts', fileContent);

console.log('✅ Created nav.ts');
