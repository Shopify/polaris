import { Result } from "../types";
import colorLight from "../../../polaris-react/src/tokens/token-groups/color.light.json";
import { components } from "../data/components";
import icons from "../data/icons.json";
import Fuse from "fuse.js";

let allPages: Result[] = [];

// Add components
Object.entries(components).forEach(([name, meta]) => {
  allPages.push({
    title: name,
    excerpt:
      "This component is a great way to lorem ipsum dolor et amet consecteur.",
    url: `/components/${meta.category}/${name}`,
    meta: {
      componentPreview: {
        src: `/previews/components/${meta.previewId || "card"}`,
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
    meta: {
      colorToken: { value: tokenValue },
    },
  });
});

// Add icons
icons.forEach((icon) => {
  allPages.push({
    title: `${icon.name} (${icon.set})`,
    excerpt: icon.description,
    url: `/icons#${icon.name}-${icon.set}`,
    meta: {
      icon: { fileName: icon.fileName },
    },
  });
});

export function search(query: string): Result[] {
  if (query.length > 0) {
    const fuse = new Fuse(allPages, {
      keys: [{ name: "title", weight: 2 }, "excerpt", "url"],
    });
    const fuseResults = fuse.search(query);
    return fuseResults.map((result) => result.item).slice(0, 10);
  }

  return [];
}
