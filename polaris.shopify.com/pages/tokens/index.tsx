import {Grid, GridItem} from '../../src/components/Grid';
import Page from '../../src/components/Page';
import {ResolvedPage} from '../../src/components/Editor/types';
import {GetStaticProps} from 'next';
import {content} from '../../src/content';
import {getResolvedPage} from '../../src/components/Editor/utils';

interface Props {
  page: ResolvedPage;
  subPages: ResolvedPage[];
}

export default function ComponentPage({page, subPages}: Props) {
  return (
    <Page page={page} showTOC={false}>
      <Grid>
        {subPages.map((subPage) => {
          return <GridItem key={page.id} {...subPage} />;
        })}
      </Grid>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = content.pages.find(
    ({parentId, slug}) => !parentId && slug === 'tokens',
  );
  if (page) {
    const resolvedPage = getResolvedPage(content, page);
    let subPages = content.pages
      .filter((page) => page.parentId === resolvedPage.id)
      .map((componentPage) => getResolvedPage(content, componentPage));

    return {
      props: {page: resolvedPage, subPages},
    };
  } else {
    return {notFound: true};
  }
};
