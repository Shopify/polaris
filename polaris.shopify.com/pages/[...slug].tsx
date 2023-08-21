import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import fs from 'fs';
import globby from 'globby';

import {
  serializeMdx,
  type SerializedMdx,
} from '../src/components/Markdown/serialize';
import Markdown from '../src/components/Markdown';
import Page from '../src/components/Page';
import PageMeta from '../src/components/PageMeta';
import {Status} from '../src/types';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile} from '../src/types';

interface FrontMatter {
  title: string;
  noIndex?: boolean;
  status?: Status;
  update?: string;
  seoDescription?: string;
}

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  seoDescription?: string;
  editPageLinkPath: string;
  isContentPage: boolean;
}

export type RichCardGridProps = {
  title: string;
  description: string;
  /* url is usually derived from the file path, but can be overwritten here */
  url?: string;
  previewImg?: string;
  draft?: boolean;
  status?: Status;
  icon?: string;
}[];

const CatchAllTemplate = ({
  mdx,
  seoDescription,
  editPageLinkPath,
  isContentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {title, noIndex = false} = mdx.frontmatter;

  return (
    <Page editPageLinkPath={editPageLinkPath} isContentPage={isContentPage}>
      <PageMeta title={title} description={seoDescription} noIndex={noIndex} />
      <Markdown {...mdx} />
    </Page>
  );
};

const contentDir = 'content';

// Grab only the portion of the filepath which is used in the URL into capture
// group $1.
// Examples here: https://regex101.com/r/y3VciS/1
const slugExtracter = new RegExp(`^${contentDir}/(.*?)(/index)?\.md$`);

const extractSlugFromPath = (filePath: string) =>
  filePath.replace(slugExtracter, '/$1');

// NOTE: globby uses minimatch which only accepts posix paths
const getRichCards = (pathGlob: string): RichCardGridProps => {
  const markdownFiles = globby
    .sync(pathGlob, {onlyFiles: true})
    // TODO: How do we define different sort orders? In the frontmatter of the
    // index page perhaps?
    .sort((a, b) => a.localeCompare(b));

  return (
    markdownFiles
      .map((markdownFilePath) => {
        // NOTE: `markdownFilePath` will be in posix format from globby (fast-glob internally)
        const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
        // TODO: Replace with simpler frontmatter parsing / same frontmatter parser
        // from next-mdx-remote to keep it consistent
        const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
        const {
          title = null,
          description = null,
          url = extractSlugFromPath(markdownFilePath),
          previewImg = null,
          draft = null,
          status = null,
          icon = null,
        } = frontMatter;
        return {title, description, url, previewImg, draft, status, icon};
      })
      // Don't show 'draft' posts in prod/staging, but show them everywhere else
      .filter(({draft}) => process.env.NODE_ENV !== 'production' || !draft)
  );
};

type MiddlewareHandler = (end: () => void) => void;
type Middleware = MiddlewareHandler | [() => boolean, MiddlewareHandler];

// Simple middleware-like processor
const middleware = (wares: Middleware[]) => {
  let index = -1;

  const end = () => {
    // If 'end' is called, skip to the end of the array, thereby ending the
    // while loop early
    index = wares.length;
  };

  while (++index < wares.length) {
    const middle = wares[index];
    if (Array.isArray(middle)) {
      if (middle[0]()) {
        middle[1](end);
      }
    } else {
      middle(end);
    }
  }
};

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug || !Array.isArray(slug)) {
    throw new Error('Expected params.slug to be defined (as string[])');
  }

  // Always use posix paths which are compatible with all of: windows, *nix,
  // MacOS, and URLs
  const slugPath = [contentDir, ...params.slug].join('/');

  const pathIsDirectory =
    fs.existsSync(slugPath) && fs.lstatSync(slugPath).isDirectory();

  const mdRelativePath = pathIsDirectory
    ? `${slugPath}/index.md`
    : `${slugPath}.md`;

  const editPageLinkPath = `/polaris.shopify.com/${mdRelativePath}`;

  if (!fs.existsSync(mdRelativePath)) {
    return {notFound: true};
  }

  const markdown = fs.readFileSync(mdRelativePath, 'utf-8');

  const scope: Record<string, any> = {};

  middleware([
    // patterns page needs to know the legacy files also
    [
      () =>
        pathIsDirectory &&
        params.slug.length === 1 &&
        params.slug[0] === 'patterns',
      (end) => {
        scope.posts = getRichCards(`${slugPath}/*/index.md`);
        scope.legacyPatternPosts = getRichCards(
          `${contentDir}/patterns-legacy/!(index).md`,
        );
        end();
      },
    ],
    // index pages need to know the files in their folder
    [
      () => pathIsDirectory,
      () => {
        // Non-recursive search for .md files except index.md
        scope.posts = getRichCards(`${slugPath}/!(index).md`);
      },
    ],
  ]);

  const [mdx, data] = await serializeMdx<FrontMatter>(markdown, {scope});

  const seoDescription =
    typeof mdx.frontmatter.seoDescription === 'string'
      ? mdx.frontmatter.seoDescription
      : (data.firstParagraph as string) ?? null;

  const props: Props = {
    mdx,
    seoDescription,
    editPageLinkPath,
    isContentPage: !pathIsDirectory,
  };

  return {props};
};

const catchAllTemplateExcludeList = [
  '/icons',
  '/foundations',
  '/design',
  '/content',
  '/tools',
  '/tokens',
  '/sandbox',
  '/new-design-language',
];

function fileShouldNotBeRenderedWithCatchAllTemplate(
  filePath: string,
): boolean {
  return (
    !filePath.startsWith('/components') &&
    !filePath.includes('/tools/stylelint-polaris/rules') &&
    // We want to render legacy pages & patterns index page, but not new pattern details pages.
    !filePath.startsWith('/patterns/') &&
    !catchAllTemplateExcludeList.includes(filePath)
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = globby
    // Recursive search for all markdown files (globby requires posix paths)
    .sync(`${contentDir}/**/*.md`)
    .map(extractSlugFromPath)
    .filter(fileShouldNotBeRenderedWithCatchAllTemplate);

  return {
    paths,
    fallback: false,
  };
};

export default CatchAllTemplate;
