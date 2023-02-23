import path from 'path';
import globby from 'globby';
import {existsSync, rmSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import matter from 'gray-matter';
import set from 'lodash.set';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;
const navJsonFile = `${cacheDir}/nav.json`;

const genNavJson = (markdownFiles) => {
  let nav = {};

  markdownFiles.forEach((md) => {
    const {
      title,
      navTitle,
      icon,
      description,
      order,
      newSection,
      hideChildren,
      color,
      url,
      status,
      expanded,
      groups,
      componentDescriptions,
      relatedResources,
      hideFromNav,
    } = md.frontMatter;
    const {slug} = md;

    const path = `children.${slug.replace(/\//g, '.children.')}`;

    set(nav, path, {
      title: navTitle || title,
      icon,
      description,
      order,
      slug: url || `/${slug}`,
      newSection,
      hideChildren,
      color: color ? color.replace(/\\/g, '') : undefined,
      status,
      expanded,
      groups,
      componentDescriptions,
      relatedResources,
      hideFromNav: hideFromNav || false,
    });
  });

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
    .replace('/index.md', '')
    .replace('.md', '');

  return {frontMatter: data, slug};
};

const genCacheJson = () => {
  if (!existsSync(cacheDir)) mkdirSync(cacheDir, {recursive: true});
  const pathGlob = [
    path.join(process.cwd(), 'content/*.md'),
    path.join(process.cwd(), 'content/**/*.md'),
  ];

  const mdFiles = globby.sync(pathGlob);

  const markdownFiles = mdFiles
    .map((filePath) => getMdContent(filePath))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  genSiteJson(markdownFiles);
  genNavJson(markdownFiles);

  console.log('✅ Generated .cache/nav.json and .cache/site.json');
};

genCacheJson();

export default genCacheJson;
