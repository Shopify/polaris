import path from 'path';
import globby from 'globby';
import fs from 'fs/promises';
import matter from 'gray-matter';

const siteJsonPath = path.join(process.cwd(), '.cache/site.json');

const getMdContent = async (filePath) => {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  const slug = filePath
    .replace(`${process.cwd()}/content/`, '')
    .replace('/index.md', '');

  return {frontMatter: data, slug};
};

const genSiteJson = async () => {
  const pathGlob = path.join(process.cwd(), 'content/**/*.md');
  const mdFiles = globby.sync(pathGlob);

  const mdDataPromise = mdFiles.map((filePath) => getMdContent(filePath));
  const mdData = await Promise.all(mdDataPromise);

  const data = {};
  mdData.forEach((md) => (data[md.slug] = {frontMatter: md.frontMatter}));

  await fs.writeFile(siteJsonPath, JSON.stringify(data), 'utf-8');

  console.log(`✅ Generated ${siteJsonPath}`);
};

export default genSiteJson;
