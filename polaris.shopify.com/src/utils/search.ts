import {
  SearchResultCategory,
  SearchResults,
  ComponentsSearchResult,
  GuidelinesSearchResult,
  IconsSearchResult,
  TokensSearchResult,
  GroupedSearchResults,
  SearchResult,
} from "../types";
import { tokens } from "@shopify/polaris-tokens";
import components from "../data/components.json";
import icons from "../data/icons.json";
import guidelines from "../data/guidelines.json";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";

const MAX_RESULTS: { [key: string]: number } = {
  Guidelines: 5,
  Components: 4,
  Tokens: 8,
  Icons: 18,
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
components.forEach(({ frontMatter: { name, category, keywords }, intro }) => {
  results.push({
    category: "Components",
    score: 0,
    url: `/components/${slugify(category)}/${slugify(name)}`,
    meta: {
      name,
      description: stripMarkdownLinks(intro),
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
      token: {
        name: tokenName,
        description: tokenValue.description || "",
        value: tokenValue.value,
      },
    },
  });
});

// Add other tokens
const otherTokenGroups = { depth, motion, shape, spacing, typography, zIndex };
Object.entries(otherTokenGroups).forEach(([groupSlug, tokenGroup]) => {
  Object.entries(tokenGroup).forEach(([tokenName, tokenValue]) => {
    results.push({
      category: "Tokens",
      score: 0,
      url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
      meta: {
        token: {
          name: tokenName,
          description: tokenValue.description || "",
          value: tokenValue.value,
        },
      },
    });
  });
});

// Add icons
icons.forEach(({ name, set, description, keywords, fileName }) => {
  results.push({
    category: "Icons",
    score: 0,
    url: `/icons#${name}-${set}`,
    meta: {
      icon: { fileName, keywords, name, description, set },
    },
  });
});

// Add guidelines
guidelines.forEach(({ frontMatter: { name, keywords, slug }, intro }) => {
  const parts = name.split("/");
  if (parts.length >= 2) {
    const sectionSlug = slugify(parts[0]);

    const allowedSections = ["patterns", "foundations", "design", "content"];
    if (allowedSections.includes(sectionSlug)) {
      const title = parts[parts.length - 1];

      const url = `/guidelines/${sectionSlug}/${slug}`;

      results.push({
        category: "Guidelines",
        score: 0,
        url,
        meta: {
          title,
          excerpt: intro,
        },
      });
    }
  }
});

const fuse = new Fuse(results, {
  keys: [
    { name: "meta.title", weight: 100 },
    { name: "meta.name", weight: 100 },
    { name: "meta.description", weight: 50 },
    { name: "meta.excerpt", weight: 50 },
    { name: "meta.token.name", weight: 200 },
    // { name: "meta.token.description", weight: 50 },
    { name: "meta.token.value", weight: 50 },
    { name: "meta.icon.fileName", weight: 50 },
    { name: "meta.icon.keywords", weight: 20 },
    { name: "meta.icon.set", weight: 20 },
    // { name: "meta.icon.description", weight: 50 },
  ],
  includeScore: true,
  threshold: 0.5,
  shouldSort: true,
  ignoreLocation: true,
});

export function search(query: string): GroupedSearchResults {
  const groupedResults: GroupedSearchResults = {
    Guidelines: { results: [], maxScore: 0 },
    Components: { results: [], maxScore: 0 },
    Tokens: { results: [], maxScore: 0 },
    Icons: { results: [], maxScore: 0 },
  };

  if (query.length > 0) {
    const fuseResults = fuse.search(query);

    const scoredResults: SearchResults = fuseResults.map((result) => ({
      ...result.item,
      score: result.score || 0,
    }));

    groupedResults["Guidelines"].results = scoredResults
      .filter((result) => result.category === "Guidelines")
      .map((result) => ({
        ...result,
        score: result.score || 0,
      })) as GuidelinesSearchResult[];

    groupedResults["Components"].results = scoredResults
      .filter((result) => result.category === "Components")
      .map((result) => ({
        ...result,
        score: result.score || 0,
      })) as ComponentsSearchResult[];

    groupedResults["Tokens"].results = scoredResults
      .filter((result) => result.category === "Tokens")
      .map((result) => ({
        ...result,
        score: result.score || 0,
      })) as TokensSearchResult[];

    groupedResults["Icons"].results = scoredResults
      .filter((result) => result.category === "Icons")
      .map((result) => ({
        ...result,
        score: result.score || 0,
      })) as IconsSearchResult[];

    Object.keys(groupedResults).forEach((category) => {
      const typedCategory = category as SearchResultCategory;
      groupedResults[typedCategory].maxScore =
        groupedResults[typedCategory].results[0]?.score || 0;
    });
  }

  return groupedResults;
}
