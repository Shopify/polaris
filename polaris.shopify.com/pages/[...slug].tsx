import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';

import Page from '../src/components/Page';
import {content} from '../src/content';
import {getPageUrl, getResolvedPage} from '../src/components/Editor/utils';
import {PageWithUrl} from '../src/components/Editor/types';

interface Props {
  page: PageWithUrl;
}

const CatchAllTemplate: NextPage<Props> = ({page}: Props) => {
  return <Page page={page} />;
};

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const page = content.pages.find((page) => {
    const pageUrl = getPageUrl(content, page);
    return pageUrl === params?.slug.join('/');
  });
  if (page) {
    const pageWithUrl = getResolvedPage(content, page);
    return {props: {page: pageWithUrl}};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = content.pages
    .filter((page) => !page.useCustomLayout)
    .map((page) => getPageUrl(content, page))
    .map((url) => ({params: {slug: url.split('/')}}));

  return {paths, fallback: false};
};

export default CatchAllTemplate;
