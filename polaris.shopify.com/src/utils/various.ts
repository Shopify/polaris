import type { NavItem } from "../components/Nav";
import { Status } from "../types";

export const getReadableStatusValue = (
  statusValue: Status["value"]
): string => {
  const bannerTitles: { [key in Status["value"]]: string } = {
    deprecated: "Deprecated",
    alpha: "Alpha",
    information: "Information",
    warning: "Warning",
  };

  return bannerTitles[statusValue];
};

export const slugify = (str: string): string => {
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

export const className = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  return classNames.filter((className) => Boolean(className)).join(" ");
};
