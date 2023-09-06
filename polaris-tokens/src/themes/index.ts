import {createVar} from '../utilities';

import type {ThemeVariantPartialShape, CreateVarName} from './types';
import type {ThemeBase} from './base';
import {themeBase} from './base';
import {themeLight} from './light';
import {themeLightUplift, themeLightUpliftPartial} from './light-uplift';
import {themeNameDefault, themeNameLightUplift} from './constants';

export const themeNames = [themeNameDefault, themeNameLightUplift] as const;

export type ThemeName = typeof themeNames[number];

export type Themes = {[T in ThemeName]: ThemeBase};

export const themes: Themes = {
  light: themeLight,
  'Polaris-Summer-Editions-2023': themeLightUplift,
} as const;

export type ThemesPartials = {
  [T in Exclude<ThemeName, typeof themeNameDefault>]: ThemeVariantPartialShape;
};

export const themesPartials: ThemesPartials = {
  'Polaris-Summer-Editions-2023': themeLightUpliftPartial,
};

export type ThemeVars = {
  [TokenGroupName in keyof ThemeBase]: {
    [TokenName in keyof ThemeBase[TokenGroupName]]: string;
  };
};

/**
 * `themeBase` token properties converted to CSS variables.
 *
 * @example
 * const themeBase = {
 *   color: { 'color-bg': { value: '#111', description: '...' } }
 *   font: { 'font-family': { value: 'Inter', description: '...' } }
 * }
 *
 * const themeVars = {
 *   color: { 'color-bg': 'var(--p-color-bg)' }
 *   font: { 'font-family': 'var(--p-font-family)' }
 * }
 */
export const themeVars = Object.fromEntries(
  Object.entries(themeBase).map(([tokenGroupName, tokenGroup]) => [
    tokenGroupName,
    Object.fromEntries(
      Object.keys(tokenGroup).map((tokenName) => [
        tokenName,
        `var(${createVar(tokenName)})`,
      ]),
    ),
  ]),
) as ThemeVars;

/**
 * `themeVars` token names converted to CSS variable names.
 *
 * @example
 * const themeVars = {
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
