import path from 'path';
import globby from 'globby';
import {existsSync} from 'fs';
import {mkdir, writeFile, readFile} from 'fs/promises';
import matter from 'gray-matter';
import set from 'lodash.set';
import ora from 'ora';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.ts`;
const navJsonFile = `${cacheDir}/nav.ts`;

var isAbsolute = new RegExp('^([a-z]+:|//)', 'i');

const normalizeUrl = (slug) => {
  return isAbsolute.test(slug) || slug.startsWith('/') ? slug : `/${slug}`;
};

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
      slug: normalizeUrl(url || slug),
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

  await writeFile(
    navJsonFile,
    `import type {NavJSON} from '../src/types';
export default ${JSON.stringify(nav)} satisfies NavJSON;`,
    'utf-8',
  );
};

const genSiteJson = async (data) => {
  // We are not filtering on no-index because there may be unlisted pages
  // that still need og images generated.
  const json = data
    .filter(
      (md) =>
        !md.slug.endsWith('variants/default') &&
        !isAbsolute.test(md.frontMatter.url ?? ''),
    )
    .reduce((acc, curr) => {
      acc[normalizeUrl(curr.frontMatter.url ?? curr.slug)] = {
        frontMatter: curr.frontMatter,
      };
      return acc;
    }, {});

  await writeFile(
    siteJsonFile,
    `import type {SiteJSON} from '../src/types';
export default ${JSON.stringify(json)} satisfies SiteJSON;`,
    'utf-8',
  );
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
  const spinner = ora('Generating .cache/nav.ts and .cache/site.ts').start();

  if (!existsSync(cacheDir)) {
    await mkdir(cacheDir, {recursive: true});
  }

  const pathGlob = [
    // Note: files prefixed with an underscore are ignored
    path.join(process.cwd(), 'content/**/!(_)*.mdx'),
  ];

  const mdFiles = await globby(pathGlob);

  const markdownFiles = (
    await Promise.all(mdFiles.map((filePath) => getMdContent(filePath)))
  ).sort((a, b) => a.slug.localeCompare(b.slug));

  await genSiteJson(markdownFiles);
  await genNavJson(markdownFiles);

  spinner.succeed('Generated .cache/nav.ts and .cache/site.ts');
};

await genCacheJson();
