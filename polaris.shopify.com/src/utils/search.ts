import { SearchResult } from "../types";
import { createVar, tokens } from "@shopify/polaris-tokens";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";
import metadata from '@shopify/polaris-icons/metadata';

import components from "../data/components.json";
import guidelines from "../data/guidelines.json";

const {
  colorSchemes: { light: colorLight },
  depth,
  motion,
  shape,
  spacing,
  typography,
  zIndex,
} = tokens;

let results: SearchResult = [];

// Add components
components.forEach(({ frontMatter: { name, category, keywords }, intro }) => {
  results.push({
    category: "Components",
    title: name,
    excerpt: stripMarkdownLinks(intro),
    url: `/components/${slugify(category)}/${slugify(name)}`,
    keywords,
    meta: {},
  });
});

// Add color tokens
Object.entries(colorLight).forEach(([tokenName, tokenValue]) => {
  results.push({
    category: "Tokens",
    title: `--p-${tokenName}`,
    excerpt: "",
    url: `/tokens/colors#${tokenName}`,
    keywords: [],
    meta: {
      colorToken: { value: tokenValue.value },
    },
  });
});

// Add other tokens
const otherTokenGroups = { depth, motion, shape, spacing, typography, zIndex };
Object.entries(otherTokenGroups).forEach(([groupSlug, tokenGroup]) => {
  Object.entries(tokenGroup).forEach(([tokenName, tokenValue]) => {
    results.push({
      category: "Tokens",
      title: createVar(tokenName),
      excerpt: "",
      url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
      keywords: [],
      meta: {},
    });
  });
});

// Add icons
Object.keys(metadata).forEach(fileName => {
  results.push({
    category: "Icons",
    title: `${metadata[fileName].name} (${metadata[fileName].set})`,
    excerpt: metadata[fileName].description,
    url: `/icons#${fileName}`,
    keywords: metadata[fileName].keywords,
    meta: {
      icon: { fileName },
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
        title,
        excerpt: intro,
        url,
        keywords: keywords as string[],
        meta: {},
      });
    }
  }
});

const fuse = new Fuse(results, {
  keys: [{ name: "title", weight: 50 }, "excerpt", "url", "keywords"],
  includeScore: true,
  threshold: 0.1,
});

export function search(query: string): SearchResult {
  let topScores: {
    [key in SearchResult[number]["category"]]: number;
  } = {
    Components: 0,
    Guidelines: 0,
    Icons: 0,
    Tokens: 0,
  };

  if (query.length > 0) {
    const fuseResults = fuse.search(query);

    fuseResults.forEach((result) => {
      const category = result.item.category;
      if (
        result.score &&
        (topScores[category] === null || topScores[category] < result.score)
      ) {
        topScores[category] = result.score;
      }
    });

    const groupedResults = fuseResults
      .map((item) => item.item)
      .sort((a, b) => {
        return topScores[a.category] - topScores[b.category];
      })
      .slice(0, 20);

    return groupedResults;
  }

  return [];
}
