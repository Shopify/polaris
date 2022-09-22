import type {NavItem} from '../components/Nav';
import siteJson from '../../.cache/site.json';
import {Status, SiteJSON} from '../types';

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

export const getComponentNav = (): NavItem[] => {
  const navItems: NavItem[] = [
    {
      title: 'All',
      children: components.map((slug) => {
        const {title, status} = pages[slug].frontMatter;
        const componentStatus = status
          ? ({value: status.value, message: status.value} as Status)
          : undefined;
        return {
          title: title,
          url: `/components/${slugify(title)}`,
          status: componentStatus,
        };
      }),
    },
  ];

  return navItems;
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
  return classNames.filter((className) => Boolean(className)).join(' ');
};

export const toPascalCase = (str: string) =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('');
