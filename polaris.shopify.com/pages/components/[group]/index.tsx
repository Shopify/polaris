import {Grid, GridItem} from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import ComponentThumbnail from '../../../src/components/ComponentThumbnail';
import {PageWithUrl} from '../../../src/components/Editor/types';
import {GetStaticPaths, GetStaticProps} from 'next';
import {content} from '../../../src/content';
import {
  createPageWithUrl,
  getPageUrl,
} from '../../../src/components/Editor/Editor';

interface Props {
  page: PageWithUrl;
  subPages: PageWithUrl[];
}

export default function GroupPage({page, subPages}: Props) {
  return (
    <Page page={page}>
      <Grid>
        {subPages
          .sort((a, b) => a.title.localeCompare(b.title))
          .sort((a, b) => a.order - b.order)
          .map((subPage) => {
            return (
              <GridItem
                key={subPage.slug}
                {...subPage}
                description={subPage.excerpt}
                url={subPage.url}
                renderPreview={() => (
                  <ComponentThumbnail title={subPage.title} />
                )}
              />
            );
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
    const pageWithUrl = createPageWithUrl(content, page);
    const subPages = content.pages
      .filter((page) => page.parentId === pageWithUrl.id)
      .map((page) => createPageWithUrl(content, page));

    return {props: {page: pageWithUrl, subPages}};
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
