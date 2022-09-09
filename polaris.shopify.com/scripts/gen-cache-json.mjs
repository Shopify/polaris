import path from 'path';
import globby from 'globby';
import {existsSync, rmSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import matter from 'gray-matter';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;
const navJsonFile = `${cacheDir}/nav.json`;

const genNavJson = (data) => {
  const nav = [];

  data.forEach((md) => {
    const {title, icon, description} = md.frontMatter;
    const {slug} = md;
    let currentLevel = nav;
    const slugChunks = slug.split('/');

    slugChunks.forEach((chunk) => {
      const existingParent = currentLevel.find(
        (item) => item.slug.split('/').at(-1) === chunk,
      );

      if (existingParent) {
        currentLevel = existingParent.children;
      } else {
        const newItem = {
          title,
          slug: `/${slug}`,
          children: [],
          ...(icon && {icon}),
          ...(description && {description}),
        };

        currentLevel.push(newItem);
        currentLevel = newItem.children;
      }
    });
  });

  const formatNav = (navItems) => {
    navItems.forEach((item) => {
      let currentLevel = navItems;
      if (item.children.length === 0) {
        delete item.children;
      } else {
        currentLevel = item.children;
        formatNav(currentLevel);
      }
    });

    return JSON.stringify(navItems);
  };

  writeFileSync(navJsonFile, formatNav(nav), 'utf-8');
};

const genSiteJson = (data) => {
  const json = {};
  data.forEach((md) => (json[md.slug] = {frontMatter: md.frontMatter}));

  writeFileSync(siteJsonFile, JSON.stringify(json), 'utf-8');
};

const getMdContent = (filePath) => {
  const fileContent = readFileSync(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.md', '');

  return {frontMatter: data, slug};
};

const genCacheJson = () => {
  if (!existsSync(cacheDir)) mkdirSync(cacheDir, {recursive: true});
  const pathGlob = path.join(process.cwd(), 'content/**/*.md');

  const mdFiles = globby.sync(pathGlob);

  const data = mdFiles
    .map((filePath) => getMdContent(filePath))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  genSiteJson(data);
  genNavJson(data);

  console.log('✅ Generated .cache/nav.json and .cache/site.json');
};

export default genCacheJson;
