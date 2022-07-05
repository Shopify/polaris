import {
  SearchResults,
  GroupedSearchResults,
  searchResultCategories,
  SearchResultCategory,
} from "../types";
import { tokens, TokenProperties } from "@shopify/polaris-tokens";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";
import metadata from "@shopify/polaris-icons/metadata";

import components from "../data/components.json";
import foundations from "../data/foundations.json";

const MAX_RESULTS: { [key in SearchResultCategory]: number } = {
  foundations: 3,
  components: 3,
  tokens: 5,
  icons: 14,
};

const {
  colorSchemes: { light: colorLight },
  depth,
  motion,
  shape,
  spacing,
  typography,
  zIndex,
} = tokens;

let results: SearchResults = [];

// Add components
components.forEach(({ frontMatter: { name, status }, intro }) => {
  results.push({
    id: slugify(name),
    category: "components",
    score: 0,
    url: `/components/${slugify(name)}`,
    meta: {
      Components: {
        name,
        description: stripMarkdownLinks(intro),
        status,
      },
    },
  });
});

// Add color tokens
Object.entries(colorLight).forEach(([tokenName, tokenValue]) => {
  results.push({
    id: slugify(tokenName),
    category: "tokens",
    score: 0,
    url: `/tokens/colors#${tokenName}`,
    meta: {
      Tokens: {
        category: "colors",
        token: {
          name: tokenName,
          description: tokenValue.description || "",
          value: tokenValue.value,
        },
      },
    },
  });
});

// Add other tokens
const otherTokenGroups = { depth, motion, shape, spacing, typography, zIndex };
Object.entries(otherTokenGroups).forEach(([groupSlug, tokenGroup]) => {
  Object.entries(tokenGroup).forEach(
    ([tokenName, tokenProperties]: [string, TokenProperties]) => {
      results.push({
        id: slugify(tokenName),
        category: "tokens",
        score: 0,
        url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
        meta: {
          Tokens: {
            category: groupSlug,
            token: {
              name: tokenName,
              description: tokenProperties.description || "",
              value: tokenProperties.value,
            },
          },
        },
      });
    }
  );
});

// Add icons
Object.keys(metadata).forEach((fileName) => {
  const { name, set, description, keywords } = metadata[fileName];
  results.push({
    id: slugify(fileName),
    category: "icons",
    url: `/icons?icon=${fileName}`,
    score: 0,
    meta: {
      Icons: {
        icon: { fileName, keywords, name, description, set },
      },
    },
  });
});

// Add foundations
foundations.forEach(({ frontMatter: { name }, intro, section }) => {
  const url = `/foundations/${section}/${slugify(name)}`;

  results.push({
    id: slugify(name),
    category: "foundations",
    score: 0,
    url,
    meta: {
      Foundations: {
        title: name,
        excerpt: intro,
      },
    },
  });
});

const fuse = new Fuse(results, {
  keys: [
    // Foundations
    { name: "meta.foundations.title", weight: 100 },
    { name: "meta.foundations.excerpt", weight: 50 },

    // Components
    { name: "meta.components.name", weight: 100 },
    { name: "meta.components.description", weight: 50 },

    // Tokens
    { name: "meta.tokens.token.name", weight: 200 },
    { name: "meta.tokens.token.value", weight: 50 },

    // Icons
    { name: "meta.icons.icon.fileName", weight: 50 },
    { name: "meta.icons.icon.name", weight: 50 },
    { name: "meta.icons.icon.keywords", weight: 20 },
    { name: "meta.icons.icon.set", weight: 20 },
    { name: "meta.icons.icon.description", weight: 50 },
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
          .map((result) => ({ ...result, score: result.score || 0 }))
          .slice(0, MAX_RESULTS[category]),
      });
    });

    groupedResults.sort((a, b) => a.results[0].score - b.results[0].score);
  }

  return groupedResults;
}
