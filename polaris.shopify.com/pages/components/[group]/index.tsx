import {Grid, GridItem} from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import {ResolvedPage} from '../../../src/components/Editor/types';
import {GetStaticPaths, GetStaticProps} from 'next';
import {content} from '../../../src/content';
import {
  getResolvedPage,
  getPageUrl,
} from '../../../src/components/Editor/utils';

interface Props {
  page: ResolvedPage;
  subPages: ResolvedPage[];
}

export default function GroupPage({page, subPages}: Props) {
  return (
    <Page page={page} showTOC={false}>
      <Grid>
        {subPages
          .sort((a, b) => a.order - b.order)
          .map((subPage) => {
            return <GridItem key={subPage.slug} {...subPage} />;
          })}
      </Grid>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props, {group: string}> = async ({
  params,
}) => {
  const page = content.pages.find((page) => {
    const pageUrl = getPageUrl(content, page);
    return pageUrl === `components/${params?.group}`;
  });
  if (page) {
    const resolvedPage = getResolvedPage(content, page);
    const subPages = content.pages
      .filter((page) => page.parentId === resolvedPage.id)
      .map((page) => getResolvedPage(content, page));

    return {props: {page: resolvedPage, subPages}};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const componentsPage = content.pages.find(
    (page) => page.parentId === null && page.slug === 'components',
  );

  const paths = content.pages
    .filter(
      ({useCustomLayout, parentId}) =>
        useCustomLayout && parentId === componentsPage?.id,
    )
    .map((page) => getPageUrl(content, page))
    .map((url) => ({params: {group: url.split('/')[1]}}));

  return {paths, fallback: false};
};
