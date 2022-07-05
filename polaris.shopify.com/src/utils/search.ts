import {
  SearchResults,
  GroupedSearchResults,
  searchResultCategories,
} from "../types";
import { tokens, TokenProperties } from "@shopify/polaris-tokens";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";
import metadata from "@shopify/polaris-icons/metadata";

import components from "../data/components.json";
import foundations from "../data/foundations.json";

const MAX_RESULTS: { [key: string]: number } = {
  Foundations: 3,
  Components: 3,
  Tokens: 5,
  Icons: 14,
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
    category: "Components",
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
    category: "Tokens",
    score: 0,
    url: `/tokens/colors#${tokenName}`,
    meta: {
      Tokens: {
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
        category: "Tokens",
        score: 0,
        url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
        meta: {
          Tokens: {
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
    category: "Icons",
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
    category: "Foundations",
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
    { name: "meta.Foundations.title", weight: 100 },
    { name: "meta.Foundations.excerpt", weight: 50 },

    // Components
    { name: "meta.Components.name", weight: 100 },
    { name: "meta.Components.description", weight: 50 },

    // Tokens
    { name: "meta.Tokens.token.name", weight: 200 },
    { name: "meta.Tokens.token.value", weight: 50 },

    // Icons
    { name: "meta.Icons.icon.fileName", weight: 50 },
    { name: "meta.Icons.icon.name", weight: 50 },
    { name: "meta.Icons.icon.keywords", weight: 20 },
    { name: "meta.Icons.icon.set", weight: 20 },
    { name: "meta.Icons.icon.description", weight: 50 },
  ],
  includeScore: true,
  threshold: 0.5,
  shouldSort: true,
  ignoreLocation: true,
});

export function search(query: string): GroupedSearchResults {
  const groupedResults: GroupedSearchResults = {
    Foundations: { results: [], topScore: 0 },
    Components: { results: [], topScore: 0 },
    Tokens: { results: [], topScore: 0 },
    Icons: { results: [], topScore: 0 },
  };

  if (query.length > 0) {
    const fuseResults = fuse.search(query);

    const scoredResults: SearchResults = fuseResults.map((result) => ({
      ...result.item,
      score: result.score || 0,
    }));

    searchResultCategories.forEach((category) => {
      groupedResults[category].results = scoredResults
        .filter((result) => result.category === category)
        .map((result) => ({ ...result, score: result.score || 0 }))
        .slice(0, MAX_RESULTS[category]);
    });

    searchResultCategories.forEach((category) => {
      groupedResults[category] = {
        ...groupedResults[category],
        topScore:
          groupedResults[category].results.length > 0
            ? groupedResults[category].results[0].score
            : 0,
      };
    });
  }

  return groupedResults;
}
