import {
  SearchResults,
  GroupedSearchResults,
  searchResultCategories,
  SearchResultCategory,
  Status,
} from '../types';
import {tokens, TokenProperties} from '@shopify/polaris-tokens';
import Fuse from 'fuse.js';
import {slugify, stripMarkdownLinks} from './various';
import metadata from '@shopify/polaris-icons/metadata';

import components from '../data/components.json';
import foundations from '../data/foundations.json';

const iconMetadata = metadata;

const MAX_RESULTS: {[key in SearchResultCategory]: number} = {
  foundations: 8,
  components: 6,
  tokens: 5,
  icons: 9,
};

const {
  colorSchemes: {light: colorLight},
  depth,
  motion,
  shape,
  spacing,
  typography,
  zIndex,
} = tokens;

let results: SearchResults = [];

// Add components
components.forEach(({frontMatter: {title, status}, description}) => {
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;

  results.push({
    id: slugify(`components ${title}`),
    category: 'components',
    score: 0,
    url: `/components/${slugify(title)}`,
    meta: {
      components: {
        title,
        description: stripMarkdownLinks(description),
        status: typedStatus,
      },
    },
  });
});

// Add color tokens
Object.entries(colorLight).forEach(([tokenName, tokenValue]) => {
  results.push({
    id: slugify(`tokens ${tokenName}`),
    category: 'tokens',
    score: 0,
    url: `/tokens/colors#${tokenName}`,
    meta: {
      tokens: {
        category: 'colors',
        token: {
          name: tokenName,
          description: tokenValue.description || '',
          value: tokenValue.value,
        },
      },
    },
  });
});

// Add other tokens
const otherTokenGroups = {depth, motion, shape, spacing, typography, zIndex};
Object.entries(otherTokenGroups).forEach(([groupSlug, tokenGroup]) => {
  Object.entries(tokenGroup).forEach(
    ([tokenName, tokenProperties]: [string, TokenProperties]) => {
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
foundations.forEach((data) => {
  const {title, icon} = data.frontMatter;
  const {description, category} = data;
  const url = `/foundations/${category}/${slugify(title)}`;

  results.push({
    id: slugify(`foundations ${title}`),
    category: 'foundations',
    score: 0,
    url,
    meta: {
      foundations: {
        title,
        icon: icon || '',
        description,
        category: category || '',
      },
    },
  });
});

const fuse = new Fuse(results, {
  keys: [
    // Foundations
    {name: 'meta.foundations.title', weight: 100},
    {name: 'meta.foundations.description', weight: 50},

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

export function search(query: string): GroupedSearchResults {
  const groupedResults: GroupedSearchResults = [];

  if (query.length > 0) {
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
  }

  return groupedResults;
}
