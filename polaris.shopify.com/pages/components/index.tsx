import {Grid, GridItem} from '../../src/components/Grid';
import Page from '../../src/components/Page';
import {
  ResolvedPage,
  ResolvedPageWithBlocks,
} from '../../src/components/Editor/types';
import {GetStaticProps} from 'next';
import {content} from '../../src/content';
import {getResolvedPage} from '../../src/components/Editor/utils';

interface Props {
  page: ResolvedPageWithBlocks;
  groups: {
    title: string;
    componentPages: ResolvedPage[];
  }[];
}

export default function ComponentPage({page, groups}: Props) {
  return (
    <Page page={page} showTOC={false}>
      {groups.map((group) => {
        return (
          <>
            <h2>{group.title}</h2>

            <Grid>
              {group.componentPages.map((page) => (
                <GridItem key={page.id} {...page} />
              ))}
            </Grid>
          </>
        );
      })}
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = content.pages.find(
    ({parentId, slug}) => !parentId && slug === 'components',
  );
  if (page) {
    const resolvedPage = getResolvedPage(content, page, true);
    let groups: Props['groups'] = [];

    content.pages
      .filter((page) => page.parentId === resolvedPage.id)
      .forEach((groupPage) => {
        groups.push({
          title: groupPage.title,
          componentPages: content.pages
            .filter((page) => page.parentId === groupPage.id)
            .map((componentPage) => getResolvedPage(content, componentPage)),
        });
      });

    return {
      props: {page: resolvedPage, groups},
    };
  } else {
    return {notFound: true};
  }
};
