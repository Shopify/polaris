import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Layout from '../../src/components/Layout';
import Longform from '../../src/components/Longform';
import Markdown from '../../src/components/Markdown';
import PageMeta from '../../src/components/PageMeta';
import {parseMarkdown} from '../../src/utils/markdown.mjs';
import {MarkdownFile} from '../../src/types';

interface Props {
  readme: MarkdownFile['readme'];
  title: string;
  description?: string;
}

const whatsnewDir = path.join(process.cwd(), 'content/whats-new');

const WhatsNew: NextPage<Props> = ({readme, title, description}: Props) => {
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

export const getStaticProps: GetStaticProps<Props, {slug: string}> = async ({
  params,
}) => {
  const mdFilePath = path.resolve(
    process.cwd(),
    `${whatsnewDir}/${params?.slug || ''}/index.md`,
  );

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
  const globPath = path.resolve(process.cwd(), 'content/whats-new/*/*.md');
  const paths = globby.sync(globPath).map((fileName: string) => {
    return fileName
      .replace(`${process.cwd()}/content`, '')
      .replace('/index.md', '');
  });

  return {
    paths,
    fallback: false,
  };
};

export default WhatsNew;
