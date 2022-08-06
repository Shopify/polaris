import type {GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';

import Layout from '../../components/Layout';
import Longform from '../../components/Longform';
import Markdown from '../../components/Markdown';
import {contributingNavItems} from '../../data/navItems';
import {parseMarkdown} from '../../utils/markdown.js';
import {MarkdownFile} from '../../types';
import PageMeta from '../../components/PageMeta';

interface Props {
  title: string;
  description: string;
  readme: MarkdownFile['readme'];
}

const Contributing: NextPage<Props> = ({readme, description, title}) => {
  return (
    <Layout title={title} navItems={contributingNavItems}>
      <PageMeta title={title} />

      <Longform>
        <Markdown text={description} />
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

const contributingDirectory = path.join(process.cwd(), 'content/contributing');

export const getStaticProps: GetStaticProps<
  Props,
  {category: string; doc: string}
> = async () => {
  const fullPath = path.join(contributingDirectory, 'index.md');
  const content = fs.readFileSync(fullPath, 'utf-8');
  const {readme, frontMatter}: MarkdownFile = parseMarkdown(content);
  const {title, description} = frontMatter;

  if (content) {
    const props: Props = {
      readme,
      title,
      description,
    };

    return {props};
  }

  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export default Contributing;
