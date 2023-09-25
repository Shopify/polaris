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

export function resolveMetaThemeRefs<T extends MetaThemeShape>(
  metaTheme: T,
): T {
  return Object.fromEntries(
    Object.entries(metaTheme).map(([tokenGroupName, metaTokenGroup]) => [
      tokenGroupName,
      Object.fromEntries(
        Object.entries(metaTokenGroup).map(([tokenName, tokenProperties]) => {
          let tokenValue = tokenProperties.value;

          if (tokenValue.startsWith('var(--p-')) {
            const tokenNameRef = tokenValue.slice(8, -1);
            const tokenGroupNameRef = tokenNameRef.split('-')[0];

            tokenValue = metaTheme[tokenGroupNameRef][tokenNameRef].value;
          }

          return [tokenName, {...tokenProperties, value: tokenValue}];
        }),
      ),
    ]),
  ) as T;
}
