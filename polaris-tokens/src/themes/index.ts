import {createVar} from '../utilities';

import type {Themes, ThemesPartials, ThemeVars} from './types';
import {themeLight} from './light';
import {themeLightUplift, themeLightUpliftPartial} from './light-uplift';
import {themeBase} from './base';

export {themeDefault} from './constants';

export const themes: Themes = {
  light: themeLight,
  'Polaris-Summer-Editions-2023': themeLightUplift,
};

export const themesPartials: ThemesPartials = {
  'Polaris-Summer-Editions-2023': themeLightUpliftPartial,
};

/**
 * Theme object where values represent token names as CSS variables.
 *
 * Useful for applying theme-agnostic tokens in JavaScript.
 *
 * @example
 * const themeVars = {
 *   color: { 'color-bg': 'var(--p-color-bg)' }
 *   font: { 'font-family': 'var(--p-font-family)' }
 *   // etc.
 * }
 *
 * @example
 * // ✅ Do
 * import {themeVars} from '@shopify/polaris-tokens';
 *
 * themeVars.color['color-bg']; // var(--p-color-bg)
 *
 * // ❌ Don't
 * import * as themes from '@shopify/polaris-tokens/themes';
 *
 * themes.light.color['color-bg']; // #123
 * themes.dark.color['color-bg']; // #456
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
