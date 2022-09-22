import type {GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Layout from '../src/components/Layout';
import Longform from '../src/components/Longform';
import PageMeta from '../src/components/PageMeta';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile} from '../src/types';

interface Props {
  title: string;
  description: string;
  posts: {title: string; description: string; slug: string}[];
}

const WhatsNew: NextPage<Props> = ({title, description, posts}: Props) => {
  return (
    <Layout title={title} showTOC={false}>
      <PageMeta title={title} description={description} />

      <Longform firstParagraphIsLede={false}>
        {posts.map(({title, description, slug}) => (
          <>
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={slug}>Read more</a>
          </>
        ))}
      </Longform>
    </Layout>
  );
};

const contentDir = `${process.cwd()}/content`;

export const getStaticProps: GetStaticProps<
  Props,
  {slug: string[]}
> = async () => {
  const mdPath = `${process.cwd()}/content/whats-new/index.md`;
  const mdFile = fs.readFileSync(mdPath, 'utf-8');
  const {
    frontMatter: {title, description},
  }: MarkdownFile = parseMarkdown(mdFile);

  const globPath = path.resolve(process.cwd(), 'content/whats-new/*/index.md');
  const paths = globby.sync(globPath);

  const posts: Props['posts'] = paths.map((path) => {
    const markdown = fs.readFileSync(path, 'utf-8');
    const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
    const {title, description} = frontMatter;
    const slug = path.replace(contentDir, '').replace('index.md', '');
    return {title, description, slug};
  });

  return {props: {title, description, posts}};
};

export default WhatsNew;
