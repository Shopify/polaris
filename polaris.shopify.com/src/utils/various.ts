import pages from '../../.cache/site';
import type {PatternFrontMatter} from '../types';
import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointsAliases} from '@shopify/polaris-tokens';

export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

interface PatternJSON {
  [key: string]: {
    frontMatter: PatternFrontMatter;
  };
}

export const patterns: PatternJSON = Object.keys(pages)
  .filter((slug) => slug.startsWith('patterns/'))
  .sort((a, b) => a.localeCompare(b))
  .reduce((memo, key) => {
    // @ts-expect-error Yes it is compatible Typescript. Shhhh.
    memo[key] = pages[key];
    return memo;
  }, {} as PatternJSON);

export const legacyPatterns: PatternJSON = Object.keys(pages)
  .filter((slug) => slug.startsWith('patterns-legacy/'))
  .sort((a, b) => a.localeCompare(b))
  .reduce((memo, key) => {
    // @ts-expect-error Yes it is compatible Typescript. Shhhh.
    memo[key] = pages[key];
    return memo;
  }, {} as PatternJSON);

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

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Given params like so:
 * (
 *   'button',
 *   'padding',
 *   'spacing',
 *   {
 *     sm: "4",
 *     lg: "6"
 *   }
 * )
 * Converts it to an object like so:
 * {
 *   '--pc-button-padding-sm': 'var(--p-spacing-4)',
 *   '--pc-button-padding-lg': 'var(--p-spacing-6)'
 * }
 *
 */
type ResponsivePropConfig<T = string> = {
  [Breakpoint in BreakpointsAlias]?: T;
};
export type ResponsiveProp<T> = T | ResponsivePropConfig<T>;
type ResponsiveVariables<T> = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
};

export function getResponsiveProps<T = string>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveVariables<T> {
  if (!responsiveProp) return {};

  let result: ResponsivePropConfig;

  if (!isObject(responsiveProp)) {
    result = {
      [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  } else {
    result = Object.fromEntries(
      Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
        breakpointAlias,
        `var(--p-${tokenSubgroup}-${aliasOrScale})`,
      ]),
    );
  }

  // Prefix each responsive key with the correct token name
  return Object.fromEntries(
    Object.entries(result).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  ) as unknown as ResponsiveVariables<T>;
}
export const viewTransition = (callback: () => void | Promise<unknown>) => {
  // @ts-ignore is experimental and not typed yet
  if (document.startViewTransition) {
    // @ts-ignore exists in Chrome 111+
    return document.startViewTransition(callback);
  } else {
    callback();

    const resolved = Promise.resolve();

    return {
      ready: resolved,
      finished: resolved,
    };
  }
};
