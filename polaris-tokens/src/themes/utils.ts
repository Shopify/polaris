import deepmerge from 'deepmerge';

import type {Entry, Exact} from '../types';
import {createExact} from '../utilities';

import type {
  ExtractMetaThemeValues,
  ExtractMetaTokenGroupValues,
  MetaThemeShape,
  MetaTheme,
  MetaThemePartialShape,
  MetaTokenGroupShape,
  ThemeName,
  Theme,
} from './types';
import {themeNameLightUplift} from './constants';
import {metaThemeBase} from './base';

export const createMetaThemePartial = createExact<MetaThemePartialShape>();

export function createMetaTheme<T extends Exact<MetaThemePartialShape, T>>(
  metaThemePartial: T,
): MetaTheme {
  return deepmerge(metaThemeBase, metaThemePartial);
}

export function createThemeClassName(themeName: ThemeName) {
  return themeName === themeNameLightUplift
    ? themeName
    : `p-theme-${themeName}`;
}

export function createThemeSelector(themeName: ThemeName) {
  return `html.${createThemeClassName(themeName)}`;
}

export function extractMetaTokenGroupValues<T extends MetaTokenGroupShape>(
  metaTokenGroup: T,
) {
  return Object.fromEntries(
    Object.entries(metaTokenGroup).map(
      ([tokenName, {value}]): Entry<
        ExtractMetaTokenGroupValues<MetaTokenGroupShape>
      > => [tokenName, value],
    ),
  ) as ExtractMetaTokenGroupValues<T>;
}

export function extractMetaThemeValues<T extends MetaThemeShape>(metaTheme: T) {
  return Object.fromEntries(
    Object.entries(metaTheme).map(
      ([tokenGroupName, metaTokenGroup]): Entry<
        ExtractMetaThemeValues<MetaThemeShape>
      > => [tokenGroupName, extractMetaTokenGroupValues(metaTokenGroup)],
    ),
  ) as ExtractMetaThemeValues<T>;
}

/**
 * Private utility to resolve references within the theme object by:
 * 1. Traversing each token group.
 * 2. Identifying token values starting with `var(--p-`.
 * 3. Replacing these values with a getter function that returns the resolved value.
 * 4. Returning the mutated theme object.
 */
export function resolveThemeRefs<T extends Theme>(theme: T): T {
  Object.keys(theme).forEach((tokenGroupName) => {
    const tokenGroupRef = theme[tokenGroupName as keyof Theme];

    Object.entries(tokenGroupRef).forEach(([tokenName, tokenValue]) => {
      if (tokenValue.startsWith('var(--p-')) {
        const tokenNameRef = tokenValue.slice(8, -1);
        const tokenGroupNameRef = tokenNameRef.split('-')[0];

        Object.defineProperty(tokenGroupRef, tokenName, {
          get() {
            return (theme as any)[tokenGroupNameRef][tokenNameRef] as string;
          },
          enumerable: true,
        });
      }
    });
  });

  return theme;
}
