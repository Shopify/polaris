import depth from './token-groups/depth.json';
import legacyTokens from './token-groups/legacy-tokens.json';
import darkColorScheme from './token-groups/color.dark.json';
import lightColorScheme from './token-groups/color.light.json';
import motion from './token-groups/motion.json';
import shape from './token-groups/shape.json';
import spacing from './token-groups/spacing.json';
import typography from './token-groups/typography.json';
import zIndex from './token-groups/z-index.json';
import {tokensToRems} from './utilities';

/**
 * Values to convert to CSS custom properties.
 * @example {background: '#000'} // --p-background: #000;
 */
export interface TokenGroup {
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
  [C in ColorScheme]: TokenGroup;
};

const colorSchemes: ColorSchemes = {
  light: lightColorScheme,
  dark: darkColorScheme,
};

export interface Tokens {
  depth: TokenGroup;
  colorSchemes: ColorSchemes;
  legacyTokens: TokenGroup;
  motion: TokenGroup;
  shape: TokenGroup;
  spacing: TokenGroup;
  typography: TokenGroup;
  zIndex: TokenGroup;
}

export const tokens: Tokens = {
  colorSchemes,
  depth,
  legacyTokens: tokensToRems(legacyTokens),
  motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  typography,
  zIndex,
};
