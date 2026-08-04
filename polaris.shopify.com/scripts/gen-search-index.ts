import path from 'path';
import {mkdir, writeFile} from 'fs/promises';

import {metaThemeDefault, MetaTokenProperties} from '@shopify/polaris-tokens';
import iconMetadata from '@shopify/polaris-icons/metadata';
import ora from 'ora';

import pages from '../.cache/site';
import {
  SearchResults,
  SearchResultCategory,
  FoundationsCategory,
  Status,
  PatternFrontMatter,
  FrontMatter,
} from '../src/types';
import {slugify, stripMarkdownLinks} from '../src/utils/various';

/**
 * Builds the corpus the site search runs against.
 *
 * This is the body of the old `/api/search/v0` route, minus the query handling.
 * A static export has no API routes, so the corpus is written to
 * `public/search-index.json` at build time and Fuse runs in the browser
 * instead. See `src/utils/search.ts` for the query half.
 */
const searchablePages = Object.fromEntries(
  Object.entries(pages).filter(
    ([, {frontMatter}]) => !(frontMatter as FrontMatter).noIndex,
  ),
);

const slugsStartingWith = (...prefixes: string[]) =>
  Object.keys(searchablePages).filter((slug) =>
    prefixes.some((prefix) => slug.startsWith(prefix)),
  );

const buildSearchIndex = (): SearchResults => {
  const results: SearchResults = [];

  // Add components
  slugsStartingWith('/components/').forEach((slug) => {
    const {
      status,
      title,
      description = '',
      category = '',
      internalOnly,
    } = searchablePages[slug].frontMatter as FrontMatter;

    if (internalOnly) return;

    const url = category
      ? `/components/${slugify(category)}/${slugify(title)}`
      : `/components/${slugify(title)}`;

    results.push({
      id: slugify(`components ${title}`),
      category: 'components' as SearchResultCategory,
      score: 0,
      url,
      meta: {
        components: {
          title,
          description: stripMarkdownLinks(description),
          status: status as Status,
          group: slugify(category),
        },
      },
    });
  });

  // Add tokens
  const {color, border, font, motion, shadow, space, zIndex} = metaThemeDefault;
  const tokenGroups = {color, border, font, motion, shadow, space, zIndex};

  Object.entries(tokenGroups).forEach(([groupSlug, tokenGroup]) => {
    Object.entries(tokenGroup).forEach(
      ([tokenName, tokenProperties]: [string, MetaTokenProperties]) => {
        results.push({
          id: slugify(`tokens ${tokenName}`),
          category: 'tokens',
          score: 0,
          url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
          meta: {
            tokens: {
              category: groupSlug,
              token: {
                name: tokenName,
                description: tokenProperties.description || '',
                value: tokenProperties.value,
              },
            },
          },
        });
      },
    );
  });

  // Add icons
  Object.keys(iconMetadata).forEach((fileName) => {
    results.push({
      id: slugify(`icons ${fileName}`),
      category: 'icons',
      url: `/icons?icon=${fileName}`,
      score: 0,
      meta: {icons: {icon: iconMetadata[fileName]}},
    });
  });

  // Add foundations
  slugsStartingWith('/foundations/', '/design/', '/content/').forEach(
    (slug) => {
      const {
        title,
        icon = '',
        description = '',
      } = searchablePages[slug].frontMatter as FrontMatter;
      const category = slug.split('/')[1].toLowerCase() as FoundationsCategory;

      results.push({
        id: slugify(`foundations ${title}`),
        category: 'foundations',
        score: 0,
        url: slug,
        meta: {
          foundations: {title, icon, description, category: category || ''},
        },
      });
    },
  );

  // Add patterns
  slugsStartingWith('/patterns/').forEach((slug) => {
    const {
      title,
      description = '',
      previewImg,
    } = searchablePages[slug].frontMatter as PatternFrontMatter;

    results.push({
      id: slugify(`pattern ${title}`),
      category: 'patterns',
      score: 0,
      url: slug,
      meta: {patterns: {title, description, previewImg}},
    });
  });

  return results;
};

const genSearchIndex = async () => {
  const spinner = ora('Generating public/search-index.json').start();

  const index = buildSearchIndex();
  const outputFile = path.join(process.cwd(), 'public', 'search-index.json');

  await mkdir(path.dirname(outputFile), {recursive: true});
  await writeFile(outputFile, JSON.stringify(index), 'utf-8');

  spinner.succeed(
    `Generated public/search-index.json (${index.length} entries)`,
  );
};

export default genSearchIndex;
