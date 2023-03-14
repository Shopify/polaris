import type {GetStaticPaths, GetStaticProps} from 'next';
import React from 'react';
import {ResolvedPageWithBlocks} from '../../src/components/Editor/types';
import {
  getPageByPath,
  getPageStack,
  getResolvedPage,
} from '../../src/components/Editor/utils';
import EditorRenderer from '../../src/components/EditorRenderer';
import Page from '../../src/components/Page';
import TokensPage from '../../src/components/TokensPage';
import {content} from '../../src/content';

interface Props {
  page: ResolvedPageWithBlocks;
}

const Tokens = ({page}: Props) => {
  const {pageMeta} = page;
  if (pageMeta?.type !== 'tokens') return null;

  return (
    <Page page={page} showTOC={false}>
      <TokensPage tokenGroup={pageMeta.tokenGroup} />
      <EditorRenderer page={page} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props, {group: string}> = async (
  context,
) => {
  const group = context.params?.group;
  const page = getPageByPath(content, `tokens/${group}`);

  if (page && page.pageMeta?.type === 'tokens') {
    const props: Props = {page: getResolvedPage(content, page, true)};
    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = content.pages
    .map((page) => getPageStack(content, page))
    .filter(
      (pageStack) => pageStack[0].slug === 'tokens' && pageStack.length === 2,
    )
    .map((pageStack) => {
      const pageMeta = pageStack[1].pageMeta;
      if (pageMeta?.type !== 'tokens') {
        const url = pageStack.map(({slug}) => slug).join('/');
        throw new Error(
          `Page ${url} should have pageMeta of type 'tokens', but it was of type "${pageMeta?.type.toString()}"`,
        );
      }
      return {params: {group: pageMeta.tokenGroup}};
    });

  return {
    paths,
    fallback: false,
  };
};

export default Tokens;
