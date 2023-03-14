import * as fs from 'fs';
import {content} from '../src/content';
import {getPageUrl, getResolvedPage} from '../src/components/Editor/utils';
import {NavItem} from '../src/components/Editor/types';

const nav: NavItem[] = content.pages
  .map((page) => getResolvedPage(content, page))
  .map((page) => {
    const {id, title, order, pageMeta, parentId, hasSeparatorInNav} = page;
    return {
      id,
      title,
      url: getPageUrl(content, page),
      order,
      pageMeta,
      parentId,
      hasSeparatorInNav,
    };
  });

const fileContent = `import { NavItem } from './components/Editor/types'

export const nav: NavItem[] = ${JSON.stringify(nav, null, 2)};`;

fs.writeFileSync('src/nav.ts', fileContent);

console.log('✅ Created nav.ts');
