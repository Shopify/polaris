import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import fs from 'fs';
import {globbySync} from 'globby';
import {metaThemeDefault as tokenGroups} from '@shopify/polaris-tokens';
import mapValues from 'lodash.mapvalues';

import {serializeMdx} from '../src/components/Markdown/serialize';
import Markdown from '../src/components/Markdown';
import Page from '../src/components/Page';
import PageMeta from '../src/components/PageMeta';
import type {SerializedMdx} from '../src/types';
import {FrontMatter} from '../src/types';
import type {RichCardGridProps} from '../src/components/RichCardGrid';

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  seoDescription?: string;
  editPageLinkPath: string;
  isContentPage: boolean;
  showTOC?: boolean;
  collapsibleTOC?: boolean;
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
          Polaris <Link href="/components/typography/text">text component</Link>
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
  showTOC,
  collapsibleTOC,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {title, noIndex = false} = mdx.frontmatter;

  return (
    <Page
      editPageLinkPath={editPageLinkPath}
      isContentPage={isContentPage}
      showTOC={showTOC}
      collapsibleTOC={collapsibleTOC}
    >
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
const slugExtracter = new RegExp(`^${contentDir}/(.*?)(/index)?\.mdx$`);

const extractSlugFromPath = (filePath: string) =>
  filePath.replace(slugExtracter, '/$1');

function makeSerializable<T extends Record<string, any> = Record<string, any>>(
  obj: T,
): T {
  return Object.entries(obj).reduce((memo, [key, value]) => {
    if (value != null) {
      // @ts-expect-error SShhuussshhh
      memo[key] = value;
    }
    return memo;
  }, {} as T);
}

// NOTE: globby uses minimatch which only accepts posix paths
const getRichCards = async (
  pathGlob: string,
): Promise<SortedRichCardGridProps[]> => {
  const markdownFiles = globbySync(pathGlob, {onlyFiles: true});

  return (
    (
      await Promise.all(
        markdownFiles.map(
          async (markdownFilePath): Promise<SortedRichCardGridProps> => {
            // NOTE: `markdownFilePath` will be in posix format from globby (fast-glob internally)
            const mdAbsolutePath = [process.cwd(), markdownFilePath].join('/');
            const [{frontmatter}, data] = await serializeMdx<FrontMatter>(
              mdAbsolutePath,
              {
                load: (filePath) => fs.readFileSync(filePath, 'utf-8'),
              },
            );

            return makeSerializable({
              // Set defaults
              ...{
                url: extractSlugFromPath(markdownFilePath),
                description: data.firstParagraph as string,
              },
              // Set data from frontmatter, overriding defaults if set
              ...frontmatter,
              // Set a default sort order when not set / not a number.
              // Casting to a string because despite what we write in our types, the
              // YAML parser could return _absolutely anything_ in this field.
              ...(isNaN(parseInt(frontmatter.order as unknown as string)) && {
                order: DEFAULT_SORT_ORDER,
              }),
            } as SortedRichCardGridProps);
          },
        ),
      )
    )
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
  let mdRelativePath = `${slugPath}.mdx`;

  // If this exact markdown file doesn't exist, we'll check for a matching
  // directory name with an index.md file instead
  if (!fs.existsSync(mdRelativePath)) {
    mdRelativePath = `${slugPath}/index.mdx`;
    if (!fs.existsSync(mdRelativePath)) {
      return {notFound: true};
    }
    pathIsDirectory = true;
  }

  const mdAbsolutePath = [process.cwd(), mdRelativePath].join('/');
  const editPageLinkPath = `/polaris.shopify.com/${mdRelativePath}`;

  /**
   * scope is passed to the MDX renderer component. The properties
   * of scope are available in markdown .md files to use.
   */
  const scope: Record<string, any> = {};

  await middleware([
    // patterns page needs to know the legacy files also
    [
      () =>
        pathIsDirectory &&
        params.slug.length === 1 &&
        params.slug[0] === 'patterns',
      async (end) => {
        scope.posts = await getRichCards(`${slugPath}/*/index.mdx`);
        scope.legacyPatternPosts = await getRichCards(
          `${contentDir}/patterns-legacy/!(index|_*).mdx`,
        );
        end();
      },
    ],
    // component index page needs to know all of the nested components
    [
      () =>
        pathIsDirectory &&
        params.slug.length === 1 &&
        params.slug[0] === 'components',
      async (end) => {
        // Get the groups
        scope.posts = await getRichCards(`${slugPath}/*/index.mdx`);

        // Get the components for each group
        scope.posts = await Promise.all(
          scope.posts.map(async (group: SortedRichCardGridProps) => ({
            ...group,
            children: await getRichCards(
              `${contentDir}${group.url}/!(index|_*).mdx`,
            ),
          })),
        );

        // Don't process any more middlewares
        end();
      },
    ],
    [
      // design pages need top-level index.md pages in correct order
      () => pathIsDirectory && params.slug[0] === 'design',
      async (end) => {
        // Non-recursive search for .md files except index.md
        scope.posts = await getRichCards(`${slugPath}/!(index|_*).mdx`);
        scope.posts = [
          ...scope.posts,
          ...(await getRichCards(`${slugPath}/*/index.mdx`)),
        ];
        scope.posts.sort(
          (a: SortedRichCardGridProps, b: SortedRichCardGridProps) => {
            return a.order > b.order ? 1 : -1;
          },
        );
        end();
      },
    ],
    [
      // token pages need token info
      () => !pathIsDirectory && params.slug[0] === 'tokens',
      async (end) => {
        // Flatten each group to an array of objects
        const tokenGroupObjects = mapValues(tokenGroups, (tokens) =>
          Object.entries(tokens).map(([name, value]) => ({name, ...value})),
        );
        scope.tokens = tokenGroupObjects;
        end();
      },
    ],
    // index pages need to know the files in their folder
    [
      () => pathIsDirectory,
      async () => {
        // Non-recursive search for .md files except index.md
        scope.posts = await getRichCards(`${slugPath}/!(index|_*).mdx`);
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

  const isContentPage = !pathIsDirectory;

  const props: Props = {
    mdx,
    seoDescription,
    editPageLinkPath,
    isContentPage,
    showTOC: mdx.frontmatter.showTOC ?? isContentPage,
    collapsibleTOC: mdx.frontmatter.collapsibleTOC || false,
  };

  return {props};
};

const catchAllTemplateExcludeList = [
  '/icons',
  '/sandbox',
  '/tools/stylelint-polaris/rules',
  '/coming-soon',
];

// We want to render component index & group pages, but not the individual
// compoments.
const componentButNotIndexRegex = /\/components\/.+?\/.+?$/;

function fileShouldNotBeRenderedWithCatchAllTemplate(
  filePath: string,
): boolean {
  return (
    !componentButNotIndexRegex.test(filePath) &&
    // We want to render legacy pages & patterns index page, but not new pattern details pages.
    !filePath.startsWith('/patterns/') &&
    !catchAllTemplateExcludeList.includes(filePath)
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Recursive search for all markdown files (globby requires posix paths)
  // Note: files prefixed with an underscore are ignored
  const paths = globbySync(`${contentDir}/**/!(_)*.mdx`)
    .map(extractSlugFromPath)
    .filter(fileShouldNotBeRenderedWithCatchAllTemplate);

  return {
    paths,
    fallback: false,
  };
};

export default CatchAllTemplate;
