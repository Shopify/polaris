import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import {
  serializeMdx,
  type SerializedMdx,
} from '../src/components/Markdown/serialize';
import Markdown from '../src/components/Markdown';
import Page from '../src/components/Page';
import StatusBanner from '../src/components/StatusBanner';
import Longform from '../src/components/Longform';
import PageMeta from '../src/components/PageMeta';
import {Status} from '../src/types';
import UpdateBanner from '../src/components/UpdateBanner';

interface FrontMatter {
  title: string;
  noIndex?: boolean;
  status?: Status;
  update?: string;
  description?: string;
}

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  descriptionMdx: SerializedMdx | null;
  editPageLinkPath: string;
}

const CatchAllTemplate = ({
  mdx,
  descriptionMdx,
  editPageLinkPath,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {title, description, update, status, noIndex = false} = mdx.frontmatter;

  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;

  return (
    <Page title={title} editPageLinkPath={editPageLinkPath} isContentPage>
      <PageMeta title={title} description={description} noIndex={noIndex} />
      <Longform>
        {descriptionMdx ? <Markdown {...descriptionMdx} /> : null}
        {typedStatus && <StatusBanner status={typedStatus} />}
        {update && <UpdateBanner message={update} />}
        <Markdown {...mdx} />
      </Longform>
    </Page>
  );
};

const contentDir = 'content';

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug)
    throw new Error('Expected params.slug to be defined (as string[])');

  const slugPath = `${contentDir}/${params.slug.join('/')}`;
  const pathIsDirectory =
    fs.existsSync(slugPath) && fs.lstatSync(slugPath).isDirectory();
  const mdRelativePath = pathIsDirectory
    ? `${contentDir}/${params.slug.join('/')}/index.md`
    : `${contentDir}/${params.slug.join('/')}.md`;
  const mdFilePath = path.resolve(process.cwd(), mdRelativePath);
  const editPageLinkPath = `/polaris.shopify.com/${mdRelativePath}`;

  if (fs.existsSync(mdFilePath)) {
    const markdown = fs.readFileSync(mdFilePath, 'utf-8');

    const mdx = await serializeMdx<FrontMatter>(markdown);

    let descriptionMdx: SerializedMdx | null = null;

    if (mdx.frontmatter.description) {
      descriptionMdx = await serializeMdx(mdx.frontmatter.description);
    }

    const props: Props = {
      mdx,
      descriptionMdx,
      editPageLinkPath,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

const catchAllTemplateExcludeList = [
  '/whats-new',
  '/icons',
  '/foundations',
  '/design',
  '/content',
  '/patterns',
  '/patterns-legacy',
  '/tools',
  '/tokens',
  '/sandbox',
];

function fileShouldNotBeRenderedWithCatchAllTemplate(path: string): boolean {
  return (
    !path.startsWith('/components') &&
    !path.includes('/tools/stylelint-polaris/rules') &&
    // We want to render legacy pages but not new pattern pages.
    !(path.startsWith('/patterns') && !path.startsWith('/patterns-legacy')) &&
    !catchAllTemplateExcludeList.includes(path)
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = [
    path.resolve(process.cwd(), 'content/*.md'),
    path.resolve(process.cwd(), 'content/**/*.md'),
    path.resolve(process.cwd(), 'content/**/**/*.md'),
    path.resolve(process.cwd(), 'content/**/**/**/*.md'),
  ];
  const paths = globby
    .sync(globPath)
    .map((fileName: string) => {
      return fileName
        .replace(`${process.cwd()}/content`, '')
        .replace('/index.md', '')
        .replace('.md', '');
    })
    .filter(fileShouldNotBeRenderedWithCatchAllTemplate);

  return {
    paths,
    fallback: false,
  };
};

export default CatchAllTemplate;
