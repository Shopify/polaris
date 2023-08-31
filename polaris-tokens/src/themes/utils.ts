import deepmerge from 'deepmerge';

import type {Entry, Exact} from '../types';
import {createExact} from '../utilities';

import type {
  ExtractMetaThemeValues,
  ExtractMetaTokenGroupValues,
  MetaThemeShape,
  MetaThemeVariant,
  MetaThemeVariantPartialShape,
  MetaTokenGroupShape,
  ThemeBase,
  ThemeName,
  ThemeVariant,
  ThemeVariantPartialsShape,
} from './types';
import {themeNameLightUplift} from './constants';
import {metaThemeBase} from './base';

export const createMetaThemeVariantPartial =
  createExact<MetaThemeVariantPartialShape>();

export function createMetaThemeVariant<
  T extends Exact<MetaThemeVariantPartialShape, T>,
>(metaThemeVariantPartial: T): MetaThemeVariant {
  return deepmerge(metaThemeBase, metaThemeVariantPartial);
}

export function createThemeClassName(themeName: string) {
  return themeName === themeNameLightUplift
    ? themeName
    : `p-theme-${themeName}`;
}

export function createThemeSelector(themeName: string) {
  return `html.${createThemeClassName(themeName)}`;
}

export function createGetTheme(
  themeBase: ThemeBase,
  themeVariantPartials: ThemeVariantPartialsShape,
) {
  return function getTheme(themeName: ThemeName): ThemeVariant {
    return deepmerge(
      themeBase,
      themeVariantPartials[themeName],
    ) as ThemeVariant;
  };
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
