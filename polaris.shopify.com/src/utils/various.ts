import siteJson from '../../.cache/site.json';
import {PatternFrontMatter, SiteJSON} from '../types';
import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import {breakpointsAliases} from '@shopify/polaris-tokens';
import type {Entries} from 'type-fest';

export function isObject(value?: any): value is object {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

interface PatternJSON {
  [key: string]: {
    frontMatter: PatternFrontMatter;
  };
}

const pages: SiteJSON = siteJson as unknown as SiteJSON;

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

type Falsy = boolean | undefined | null | 0;

export type ResponsivePropObject<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | ResponsivePropObject<T>;

export type PolarisCSSCustomPropertyName = `${`--p-` | `--pc-`}${string}`;
export type PolarisCSSVar = `var(${PolarisCSSCustomPropertyName})`;

type ResponsiveCSSCustomProperties = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: PolarisCSSVar;
};

type ResponsiveValues<T> = {
  [Breakpoint in `${string}-${BreakpointsAlias}`]?: T;
};

export function classNames(...classes: (string | Falsy)[]) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function sanitizeCustomProperties(
  styles: React.CSSProperties,
): React.CSSProperties | undefined {
  const nonNullValues = Object.entries(styles).filter(
    ([_, value]) => value != null,
  );

  return nonNullValues.length ? Object.fromEntries(nonNullValues) : undefined;
}

export function createPolarisCSSVar<
  T extends string | number | undefined = string,
>(tokenSubgroup: string | null, tokenValue: T): PolarisCSSVar {
  // `Grid`'s `gap` prop used to allow passing fully formed var() functions as
  // the value. This is no longer supported in v12+.
  if (typeof tokenValue === 'string' && tokenValue.startsWith('var(')) {
    throw new Error(
      `"${tokenValue}" is not from the ${tokenSubgroup} token group.`,
    );
  }

  // NOTE: All our token values today are either strings or numbers, so
  // stringifying them here works. But if we ever have anything more complex
  // (such as an object) this may generate invalid token names.
  return `var(--p-${tokenSubgroup ? `${tokenSubgroup}-` : ''}${tokenValue})`;
}

export function createPolarisCSSCustomProperty(
  componentName: string,
  componentProp: string,
  breakpointAlias?: BreakpointsAlias,
): PolarisCSSCustomPropertyName {
  return `--pc-${componentName}-${componentProp}${
    breakpointAlias ? `-${breakpointAlias}` : ''
  }`;
}

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
 * NOTE: Also supports legacy / deprecated values which are a complete CSS
 * variable declaration (primarily for `Grid`):
 * (
 *   'grid',
 *   'gap',
 *   'spacing',
 *   {
 *     sm: "var(--p-spacing-4)",
 *     lg: "var(--p-spacing-6)"
 *   }
 * )
 *
 */
export function getResponsiveProps<
  T extends string | number | undefined = string,
>(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string | null,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveCSSCustomProperties {
  // "falsey" values are valid except `null` or `undefined`
  if (responsiveProp == null) return {};

  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (
        Object.entries(responsiveProp).filter(
          ([, aliasOrScale]) => aliasOrScale != null,
        ) as Entries<ResponsivePropObject<T>>
      ).map(([breakpointAlias, aliasOrScale]) => [
        createPolarisCSSCustomProperty(
          componentName,
          componentProp,
          breakpointAlias,
        ),
        // Use ! here because .filter() doesn't type narrow
        createPolarisCSSVar<T>(tokenSubgroup, aliasOrScale!),
      ]),
    );
  }

  return {
    [createPolarisCSSCustomProperty(
      componentName,
      componentProp,
      breakpointsAliases[0],
    )]: createPolarisCSSVar<T>(tokenSubgroup, responsiveProp),
  };
}

export function getResponsiveValue<
  T extends string | number | undefined = string,
>(
  componentName: string,
  componentProp: string,
  responsiveProp?: ResponsiveProp<T>,
): ResponsiveValues<T> {
  // "falsey" values are valid except `null` or `undefined`
  if (responsiveProp == null) return {};

  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (
        Object.entries(responsiveProp).filter(
          ([, responsiveValue]) => responsiveValue != null,
          // Use 'Required' here because .filter() doesn't type narrow
        ) as Entries<Required<ResponsivePropObject<T>>>
      ).map(([breakpointAlias, responsiveValue]) => [
        createPolarisCSSCustomProperty(
          componentName,
          componentProp,
          breakpointAlias,
        ),
        responsiveValue,
      ]),
    );
  }

  return {
    [createPolarisCSSCustomProperty(
      componentName,
      componentProp,
      breakpointsAliases[0],
    )]: responsiveProp as T,
  };
}

export function mapResponsivePropValues<Input, Output>(
  responsiveProp: ResponsiveProp<Input> | undefined,
  fn: (value?: Input) => Output | undefined,
): ResponsiveProp<Output> | undefined {
  if (isObject(responsiveProp)) {
    return Object.fromEntries(
      (Object.entries(responsiveProp) as Entries<typeof responsiveProp>).map(
        ([breakpointAlias, value]) => [breakpointAlias, fn(value)],
      ),
    );
  }

  return fn(responsiveProp as Input);
}
