import path from 'path';
import globby from 'globby';
import {existsSync, rmSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import matter from 'gray-matter';

const cacheDir = path.join(process.cwd(), '.cache');
const siteJsonFile = `${cacheDir}/site.json`;

const getMdContent = (filePath) => {
  const fileContent = readFileSync(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.md', '');

  return {frontMatter: data, slug};
};

const genSiteJson = () => {
  if (!existsSync(cacheDir)) mkdirSync(cacheDir, {recursive: true});
  const pathGlob = path.join(process.cwd(), 'content/**/*.md');
  const mdFiles = globby.sync(pathGlob);

  const mdData = mdFiles.map((filePath) => getMdContent(filePath));

  const data = {};
  mdData.forEach((md) => (data[md.slug] = {frontMatter: md.frontMatter}));

  writeFileSync(siteJsonFile, JSON.stringify(data), 'utf-8');

  console.log(`✅ Generated ${siteJsonFile}`);
};

export default genSiteJson;
