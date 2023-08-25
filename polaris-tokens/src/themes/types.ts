import type {MetaThemeBase} from './base';
import type {themeNames} from './constants';

export type ThemeName = typeof themeNames[number];

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

export type MetaThemeVariantPartialShape = {
  [TokenGroupName in keyof Omit<MetaThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof MetaThemeBase[TokenGroupName] as ExcludeMotionKeyframes<TokenName>]?: MetaTokenProperties;
  };
};

export type MetaThemeVariant = MetaThemeBase;

export type MetaThemeVariantPartials = {
  [T in ThemeName]: MetaThemeVariantPartialShape;
};
