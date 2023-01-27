import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';
import matter from 'gray-matter';

import PatternPage from '../../src/components/PatternPage';
import {Pattern, PatternFrontMatter} from '../../src/types';

interface Props extends PatternFrontMatter {
  pattern: Pattern;
}

const readFrontMatter = (filePath: string): {[key: string]: any} => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return matter(fileContent)?.data;
};

const patternsContentAbsoluteDir = path.resolve(
  process.cwd(),
  `content/patterns`,
);

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error('Expected params.slug to be defined (as string[])');
  }

  const markdownFilePath = path.resolve(
    patternsContentAbsoluteDir,
    `${slug}.md`,
  );

  if (!fs.existsSync(markdownFilePath)) {
    return {notFound: true};
  }

  const data = readFrontMatter(markdownFilePath) as PatternFrontMatter;
  const contentFilePath = path.resolve(
    patternsContentAbsoluteDir,
    data.contentFile,
  );

  if (!data.contentFile || !fs.existsSync(contentFilePath)) {
    console.error(
      `${slug}.md declares 'contentFile: ${data.contentFile}' which cannot be loaded.`,
    );

    // Fail gracefully
    return {notFound: true};
  }

  const {default: pattern} = await import(
    /* webpackInclude: /content\/patterns\/.*\.ts$/ */
    `../../content/patterns/${data.contentFile}`
  );

  return {
    props: {
      ...data,
      pattern,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = globby
    .sync(path.resolve(process.cwd(), 'content/patterns/*.md'))
    .map(readFrontMatter)
    .map(({url} = {}) => url)
    .filter(Boolean);
  return {
    paths,
    fallback: false,
  };
};

const PatternsPage: NextPage<Props> = (props: Props) => {
  return <PatternPage {...props} />;
};

export default PatternsPage;
