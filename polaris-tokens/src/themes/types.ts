import type {metaThemeBase} from './base';
import type {themeNames} from './constants';

export type MetaThemeBase = typeof metaThemeBase;
export type MetaTheme = MetaThemeBase;

// prettier-ignore
export type ThemeName = typeof themeNames[number];
export type ThemeBase = ExtractMetaThemeValues<MetaThemeBase>;
export type Theme = ExtractMetaThemeValues<MetaTheme>;

export type TokenName = {
  [TokenGroupName in keyof Theme]: {
    [TokenName in keyof Theme[TokenGroupName]]: TokenName;
  }[keyof Theme[TokenGroupName]];
}[keyof Theme];

export interface MetaTokenProperties {
  value: string;
  description?: string;
}

export interface MetaTokenGroupShape {
  [tokenName: string]: MetaTokenProperties;
}

export interface MetaThemeShape {
  [tokenGroupName: string]: MetaTokenGroupShape;
}

export type MetaThemes = {
  [T in ThemeName]: MetaTheme;
};

type ExcludeMotionKeyframes<T> = T extends `motion-keyframes-${string}`
  ? never
  : T;

export type MetaThemePartialShape = {
  [TokenGroupName in keyof Omit<MetaThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof MetaThemeBase[TokenGroupName] as ExcludeMotionKeyframes<TokenName>]?: MetaTokenProperties;
  };
};

export type MetaThemePartials = {
  [T in ThemeName]: MetaThemePartialShape;
};

export type ExtractMetaTokenGroupValues<T extends MetaTokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

export type ExtractMetaThemeValues<T extends MetaThemeShape> = {
  [K in keyof T]: ExtractMetaTokenGroupValues<T[K]>;
};

export type ObjectFromKeys<Arr extends readonly string[], T> = {
  [K in Arr[number]]: T;
};
