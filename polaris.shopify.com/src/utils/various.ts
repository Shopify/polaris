import type { NavItem } from "../components/NavItems";
import components from "../data/components.json";

export const getComponentCategories = (): string[] => {
  const tempComponentCategories: { [key: string]: boolean } = {};

  Object.values(components).forEach((component) => {
    tempComponentCategories[component.frontMatter.category] = true;
  });

  const componentCategories = Object.keys(tempComponentCategories);

  return componentCategories;
};

export const getComponentNav = (): NavItem[] => {
  const navItems: NavItem[] = [
    {
      title: "All",
      children: components.map((component) => ({
        title: component.frontMatter.name,
        url: `/components/${slugify(component.frontMatter.name)}`,
      })),
    },
  ];

  return navItems;
};

export const slugify = (str: string) => {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
  );
};

export const stripMarkdownLinks = (markdown: string): string => {
  const linkRegex = /\[([a-z ]+)\]([^\)]+)\)/gi;
  return markdown.replaceAll(linkRegex, (_, linkText) => {
    return linkText;
  });
};

export const getUrlsFromNavItems = (navItems: NavItem[]): string[] => {
  let urls: string[] = [];

  navItems.forEach((navItem) => {
    if (navItem.url) {
      urls.push(navItem.url);
    }
    if (navItem.children) {
      urls = [...urls, ...getUrlsFromNavItems(navItem.children)];
    }
  });

  return urls;
};

export const getTitleTagValue = (title?: string) => {
  const siteName = "Shopify Polaris";
  if (title) {
    return `${title} — ${siteName}`;
  }
  return siteName;
};

export const className = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  return classNames.filter((className) => Boolean(className)).join(" ");
};
