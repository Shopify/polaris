import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';

import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {MarkdownFile} from '../../../src/types';
import Layout from '../../../src/components/Layout';
import Longform from '../../../src/components/Longform';
import Markdown from '../../../src/components/Markdown';
import PageMeta from '../../../src/components/PageMeta';

interface Props {
  category: string;
  markdownFile: MarkdownFile;
}

const Foundations: NextPage<Props> = ({markdownFile}) => {
  const {frontMatter, readme} = markdownFile;
  const {title, description} = frontMatter;
  return (
    <Layout width="narrow" title={title}>
      <PageMeta title={title} description={description} />

      <Longform>
        <Markdown text={description} />
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

const foundationsDirectory = path.join(process.cwd(), 'content/foundations');

export const getStaticProps: GetStaticProps<
  Props,
  {category: string; doc: string}
> = async (context) => {
  // TODO: Markdown frontmatter typesafety
  const fullPath = path.join(
    foundationsDirectory,
    context.params?.category || '',
    `${context.params?.doc}/index.md`,
  );

  let content = fs.readFileSync(fullPath, 'utf-8');

  const markdownFile = parseMarkdown(content);

  if (content) {
    const props: Props = {
      category: context.params?.category || '',
      markdownFile,
    };

    return {props};
  }
  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const findPaths = (dirPath: string): {[key: string]: boolean} => {
    const dirFiles = fs.readdirSync(dirPath);
    if (dirFiles.length === 1 && dirFiles[0] === 'index.md') {
      return {[dirPath]: true};
    } else {
      let paths: {[key: string]: boolean} = {};
      const subDirs = dirFiles.filter((fileName) => fileName !== 'index.md');
      subDirs.forEach((dir) => {
        const newDirPath = `${dirPath}/${dir}`;
        paths = {...paths, ...findPaths(newDirPath)};
      });
      return paths;
    }
  };

  const rootDirPath = path.join(foundationsDirectory);
  const paths = findPaths(rootDirPath);

  return {
    paths: Object.entries(paths)
      .filter(([, hasIndexMd]) => hasIndexMd)
      .map(([path]) => {
        const relativePath = path.replace(rootDirPath, '');
        const segments = relativePath.split('/');
        return {params: {category: segments[1], doc: segments[2]}};
      }),
    fallback: false,
  };
};

export default Foundations;
