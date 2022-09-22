import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Layout from '../src/components/Layout';
import Longform from '../src/components/Longform';
import Markdown from '../src/components/Markdown';
import PageMeta from '../src/components/PageMeta';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile} from '../src/types';

interface Props {
  readme: MarkdownFile['readme'];
  title: string;
  description?: string;
}

const Contributing: NextPage<Props> = ({readme, title, description}: Props) => {
  return (
    <Layout title={title}>
      <PageMeta title={title} description={description} />

      <Longform>
        {description ? <Markdown text={description} /> : null}
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

const contentDir = path.join(process.cwd(), 'content');

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const mdFilePath = path.resolve(
    process.cwd(),
    `${contentDir}/${params?.slug.join('/') || ''}/index.md`,
  );
  console.log({mdFilePath});

  if (fs.existsSync(mdFilePath)) {
    const markdown = fs.readFileSync(mdFilePath, 'utf-8');
    const {readme, frontMatter}: MarkdownFile = parseMarkdown(markdown);
    const {title, description} = frontMatter;
    const props: Props = {
      title,
      description: description || null,
      readme,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/**/*.md');
  const paths = globby
    .sync(globPath)
    .filter((path) => !path.startsWith('/components'))
    .map((fileName: string) => {
      return fileName
        .replace(`${process.cwd()}/content`, '')
        .replace('/index.md', '');
    });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default Contributing;
