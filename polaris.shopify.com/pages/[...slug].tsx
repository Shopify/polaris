import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import fs from 'fs';
import globby from 'globby';

import {serializeMdx} from '../src/components/Markdown/serialize';
import Markdown from '../src/components/Markdown';
import Page from '../src/components/Page';
import PageMeta from '../src/components/PageMeta';
import type {Status, SerializedMdx} from '../src/types';
import {parseMarkdown} from '../src/utils/markdown.mjs';
import {MarkdownFile} from '../src/types';
import type {RichCardGridProps} from '../src/components/RichCardGrid';

type FrontMatter = {
  title: string;
  noIndex?: boolean;
  status?: Status;
  update?: string;
  seoDescription?: string;
  order?: number;
};

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  seoDescription?: string;
  editPageLinkPath: string;
  isContentPage: boolean;
}

interface SortedRichCardGridProps extends RichCardGridProps {
  order: number;
}

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
      <Markdown
        {...mdx}
        components={{
          // @ts-expect-error Dunno how to narrow this type any further ¯\_(ツ)_/¯
          PresentTenseVerb: ({children}: {children: string}) =>
            `${children.slice(-1) === 's' ? 'are' : 'is'}`,
          StylelintResourceLink,
        }}
      />
    </Page>
  );
};

const DEFAULT_SORT_ORDER = 1000;
const contentDir = 'content';

// Grab only the portion of the filepath which is used in the URL into capture
// group $1.
// Examples here: https://regex101.com/r/y3VciS/1
const slugExtracter = new RegExp(`^${contentDir}/(.*?)(/index)?\.md$`);

const extractSlugFromPath = (filePath: string) =>
  filePath.replace(slugExtracter, '/$1');

// NOTE: globby uses minimatch which only accepts posix paths
const getRichCards = (pathGlob: string): RichCardGridProps[] => {
  const markdownFiles = globby.sync(pathGlob, {onlyFiles: true});

  return (
    markdownFiles
      .map((markdownFilePath): SortedRichCardGridProps => {
        // NOTE: `markdownFilePath` will be in posix format from globby (fast-glob internally)
        const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
        // TODO: Replace with simpler frontmatter parsing / same frontmatter parser
        // from next-mdx-remote to keep it consistent
        const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
        const {
          title = null,
          description = null,
          // Default to the markdown file path, but allow overrides
          url = extractSlugFromPath(markdownFilePath),
          previewImg = null,
          draft = null,
          status = null,
          icon = null,
          order,
          featured = null,
        } = frontMatter;
        return {
          title,
          description,
          url,
          previewImg,
          draft,
          status,
          icon,
          featured,
          // Ensure pages with a defined order come first. Everything else gets
          // puntted to the end
          order: isNaN(parseInt(order)) ? DEFAULT_SORT_ORDER : order,
        };
      })
      // Don't show 'draft' posts in prod/staging, but show them everywhere else
      .filter(({draft}) => process.env.NODE_ENV !== 'production' || !draft)
      .sort(
        (a, b) =>
          // Sort by defined order first
          a.order - b.order ||
          // Then fallback to alphabetical sorting
          a.title.localeCompare(b.title),
      )
  );
};

type MiddlewareHandler =
  | ((end: () => void) => void | Promise<void>)
  | ((end: () => void) => Promise<void>);
type Middleware =
  | MiddlewareHandler
  | [(() => boolean) | (() => Promise<boolean>), MiddlewareHandler];

// Simple middleware-like processor
const middleware = async (wares: Middleware[]) => {
  let index = -1;

  const end = () => {
    // If 'end' is called, skip to the end of the array, thereby ending the
    // while loop early
    index = wares.length;
  };

  while (++index < wares.length) {
    const middle = wares[index];
    if (Array.isArray(middle)) {
      if (await middle[0]()) {
        await middle[1](end);
      }
    } else {
      await middle(end);
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

  let pathIsDirectory = false;
  let mdRelativePath = `${slugPath}.md`;

  // If this exact markdown file doesn't exist, we'll check for a matching
  // directory name with an index.md file instead
  if (!fs.existsSync(mdRelativePath)) {
    mdRelativePath = `${slugPath}/index.md`;
    if (!fs.existsSync(mdRelativePath)) {
      return {notFound: true};
    }
    pathIsDirectory = true;
  }

  const mdAbsolutePath = [process.cwd(), mdRelativePath].join('/');
  const editPageLinkPath = `/polaris.shopify.com/${mdRelativePath}`;

  const scope: Record<string, any> = {};

  await middleware([
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

  const [mdx, data] = await serializeMdx<FrontMatter>(mdAbsolutePath, {
    scope,
    load: (filePath) => fs.readFileSync(filePath, 'utf-8'),
  });

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
  '/tokens',
  '/sandbox',
  '/tools/stylelint-polaris/rules',
];

function fileShouldNotBeRenderedWithCatchAllTemplate(
  filePath: string,
): boolean {
  return (
    !filePath.startsWith('/components') &&
    // We want to render legacy pages & patterns index page, but not new pattern details pages.
    !filePath.startsWith('/patterns/') &&
    !catchAllTemplateExcludeList.includes(filePath)
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = globby
    // Recursive search for all markdown files (globby requires posix paths)
    // Note: files prefixed with an underscore are ignored
    .sync(`${contentDir}/**/!(_)*.md`)
    .map(extractSlugFromPath)
    .filter(fileShouldNotBeRenderedWithCatchAllTemplate);

  return {
    paths,
    fallback: false,
  };
};

export default CatchAllTemplate;
