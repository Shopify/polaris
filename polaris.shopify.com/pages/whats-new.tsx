import type {GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Page from '../src/components/Page';
import PageMeta from '../src/components/PageMeta';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile} from '../src/types';
import WhatsNewListing, {
  WhatsNewListingProps,
} from '../src/components/WhatsNewListing/WhatsNewListing';

interface Props {
  title: string;
  description: string;
  posts: WhatsNewListingProps['posts'];
}

const WhatsNew: NextPage<Props> = ({title, description, posts}: Props) => {
  return (
    // <Page title={title}>
    <>
      <PageMeta title={title} description={description} />
      <WhatsNewListing posts={posts} />
    </>
    // </Page>
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

  const globPath = path.resolve(process.cwd(), 'content/whats-new/*.md');
  const paths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith('index.md'));

  const posts: Props['posts'] = paths.map((path) => {
    const markdown = fs.readFileSync(path, 'utf-8');
    const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
    const {title, description, imageUrl} = frontMatter;
    const slug = path.replace(contentDir, '').replace('.md', '');
    return {title, description, slug, imageUrl};
  });

  return {props: {title, description, posts}};
};

export default WhatsNew;
