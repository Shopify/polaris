import type {GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';

import Layout from '../../src/components/Layout';
import Longform from '../../src/components/Longform';
import Markdown from '../../src/components/Markdown';
import {docsNavItems} from '../../src/data/navItems';
import {parseMarkdown} from '../../src/utils/markdown.mjs';
import {MarkdownFile} from '../../src/types';
import PageMeta from '../../src/components/PageMeta';

interface Props {
  title: string;
  description: string;
  readme: MarkdownFile['readme'];
}

const Documentation: NextPage<Props> = ({readme, description, title}) => {
  return (
    <Layout title={title} navItems={docsNavItems}>
      <PageMeta title={title} />

      <Longform>
        <Markdown text={description} />
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

const docsDirectory = path.join(process.cwd(), 'content/docs');

export const getStaticProps: GetStaticProps<
  Props,
  {category: string; doc: string}
> = async () => {
  const fullPath = path.join(docsDirectory, 'index.md');
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

export default Documentation;
