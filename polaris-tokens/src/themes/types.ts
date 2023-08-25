import type {CreateVarName} from '../types';

import type {ThemeBase} from './base';
import type {themeNames} from './constants';

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

export type ThemePartials = {
  [T in ThemeName]: ThemeVariantPartialShape;
};

export type ThemeVars = {
  [TokenGroupName in keyof ThemeBase]: {
    [TokenName in keyof ThemeBase[TokenGroupName]]: string;
  };
};

/**
 * `ThemeVars` tokens represented as CSS variable names.
 *
 * @example
 * type ThemeVars = {
 *   color: { 'color-bg': 'var(--p-color-bg)' }
 *   font: { 'font-family': 'var(--p-font-family)' }
 * }
 *
 * type ThemeVarName = '--p-color-bg' | '--p-font-family' | ...
 */
export type ThemeVarName = {
  [TokenGroupName in keyof ThemeVars]: {
    [TokenName in keyof ThemeVars[TokenGroupName]]: TokenName extends string
      ? CreateVarName<TokenName>
      : never;
  }[keyof ThemeVars[TokenGroupName]];
}[keyof ThemeVars];
