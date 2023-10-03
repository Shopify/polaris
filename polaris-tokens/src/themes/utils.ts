import deepmerge from 'deepmerge';

import type {Entry, Exact} from '../types';
import {getTokenNames, tokenGroupToRems, tokenGroupNamesToRems} from '../utils';

import type {
  ExtractMetaThemeValues,
  ExtractMetaTokenGroupValues,
  MetaThemeShape,
  MetaTheme,
  MetaThemePartialShape,
  MetaTokenGroupShape,
  ThemeName,
  TokenName,
  Theme,
} from './types';
import {metaThemeBase} from './base';

/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemePartial({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
export function createMetaThemePartial<
  T extends Exact<MetaThemePartialShape, T>,
>(metaThemePartial: T) {
  return Object.fromEntries(
    Object.entries(metaThemePartial).map(([tokenGroupName, tokenGroup]) => [
      tokenGroupName,
      tokenGroup && tokenGroupNamesToRems.includes(tokenGroupName)
        ? tokenGroupToRems(tokenGroup)
        : tokenGroup,
    ]),
  ) as T;
}

export function createMetaTheme<T extends Exact<MetaThemePartialShape, T>>(
  metaThemePartial: T,
): MetaTheme {
  return deepmerge(metaThemeBase, metaThemePartial);
}

export function createThemeClassName(themeName: ThemeName) {
  return `p-theme-${themeName}`;
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

export function flattenMetaTheme(metaTheme: MetaThemeShape) {
  return Object.fromEntries(
    Object.values(metaTheme).flatMap((metaTokenGroup) =>
      Object.entries(metaTokenGroup).map(([tokenName, metaTokenProperties]) => [
        tokenName,
        metaTokenProperties,
      ]),
    ),
  );
}

export function resolveMetaThemeRefs<T extends MetaThemeShape>(
  metaTheme: T,
): T {
  const flattenedMetaTheme = flattenMetaTheme(metaTheme);

  return Object.fromEntries(
    Object.entries(metaTheme).map(([tokenGroupName, metaTokenGroup]) => [
      tokenGroupName,
      Object.fromEntries(
        Object.entries(metaTokenGroup).map(
          ([tokenName, metaTokenProperties]) => {
            let tokenValue = metaTokenProperties.value;

            while (tokenValue.startsWith('var(--p-')) {
              const tokenNameRef = tokenValue.slice(8, -1);

              tokenValue = flattenedMetaTheme[tokenNameRef].value;
            }

            return [tokenName, {...metaTokenProperties, value: tokenValue}];
          },
        ),
      ),
    ]),
  ) as T;
}

export function createIsTokenName(theme: Theme | MetaTheme) {
  const tokenNames = new Set(getTokenNames(theme));

  return (tokenName: unknown): tokenName is TokenName =>
    tokenNames.has(tokenName as TokenName);
}

/**
 * Important: Do not export from Polaris tokens. This utility is exposed
 * in the `toValues` build step to ensure the `metaTheme` isn't in client bundles.
 */
export const isTokenName = createIsTokenName(metaThemeBase);
