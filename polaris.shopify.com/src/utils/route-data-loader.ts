import fs from 'fs';
import globby from 'globby';

import {serializeMdx} from '../components/Markdown/serialize';
import type {SerializedMdx} from '../types';
import {FrontMatter} from '../types';
import type {RichCardGridProps} from '../components/RichCardGrid';

export interface Props {
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

// See: https://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript#comment26357861_871646
export const SlugNotFoundError = function () {
  // @ts-expect-error Sshhhh
  this.name = 'SlugNotFoundError';
  // @ts-expect-error Sshhhh
  this.message = message;
} as any as {new (): typeof Error};
SlugNotFoundError.prototype = Object.create(Error.prototype);

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
  const markdownFiles = globby.sync(pathGlob, {onlyFiles: true});

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

export const getStaticProps = async (slug: string[]): Promise<Props> => {
  if (!slug || !Array.isArray(slug)) {
    throw new Error('Expected slug to be defined (as string[])');
  }

  // Always use posix paths which are compatible with all of: windows, *nix,
  // MacOS, and URLs
  const slugPath = [contentDir, ...slug].join('/');

  let pathIsDirectory = false;
  let mdRelativePath = `${slugPath}.mdx`;

  // If this exact markdown file doesn't exist, we'll check for a matching
  // directory name with an index.md file instead
  if (!fs.existsSync(mdRelativePath)) {
    mdRelativePath = `${slugPath}/index.mdx`;
    if (!fs.existsSync(mdRelativePath)) {
      throw new SlugNotFoundError();
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
      () => pathIsDirectory && slug.length === 1 && slug[0] === 'patterns',
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
      () => pathIsDirectory && slug.length === 1 && slug[0] === 'components',
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
      () => pathIsDirectory && slug[0] === 'design',
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

  return {
    mdx,
    seoDescription,
    editPageLinkPath,
    isContentPage: !pathIsDirectory,
    showTOC: mdx.frontmatter.showTOC || false,
    collapsibleTOC: mdx.frontmatter.collapsibleTOC || false,
  };
};

const catchAllTemplateExcludeList = [
  '/icons',
  '/tokens',
  '/sandbox',
  '/tools/stylelint-polaris/rules',
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

export const getStaticPaths = (): string[] => {
  return (
    globby
      // Recursive search for all markdown files (globby requires posix paths)
      // Note: files prefixed with an underscore are ignored
      .sync(`${contentDir}/**/!(_)*.mdx`)
      .map(extractSlugFromPath)
      .filter(fileShouldNotBeRenderedWithCatchAllTemplate)
  );
};
