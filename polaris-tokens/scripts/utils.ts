import type {ThemeShape, TokenGroupShape} from '../src/themes/types';
import type {Entry} from '../src/types';

export type ExtractTokenGroupValues<T extends TokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

export function extractTokenGroupValues<T extends TokenGroupShape>(
  tokenGroup: T,
) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(
      ([tokenName, {value}]): Entry<
        ExtractTokenGroupValues<TokenGroupShape>
      > => [tokenName, value],
    ),
  ) as ExtractTokenGroupValues<T>;
}

export type ExtractThemeValues<T extends ThemeShape> = {
  [K in keyof T]: ExtractTokenGroupValues<T[K]>;
};

export function extractThemeValues<T extends ThemeShape>(theme: T) {
  return Object.fromEntries(
    Object.entries(theme).map(
      ([tokenGroupName, tokenGroup]): Entry<ExtractThemeValues<ThemeShape>> => [
        tokenGroupName,
        extractTokenGroupValues(tokenGroup),
      ],
    ),
  ) as ExtractThemeValues<T>;
}
