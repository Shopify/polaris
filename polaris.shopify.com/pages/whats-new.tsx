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
    <Page title={title}>
      <PageMeta title={title} description={description} />
      <WhatsNewListing posts={posts} />
    </Page>
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

  // Adding links to the collection without sub-pages
  posts.unshift({
    title: 'Shopify Polaris v12 beta',
    description:
      'You can access the beta now or simply wait for the stable release in September.',
    slug: '/new-design-language',
    imageUrl: '/images/updates/uplift-beta@2x.png',
  });
  posts.unshift({
    title: 'Uplifting Shopify Polaris',
    description: 'The process of evolving a large scale design system.',
    slug: 'https://ux.shopify.com/uplifting-shopify-polaris-7c54fc6564d9',
    imageUrl: '/images/updates/uplift-blogpost@2x.png',
  });

  return {props: {title, description, posts}};
};

export default WhatsNew;
