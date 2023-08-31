import type {metaThemeBase} from './base';
import type {themeNames} from './constants';

export type MetaThemeBase = typeof metaThemeBase;
export type MetaThemeVariant = MetaThemeBase;

export type ThemeName = typeof themeNames[number];
export type ThemeBase = ExtractMetaThemeValues<MetaThemeBase>;
export type ThemeVariant = ExtractMetaThemeValues<MetaThemeVariant>;

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

export type MetaThemeVariants = {
  [T in ThemeName]: MetaThemeVariant;
};

type ExcludeMotionKeyframes<T> = T extends `motion-keyframes-${string}`
  ? never
  : T;

export type MetaThemeVariantPartialShape = {
  [TokenGroupName in keyof Omit<MetaThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof MetaThemeBase[TokenGroupName] as ExcludeMotionKeyframes<TokenName>]?: MetaTokenProperties;
  };
};

export type MetaThemeVariantPartials = {
  [T in ThemeName]: MetaThemeVariantPartialShape;
};

export type ExtractMetaTokenGroupValues<T extends MetaTokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

export type ExtractMetaThemeValues<T extends MetaThemeShape> = {
  [K in keyof T]: ExtractMetaTokenGroupValues<T[K]>;
};
