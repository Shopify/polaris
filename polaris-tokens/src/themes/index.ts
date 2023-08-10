import {createVar} from '../utilities';

import type {ThemeVariantPartialShape} from './types';
import type {ThemeBase} from './base';
import {themeBase} from './base';
import {themeLight} from './light';
import {themeLightUplift, themeLightUpliftPartial} from './light-uplift';

export const themeNames = ['light', 'Polaris-Summer-Editions-2023'] as const;

export type ThemeName = typeof themeNames[number];

export type Themes = {[T in ThemeName]: ThemeBase};

export const themes: Themes = {
  light: themeLight,
  'Polaris-Summer-Editions-2023': themeLightUplift,
} as const;

export type ThemesPartials = {
  [T in Exclude<ThemeName, 'light'>]: ThemeVariantPartialShape;
};

export const themesPartials: ThemesPartials = {
  'Polaris-Summer-Editions-2023': themeLightUpliftPartial,
};

export type ThemeVars = {
  [TokenGroupName in keyof ThemeBase]: {
    [TokenName in keyof ThemeBase[TokenGroupName]]: string;
  };
};

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
