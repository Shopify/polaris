import type {Exact} from './types';
import {breakpoints} from './token-groups/breakpoints';
import {depth} from './token-groups/depth';
import {legacy as legacyTokens} from './token-groups/legacy';
import {colors as darkColorScheme} from './token-groups/color.dark';
import {colors as lightColorScheme} from './token-groups/color.light';
import {motion} from './token-groups/motion';
import {shape} from './token-groups/shape';
import {spacing} from './token-groups/spacing';
import {typography} from './token-groups/typography';
import {zIndex} from './token-groups/zIndex';
import {tokensToRems} from './utilities';

/**
 * Values to convert to CSS custom properties.
 * @example {background: '#000'} // --p-background: #000;
 */
export interface TokenProperties {
  description?: string;
  value: string;
}

export interface TokenGroup {
  [token: string]: TokenProperties;
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
  breakpoints: TokenGroup;
  colorSchemes: ColorSchemes;
  depth: TokenGroup;
  legacyTokens: TokenGroup;
  motion: TokenGroup;
  shape: TokenGroup;
  spacing: TokenGroup;
  typography: TokenGroup;
  zIndex: TokenGroup;
}

export const tokens = createTokens({
  breakpoints: tokensToRems(breakpoints),
  colorSchemes,
  depth,
  legacyTokens: tokensToRems(legacyTokens),
  motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  typography: tokensToRems(typography),
  zIndex,
});

/**
 * Identity function that simply returns the provided tokens, but additionally
 * validates the input matches the `Tokens` type exactly and infers all members.
 */
function createTokens<T extends Exact<Tokens, T>>(tokens: T) {
  return tokens;
}
