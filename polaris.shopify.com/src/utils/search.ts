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
  foundations: 6,
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
      components: {
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
      tokens: {
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
          tokens: {
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
      icons: {
        icon: { fileName, keywords, name, description, set },
      },
    },
  });
});

// Add foundations
foundations.forEach(({ frontMatter: { name }, intro, category, content }) => {
  const url = `/foundations/${category}/${slugify(name)}`;

  results.push({
    id: slugify(name),
    category: "foundations",
    score: 0,
    url,
    meta: {
      foundations: {
        title: name,
        excerpt: intro,
        category,
        content,
      },
    },
  });
});

const fuse = new Fuse(results, {
  keys: [
    // Foundations
    { name: "meta.foundations.title", weight: 100 },
    { name: "meta.foundations.excerpt", weight: 50 },
    { name: "meta.foundations.content", weight: 100 },

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
  threshold: 0.015,
  shouldSort: true,
  ignoreLocation: true,
  minMatchCharLength: 3,
  distance: 0,
  ignoreFieldNorm: true,
});

export function search(query: string): GroupedSearchResults {
  const groupedResults: GroupedSearchResults = [];

  if (query.length > 0) {
    const fuseResults = fuse.search(query);

    const scoredResults = fuseResults.map((result) => ({
      ...result.item,
      matches: result.matches,
      score: result.score || 0,
    }));

    searchResultCategories.forEach((category) => {
      groupedResults.push({
        category,
        results: scoredResults
          .filter((result) => result.category === category)
          .map((result) => {
            if (category === "foundations") {
              const content = result.meta.foundations?.content;
              if (content) {
                const regex = new RegExp(query, "gi");

                let matchez = Array.from(content.matchAll(regex));
                if (matchez.length > 0) {
                  const match = matchez[0];
                  if (match.index) {
                    const resultExcerpt = `${content
                      .slice(match.index - 20, match.index + query.length + 150)
                      .trim()
                      .replace(/\n/g, " ")}`;
                    if (result.meta.foundations && resultExcerpt) {
                      result.meta.foundations = {
                        ...result.meta.foundations,
                        excerpt: resultExcerpt,
                      };
                    }
                  }
                }
              }
            }
            return result;
          })
          .map((result) => ({ ...result, score: result.score || 0 }))
          .slice(0, MAX_RESULTS[category]),
      });
    });

    groupedResults.sort(
      (a, b) => (a.results[0]?.score || 0) - (b.results[0]?.score || 0)
    );
  }

  return groupedResults;
}
