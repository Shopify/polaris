import * as fs from 'fs';
import {content} from '../src/content';
import {getResolvedPage} from '../src/components/Editor/utils';

const nav = content.pages.map((page) => getResolvedPage(content, page));

const fileContent = `export const nav = ${JSON.stringify(nav, null, 2)};`;
fs.writeFileSync('src/nav.ts', fileContent);

console.log('✅ Created nav.ts');
