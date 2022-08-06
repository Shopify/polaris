import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import {globby} from 'globby';

import Layout from '../../components/Layout';
import Longform from '../../components/Longform';
import Markdown from '../../components/Markdown';
import PageMeta from '../../components/PageMeta';
import {contributingNavItems} from '../../data/navItems';
import {parseMarkdown} from '../../utils/markdown.mjs';
import {MarkdownFile} from '../../types';

interface Props {
  readme: MarkdownFile['readme'];
  title: string;
  description?: string;
}

const contributingDirectory = path.join(process.cwd(), 'content/contributing');

const Contributing: NextPage<Props> = ({readme, title, description}: Props) => {
  return (
    <Layout navItems={contributingNavItems} title={title}>
      <PageMeta title={title} description={description} />

      <Longform>
        {description ? <Markdown text={description} /> : null}
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props, {doc: string}> = async ({
  params,
}) => {
  const mdFilePath = path.resolve(
    process.cwd(),
    `${contributingDirectory}/${params?.doc || ''}/index.md`,
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
  const globPath = path.resolve(process.cwd(), 'content/contributing/*/*.md');
  const paths = (await globby(globPath)).map((fileName: string) => {
    return fileName
      .replace(`${process.cwd()}/content`, '')
      .replace('/index.md', '');
  });

  return {
    paths,
    fallback: false,
  };
};

export default Contributing;
