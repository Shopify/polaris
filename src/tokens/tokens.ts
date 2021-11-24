import {legacyTokens} from './_legacy-tokens';
import {lightColorScheme, darkColorScheme} from './_color';
import {motion} from './_motion';
import {typography} from './_typography';

/**
 * Values to convert to CSS custom properties.
 * @example {background: '#000'} // --p-background: #000;
 */
export interface TokensGroup {
  [token: string]: string;
}

export type ColorScheme = 'light' | 'dark';

/**
 * Mapping of Polaris color schemes to operating system color schemes.
 *
 * Note: The associated OS value will be set for the CSS `color-scheme` declaration.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
 */
export type OSColorSchemes = {
  [C in ColorScheme]: 'light' | 'dark' | 'normal';
};

export const osColorSchemes: OSColorSchemes = {
  light: 'light',
  dark: 'dark',
};

/**
 * Polaris color schemes and their associated color tokens.
 */
export type ColorSchemes = {
  [C in ColorScheme]: TokensGroup;
};

const colorSchemes: ColorSchemes = {
  light: lightColorScheme,
  dark: darkColorScheme,
};

export interface Tokens {
  colorSchemes: ColorSchemes;
  legacyTokens: TokensGroup;
  motion: TokensGroup;
  typography: TokensGroup;
}

export const tokens: Tokens = {
  colorSchemes,
  legacyTokens,
  motion,
  typography,
};
