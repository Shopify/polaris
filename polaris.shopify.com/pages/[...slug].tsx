import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';

import {
  getStaticPaths as getPaths,
  getStaticProps as getProps,
  SlugNotFoundError,
} from '../src/utils/route-data-loader.mjs';
import type {Props} from '../src/utils/route-data-loader.mjs';
import Markdown from '../src/components/Markdown';
import Page from '../src/components/Page';
import PageMeta from '../src/components/PageMeta';

function StylelintResourceLink({category}: {category: string}): JSX.Element {
  return (
    {
      border: (
        <>
          Polaris <Link href="/tokens/border">shape tokens</Link>
        </>
      ),
      color: (
        <>
          Polaris <Link href="/tokens/color">color tokens</Link>
        </>
      ),
      layout: (
        <>
          Polaris <Link href="/components">layout components</Link>
        </>
      ),
      'media queries': (
        <>
          Polaris{' '}
          <Link href="/tokens/breakpoints#sass-variables">
            breakpoint sass variables
          </Link>
        </>
      ),
      motion: (
        <>
          Polaris <Link href="/tokens/motion">motion tokens</Link>
        </>
      ),
      shadow: (
        <>
          Polaris <Link href="/tokens/shadow">depth tokens</Link>
        </>
      ),
      space: (
        <>
          Polaris <Link href="/tokens/space">space tokens</Link>
        </>
      ),
      'z-index': (
        <>
          Polaris <Link href="/tokens/z-index">z-index tokens</Link>
        </>
      ),
      typography: (
        <>
          Polaris <Link href="/components/typography/text">text component</Link>{' '}
          or <Link href="/tokens/font">font tokens</Link>
        </>
      ),
    }[category] ?? <Link href="/tokens">Polaris tokens</Link>
  );
}

const PresentTenseVerb: React.FC<{
  children: string;
}> = ({children}) => `${children.slice(-1) === 's' ? 'are' : 'is'}`;

const CatchAllTemplate = ({
  mdx,
  seoDescription,
  editPageLinkPath,
  isContentPage,
  showTOC,
  collapsibleTOC,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {title, noIndex = false} = mdx.frontmatter;

  return (
    <Page
      editPageLinkPath={editPageLinkPath}
      isContentPage={isContentPage}
      showTOC={showTOC || isContentPage}
      collapsibleTOC={collapsibleTOC}
    >
      <PageMeta title={title} description={seoDescription} noIndex={noIndex} />
      <Markdown
        {...mdx}
        components={{
          PresentTenseVerb,
          StylelintResourceLink,
        }}
      />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const slug = params?.slug;
  let props: Props;
  try {
    props = await getProps(slug);
  } catch (error) {
    if (error instanceof SlugNotFoundError) {
      return {notFound: true};
    }
    throw error;
  }

  return {props};
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths();

  return {
    paths,
    fallback: false,
  };
};

export default CatchAllTemplate;
