import type {NextApiRequest, NextApiResponse} from 'next';
import Fuse from 'fuse.js';
import {metadata, MetadataProperties} from '@shopify/polaris-tokens';
import iconMetadata from '@shopify/polaris-icons/metadata';
import {content} from '../../../../src/content';
import {
  SearchResults,
  GroupedSearchResults,
  searchResultCategories,
  SearchResultCategory,
} from '../../../../src/types';
import {slugify} from '../../../../src/utils/various';
import {
  getPageUrl,
  getResolvedPage,
} from '../../../../src/components/Editor/utils';

const MAX_RESULTS: {[key in SearchResultCategory]: number} = {
  foundations: 8,
  components: 6,
  patterns: 6,
  tokens: 5,
  icons: 9,
};

const getSearchResults = (query?: string) => {
  if (query == null || query?.length === 0) return [];

  let results: SearchResults = [];

  // Add components
  const componentsPage = content.pages.find(
    (page) => page.parentId === null && page.slug === 'components',
  );
  if (componentsPage) {
    const componentGroupIds = content.pages
      .filter(({parentId}) => parentId === componentsPage.id)
      .map(({id}) => id);

    content.pages
      .filter(({parentId}) => parentId && componentGroupIds.includes(parentId))
      .forEach((page) => {
        const {id} = page;
        const resolvedPage = getResolvedPage(content, page);

        results.push({
          id,
          category: 'components',
          score: 0,
          url: resolvedPage.url,
          meta: {
            components: resolvedPage,
          },
        });
      });
  }

  const {colors, depth, font, motion, shape, spacing, zIndex} = metadata;
  const tokenGroups = {
    colors,
    depth,
    font,
    motion,
    shape,
    spacing,
    zIndex,
  };

  Object.entries(tokenGroups).forEach(([groupSlug, tokenGroup]) => {
    Object.entries(tokenGroup).forEach(
      ([tokenName, tokenProperties]: [string, MetadataProperties]) => {
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
      id: slugify(`icons ${fileName} ${iconMetadata[fileName].set}`),
      category: 'icons',
      url: `/icons?icon=${fileName}`,
      score: 0,
      meta: {
        icons: {
          icon: iconMetadata[fileName],
        },
      },
    });
  });

  // Add foundations
  const foundationSlugs = ['foundations', 'design', 'content'];
  const foundationsPageIds = content.pages
    .filter(
      ({parentId, slug}) => parentId === null && foundationSlugs.includes(slug),
    )
    .map(({id}) => id);

  content.pages
    .filter(({parentId}) => parentId && foundationsPageIds.includes(parentId))
    .forEach((page) => {
      const {id, pageMeta} = page;
      if (pageMeta?.type !== 'foundations') return;
      const resolvedPage = getResolvedPage(content, page);

      results.push({
        id,
        category: 'foundations',
        score: 0,
        url: resolvedPage.url,
        meta: {
          foundations: resolvedPage,
        },
      });
    });

  const patternsPage = content.pages.find(
    ({parentId, slug}) => parentId === null && slug === 'patterns',
  );

  if (patternsPage) {
    content.pages
      .filter(({parentId}) => parentId === patternsPage.id)
      .forEach((page) => {
        const {id} = page;
        const url = getPageUrl(content, page);
        const resolvedPage = getResolvedPage(content, page);

        results.push({
          id,
          category: 'patterns',
          score: 0,
          url,
          meta: {
            patterns: resolvedPage,
          },
        });
      });
  }

  const fuse = new Fuse(results, {
    keys: [
      // Foundations
      {name: 'meta.foundations.title', weight: 100},
      {name: 'meta.foundations.description', weight: 50},

      // Patterns
      {name: 'meta.patterns.title', weight: 100},
      {name: 'meta.patterns.description', weight: 50},

      // Components
      {name: 'meta.components.title', weight: 100},
      {name: 'meta.components.description', weight: 50},

      // Tokens
      {name: 'meta.tokens.token.name', weight: 200},
      {name: 'meta.tokens.token.value', weight: 50},

      // Icons
      {name: 'meta.icons.icon.fileName', weight: 50},
      {name: 'meta.icons.icon.name', weight: 50},
      {name: 'meta.icons.icon.keywords', weight: 20},
      {name: 'meta.icons.icon.set', weight: 20},
      {name: 'meta.icons.icon.description', weight: 50},
    ],
    includeScore: true,
    threshold: 0.5,
    shouldSort: true,
    ignoreLocation: true,
  });

  const groupedResults: GroupedSearchResults = [];

  const fuseResults = fuse.search(query);

  const scoredResults: SearchResults = fuseResults.map((result) => ({
    ...result.item,
    score: result.score || 0,
  }));

  searchResultCategories.forEach((category) => {
    groupedResults.push({
      category,
      results: scoredResults
        .filter((result) => result.category === category)
        .map((result) => ({...result, score: result.score || 0}))
        .slice(0, MAX_RESULTS[category]),
    });
  });

  groupedResults.sort(
    (a, b) => (a.results[0]?.score || 0) - (b.results[0]?.score || 0),
  );

  return groupedResults;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = Array.isArray(req.query.q)
    ? req.query.q.join(' ')
    : req.query.q;

  const results = {results: getSearchResults(query)};
  res.status(200).json(results);
};

export default handler;
