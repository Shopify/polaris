import { Result } from "../types";
import colorLight from "../../../polaris-react/src/tokens/token-groups/color.light.json";
import components from "../data/components.json";
import icons from "../data/icons.json";
import Fuse from "fuse.js";
import { stripMarkdownLinks } from "./various";

let allPages: Result[] = [];

// Add components
components.forEach(({ frontMatter: { name, category, keywords }, intro }) => {
  allPages.push({
    title: name,
    excerpt: stripMarkdownLinks(intro),
    url: `/components/${category}/${name}`,
    keywords,
    meta: {
      componentPreview: {
        src: `/previews/components/card`,
      },
    },
  });
});

// Add color tokens
Object.entries(colorLight).forEach(([tokenName, tokenValue]) => {
  allPages.push({
    title: `--p-${tokenName}`,
    excerpt: "",
    url: `/tokens/colors#${tokenName}`,
    keywords: [],
    meta: {
      colorToken: { value: tokenValue },
    },
  });
});

// Add icons
icons.forEach(({ name, set, description, keywords, fileName }) => {
  allPages.push({
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
