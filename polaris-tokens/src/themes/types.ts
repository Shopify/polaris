import type {ThemeBase} from './base';
import type {themeNames, themeNameDefault} from './constants';

export interface TokenProperties {
  value: string;
  description?: string;
}

export interface TokenGroupShape {
  [tokenName: string]: TokenProperties;
}

export interface ThemeShape {
  [tokenGroupName: string]: TokenGroupShape;
}

type ExcludeMotionKeyframes<T> = T extends `motion-keyframes-${string}`
  ? never
  : T;

export type ThemeVariantPartialShape = {
  [TokenGroupName in keyof Omit<ThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof ThemeBase[TokenGroupName] as ExcludeMotionKeyframes<TokenName>]?: TokenProperties;
  };
};

export type ThemeVariant = ThemeBase;

export type ThemeName = typeof themeNames[number];

export type Themes = {
  [T in ThemeName]: ThemeVariant;
};

export type ThemesPartials = {
  [T in Exclude<ThemeName, typeof themeNameDefault>]: ThemeVariantPartialShape;
};
