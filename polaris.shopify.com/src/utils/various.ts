import siteJson from '../../.cache/site.json';
import {PatternFrontMatter, SiteJSON} from '../types';

interface PatternJSON {
  [key: string]: {
    frontMatter: PatternFrontMatter;
  };
}

const pages: SiteJSON = siteJson;

const components = Object.keys(pages).filter((slug) =>
  slug.startsWith('components/'),
);

export const patterns: PatternJSON = Object.keys(pages)
  .filter((slug) => slug.startsWith('patterns/'))
  .sort((a, b) => a.localeCompare(b))
  .reduce((memo, key) => {
    // @ts-expect-error Yes it is compatible Typescript. Shhhh.
    memo[key] = pages[key];
    return memo;
  }, {} as PatternJSON);

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

type ValueOrArray<T> = T | ValueOrArray<T>[];
export type ClassName = ValueOrArray<string | boolean | null | undefined>;

export const className = (...classNames: ClassName[]): string => {
  return classNames
    .filter((c) => Boolean(c))
    .flatMap((c) => (Array.isArray(c) ? className(...c) : c))
    .join(' ');
};

export const toPascalCase = (str: string): string =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('');

export const uppercaseFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const deslugify = (str: string): string =>
  uppercaseFirst(str.replace(/-+/g, ' '));
