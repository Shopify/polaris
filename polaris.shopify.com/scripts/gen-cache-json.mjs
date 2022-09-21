import path from 'path';
import globby from 'globby';
import {existsSync, rmSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import matter from 'gray-matter';
import set from 'lodash.set';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;
const navJsonFile = `${cacheDir}/nav.json`;

// https://stackoverflow.com/a/34749873
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}});
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    }
  }

  return mergeDeep(target, ...sources);
}

const navOverrides = {
  children: {
    'whats-new': {
      title: "What's new",
      slug: '/whats-new',
      expandable: false,
      order: 0,
      sectionBreakAfter: true,
    },
    foundations: {
      skipInNav: true,
      order: 1,
      children: {
        foundations: {title: 'Foundations', order: 0},
        content: {title: 'Content', order: 1},
        design: {title: 'Design', order: 2},
        patterns: {title: 'Patterns', order: 3, sectionBreakAfter: true},
      },
    },
    components: {
      title: 'Components',
      slug: '/components',
      order: 2,
    },
    tokens: {
      title: 'Tokens',
      slug: '/tokens/colors',
      order: 3,
    },
    icons: {
      title: 'Icons',
      slug: '/icons',
      order: 4,
      sectionBreakAfter: true,
    },
    contributing: {
      order: 5,
    },
  },
};

const genNavJson = (mardownFiles) => {
  let nav = {};

  mardownFiles.forEach((md) => {
    const {title, icon, description} = md.frontMatter;
    const {slug} = md;

    const path = `children.${slug.replace(/\//g, '.children.')}`;

    set(nav, path, {title, icon, description, slug: `/${slug}`});
  });

  nav = mergeDeep(nav, navOverrides);

  writeFileSync(navJsonFile, JSON.stringify(nav), 'utf-8');
};

const genSiteJson = (data) => {
  const json = {};
  data.forEach((md) => (json[md.slug] = {frontMatter: md.frontMatter}));

  writeFileSync(siteJsonFile, JSON.stringify(json), 'utf-8');
};

const getMdContent = (filePath) => {
  const fileContent = readFileSync(filePath, 'utf-8');
  const {data} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.md', '');

  return {frontMatter: data, slug};
};

const genCacheJson = () => {
  if (!existsSync(cacheDir)) mkdirSync(cacheDir, {recursive: true});
  const pathGlob = path.join(process.cwd(), 'content/**/*.md');

  const mdFiles = globby.sync(pathGlob);

  const mardownFiles = mdFiles
    .map((filePath) => getMdContent(filePath))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  genSiteJson(mardownFiles);
  genNavJson(mardownFiles);

  console.log('✅ Generated .cache/nav.json and .cache/site.json');
};

genCacheJson();

export default genCacheJson;
