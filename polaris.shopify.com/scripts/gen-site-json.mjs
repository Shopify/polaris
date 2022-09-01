import path from 'path';
import globby from 'globby';
import {rm, mkdir, writeFile, readFile} from 'fs/promises';
import {existsSync} from 'fs';
import matter from 'gray-matter';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;

const getMdContent = async (filePath) => {
  const fileContent = await readFile(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.md', '');

  return {frontMatter: data, slug};
};

const genSiteJson = async () => {
  if (existsSync(cacheDir)) await rm(cacheDir, {recursive: true});
  await mkdir(cacheDir, {recursive: true});
  const pathGlob = path.join(process.cwd(), 'content/**/*.md');
  const mdFiles = globby.sync(pathGlob);

  const mdDataPromise = mdFiles.map((filePath) => getMdContent(filePath));
  const mdData = await Promise.all(mdDataPromise);

  const data = {};
  mdData.forEach((md) => (data[md.slug] = {frontMatter: md.frontMatter}));

  await writeFile(siteJsonFile, JSON.stringify(data), 'utf-8');

  console.log(`✅ Generated ${siteJsonFile}`);
};

genSiteJson();

export default genSiteJson;
