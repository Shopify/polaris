import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Page from '../src/components/Page';
import StatusBanner from '../src/components/StatusBanner';
import Longform from '../src/components/Longform';
import Markdown from '../src/components/Markdown';
import PageMeta from '../src/components/PageMeta';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile, Status} from '../src/types';
import UpdateBanner from '../src/components/UpdateBanner';

interface Props {
  readme: MarkdownFile['readme'];
  title: string;
  noIndex?: boolean;
  status?: Status;
  update?: string;
  description?: string;
  editPageLinkPath: string;
}

const CatchAllTemplate: NextPage<Props> = ({
  readme,
  title,
  status,
  noIndex,
  description,
  editPageLinkPath,
  update,
}: Props) => {
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
        {description ? <Markdown>{description}</Markdown> : null}
        {typedStatus && <StatusBanner status={typedStatus} />}
        {update && <UpdateBanner message={update} />}
        <Markdown>{readme}</Markdown>
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
    const {readme, frontMatter}: MarkdownFile = parseMarkdown(markdown);
    const {title, description, update, status, noIndex} = frontMatter;
    const props: Props = {
      title,
      status: status || null,
      description: description || null,
      update: update || null,
      readme,
      noIndex: noIndex || false,
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
