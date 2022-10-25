import siteJson from '../../.cache/site.json';
import {SiteJSON} from '../types';

const pages: SiteJSON = siteJson;

const components = Object.keys(pages).filter((slug) =>
  slug.startsWith('components/'),
);

export const getComponentCategories = (): string[] => {
  const componentCategories: string[] = [];

  components.forEach((slug) => {
    const {category = ''} = pages[slug].frontMatter;
    if (!componentCategories.includes(category)) {
      componentCategories.push(category);
    }
  });

  return componentCategories;
};

export const slugify = (str: string): string => {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
  );
};

export const stripMarkdownLinks = (markdown: string): string => {
  const linkRegex = /\[([a-z ]+)\]([^\)]+)\)/gi;
  return markdown.replace(linkRegex, (_, linkText) => {
    return linkText;
  });
};

export const className = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  return classNames.filter((className) => Boolean(className)).join(' ');
};

export const toPascalCase = (str: string): string =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('');

export const uppercaseFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
