import {GetStaticProps} from 'next';
import {getPageUrl, getPageWithUrl} from '../../src/components/Editor/Editor';
import {PageWithUrl} from '../../src/components/Editor/types';
import {Grid, GridItem, GridItemProps} from '../../src/components/Grid';
import Longform from '../../src/components/Longform';
import Page from '../../src/components/Page';
import {content} from '../../src/content';

interface Props {
  page: PageWithUrl;
  patterns: GridItemProps[];
}

const PatternsIndex = ({page, patterns}: Props) => (
  <Page page={page}>
    <Longform>
      <p>{page.excerpt}</p>
    </Longform>

    <Grid>
      {patterns.map((pattern, index) => (
        <GridItem
          key={index}
          title={pattern.title}
          description={pattern.description ?? ''}
          url={pattern.url ?? ''}
          renderPreview={() => (
            // <Preview alt={pattern.title} src={pattern.previewImg} />
            <p>Pattern preview</p>
          )}
          // status={pattern.status}
        />
      ))}
    </Grid>
  </Page>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const {pages} = content;
  const page = pages.find((page) => page.slug === 'patterns');

  if (page) {
    const pageWithUrl = getPageWithUrl(content, page);
    const patterns: Props['patterns'] = pages
      .filter(({parentId}) => parentId === pageWithUrl.id)
      .map((page) => {
        return {
          slug: page.slug,
          title: page.title,
          excerpt: page.excerpt,
          url: getPageUrl(content, page),
          order: page.order,
        };
      });

    return {
      props: {
        page: pageWithUrl,
        patterns,
      },
    };
  } else {
    return {notFound: true};
  }
};

export default PatternsIndex;
