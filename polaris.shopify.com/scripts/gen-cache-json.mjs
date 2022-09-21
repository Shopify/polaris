import path from 'path';
import globby from 'globby';
import {existsSync, rmSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import matter from 'gray-matter';
import set from 'lodash.set';
import merge from 'lodash.merge';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;
const navJsonFile = `${cacheDir}/nav.json`;

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
    icons: {
      title: 'Icons',
      slug: '/icons',
    },
    foundations: {
      title: 'Foundations',
      children: {
        content: {title: 'Content'},
        design: {title: 'Design'},
        foundations: {title: 'Foundations'},
        patterns: {title: 'Patterns'},
      },
    },
    'whats-new': {
      title: "What's new",
      slug: '/whats-new',
      expandable: false,
    },
    foundations: {
      title: 'Foundations',
    },
    components: {
      title: 'Components',
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
