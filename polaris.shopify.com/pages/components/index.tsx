import {Grid, GridItem} from '../../src/components/Grid';
import Page from '../../src/components/Page';
import ComponentThumbnail from '../../src/components/ComponentThumbnail';
import {PageWithUrl} from '../../src/components/Editor/types';
import {GetStaticProps} from 'next';
import {content} from '../../src/content';
import {getPageWithUrl, getPageUrl} from '../../src/components/Editor/Editor';

interface Props {
  page: PageWithUrl;
  groups: {
    title: string;
    components: {
      title: string;
      excerpt: string;
      url: string;
    }[];
  }[];
}

export default function ComponentPage({page, groups}: Props) {
  return (
    <Page page={page}>
      {groups.map((group) => {
        return (
          <>
            <h2>{group.title}</h2>

            <Grid>
              {group.components.map((component) => (
                <GridItem
                  key={component.title}
                  title={component.title}
                  description={component.excerpt}
                  url={component.url}
                  renderPreview={() => (
                    <ComponentThumbnail title={component.title} />
                  )}
                />
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
    const pageWithUrl = getPageWithUrl(content, page);
    let groups: Props['groups'] = [];

    content.pages
      .filter((page) => page.parentId === pageWithUrl.id)
      .forEach((groupPage) => {
        groups.push({
          title: groupPage.title,
          components: content.pages
            .filter((page) => page.parentId === groupPage.id)
            .map((componentPage) => ({
              title: componentPage.title,
              excerpt: componentPage.excerpt,
              url: getPageUrl(content, componentPage),
            })),
        });
      });

    return {
      props: {page: pageWithUrl, groups},
    };
  } else {
    return {notFound: true};
  }
};
