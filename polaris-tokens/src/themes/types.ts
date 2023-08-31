import type {metaThemeBase} from './base';
import type {themeNames} from './constants';

export type MetaThemeBase = typeof metaThemeBase;
export type MetaThemeVariant = MetaThemeBase;

export type ThemeName = typeof themeNames[number];
export type ThemeBase = ExtractMetaThemeValues<MetaThemeBase>;
export type ThemeVariant = ExtractMetaThemeValues<MetaThemeVariant>;
export type ThemeVariantPartialShape = CreateThemeVariantPartialShape<
  MetaTokenProperties['value']
>;
export type ThemeVariantPartialsShape = {
  [T in ThemeName]: ThemeVariantPartialShape;
};

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

type ExcludeMotionKeyframes<T> = T extends `motion-keyframes-${string}`
  ? never
  : T;

type CreateThemeVariantPartialShape<T> = {
  [TokenGroupName in keyof Omit<MetaThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof MetaThemeBase[TokenGroupName] as ExcludeMotionKeyframes<TokenName>]?: T;
  };
};

export type MetaThemeVariantPartialShape =
  CreateThemeVariantPartialShape<MetaTokenProperties>;

export type MetaThemeVariantPartials = {
  [T in ThemeName]: MetaThemeVariantPartialShape;
};

export type ExtractMetaTokenGroupValues<T extends MetaTokenGroupShape> = {
  [K in keyof T]: T[K]['value'];
};

export type ExtractMetaThemeValues<T extends MetaThemeShape> = {
  [K in keyof T]: ExtractMetaTokenGroupValues<T[K]>;
};
