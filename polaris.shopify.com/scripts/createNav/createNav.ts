import * as fs from 'fs';
import {content} from '../../src/content';
import {getPageUrl} from '../../src/components/Editor/utils';

const nav = content.pages.map((page) => {
  const {id, title, slug, order, hasSeparatorInNav} = page;
  return {
    id,
    title,
    slug,
    url: getPageUrl(content, page),
    parentId: page.parentId,
    hasSeparatorInNav,
    order,
  };
});

const fileContent = `export const nav = ${JSON.stringify(nav, null, 2)};`;

fs.writeFileSync('src/nav.ts', fileContent);
