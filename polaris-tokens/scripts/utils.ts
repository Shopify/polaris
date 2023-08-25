import type {MetaThemeShape, MetaTokenGroupShape} from '../src/themes/types';
import type {Entry} from '../src/types';

export type ExtractMetaTokenGroupValues<T extends MetaTokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

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

export type ExtractMetaThemeValues<T extends MetaThemeShape> = {
  [K in keyof T]: ExtractMetaTokenGroupValues<T[K]>;
};

export function extractMetaThemeValues<T extends MetaThemeShape>(metaTheme: T) {
  return Object.fromEntries(
    Object.entries(metaTheme).map(
      ([tokenGroupName, metaTokenGroup]): Entry<
        ExtractMetaThemeValues<MetaThemeShape>
      > => [tokenGroupName, extractMetaTokenGroupValues(metaTokenGroup)],
    ),
  ) as ExtractMetaThemeValues<T>;
}
