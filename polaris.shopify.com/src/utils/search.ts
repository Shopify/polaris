import { Result } from "../types";
import colorLight from "../../../polaris-react/src/tokens/token-groups/color.light.json";
import depth from "../../../polaris-react/src/tokens/token-groups/depth.json";
import motion from "../../../polaris-react/src/tokens/token-groups/motion.json";
import shape from "../../../polaris-react/src/tokens/token-groups/shape.json";
import spacing from "../../../polaris-react/src/tokens/token-groups/spacing.json";
import typography from "../../../polaris-react/src/tokens/token-groups/typography.json";
import zIndex from "../../../polaris-react/src/tokens/token-groups/z-index.json";
import components from "../data/components.json";
import icons from "../data/icons.json";
import Fuse from "fuse.js";
import { slugify, stripMarkdownLinks } from "./various";

let allPages: Result[] = [];

// Add components
components.forEach(({ frontMatter: { name, category, keywords }, intro }) => {
  allPages.push({
    type: "component",
    title: name,
    excerpt: stripMarkdownLinks(intro),
    url: `/components/${category}/${name}`,
    keywords,
    meta: {},
  });
});

// Add color tokens
Object.entries(colorLight).forEach(([tokenName, tokenValue]) => {
  allPages.push({
    type: "token",
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
    allPages.push({
      type: "token",
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
  allPages.push({
    type: "icon",
    title: `${name} (${set})`,
    excerpt: description,
    url: `/icons#${name}-${set}`,
    keywords,
    meta: {
      icon: { fileName },
    },
  });
});

export function search(query: string): Result[] {
  if (query.length > 0) {
    const fuse = new Fuse(allPages, {
      keys: [{ name: "title", weight: 2 }, "excerpt", "url", "keywords"],
    });
    const fuseResults = fuse.search(query);
    return fuseResults.map((result) => result.item).slice(0, 10);
  }

  return [];
}
