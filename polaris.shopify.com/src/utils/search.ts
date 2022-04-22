import { SearchResult } from "../types";
import colorLight from "../../../polaris-react/src/tokens/token-groups/color.light.json";
import depth from "../../../polaris-react/src/tokens/token-groups/depth.json";
import motion from "../../../polaris-react/src/tokens/token-groups/motion.json";
import shape from "../../../polaris-react/src/tokens/token-groups/shape.json";
import spacing from "../../../polaris-react/src/tokens/token-groups/spacing.json";
import typography from "../../../polaris-react/src/tokens/token-groups/typography.json";
import zIndex from "../../../polaris-react/src/tokens/token-groups/z-index.json";
import components from "../data/components.json";
import icons from "../data/icons.json";
import guidelines from "../data/guidelines.json";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";

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
      colorToken: { value: tokenValue },
    },
  });
});

// Add other tokens
const otherTokenGroups = { depth, motion, shape, spacing, typography, zIndex };
Object.entries(otherTokenGroups).forEach(([groupSlug, tokenGroup]) => {
  Object.entries(tokenGroup).forEach(([tokenName, tokenValue]) => {
    results.push({
      category: "Tokens",
      title: `--p-${tokenName}`,
      excerpt: "",
      url: `/tokens/${slugify(groupSlug)}#${tokenName}`,
      keywords: [],
      meta: {},
    });
  });
});

// Add icons
icons.forEach(({ name, set, description, keywords, fileName }) => {
  results.push({
    category: "Icons",
    title: `${name} (${set})`,
    excerpt: description,
    url: `/icons#${name}-${set}`,
    keywords,
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

      const url = `/docs/${sectionSlug}/${slug}`;

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
