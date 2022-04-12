import components from "../data/components.json";

export const getComponentCategories = (): string[] => {
  const tempComponentCategories: { [key: string]: boolean } = {};

  Object.values(components).forEach((component) => {
    tempComponentCategories[component.frontMatter.category] = true;
  });

  const componentCategories = Object.keys(tempComponentCategories);

  return componentCategories;
};

export const slugify = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "-");
};

export const stripMarkdownLinks = (markdown: string): string => {
  const linkRegex = /\[([a-z ]+)\]([^\)]+)\)/gi;
  return markdown.replaceAll(linkRegex, (_, linkText) => {
    return linkText;
  });
};
