import path from 'path';
import globby from 'globby';
import {existsSync} from 'fs';
import {mkdir, writeFile, readFile} from 'fs/promises';
import matter from 'gray-matter';
import set from 'lodash.set';
import ora from 'ora';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;
const navJsonFile = `${cacheDir}/nav.json`;

const genNavJson = async (markdownFiles) => {
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

  await writeFile(navJsonFile, JSON.stringify(nav), 'utf-8');
};

const genSiteJson = async (data) => {
  const json = {};
  data.forEach((md) => (json[md.slug] = {frontMatter: md.frontMatter}));

  await writeFile(siteJsonFile, JSON.stringify(json), 'utf-8');
};

const getMdContent = async (filePath) => {
  const fileContent = await readFile(filePath, 'utf-8');
  const {data} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.mdx', '')
    .replace('.mdx', '');

  return {frontMatter: data, slug};
};

const genCacheJson = async () => {
  const spinner = ora(
    'Generating .cache/nav.json and .cache/site.json',
  ).start();

  if (!existsSync(cacheDir)) {
    await mkdir(cacheDir, {recursive: true});
  }

  const pathGlob = [
    path.join(process.cwd(), 'content/*.mdx'),
    path.join(process.cwd(), 'content/**/*.mdx'),
  ];

  const mdFiles = await globby(pathGlob);

  const markdownFiles = (
    await Promise.all(mdFiles.map((filePath) => getMdContent(filePath)))
  )
    .filter((md) => !md.frontMatter?.hideFromNav)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  await genSiteJson(markdownFiles);
  await genNavJson(markdownFiles);

  spinner.succeed('Generated .cache/nav.json and .cache/site.json');
};

export default genCacheJson;
