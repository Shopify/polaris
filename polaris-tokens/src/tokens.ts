import type {Exact} from './types';
import {breakpoints} from './token-groups/breakpoints';
import {depth} from './token-groups/depth';
import {legacy as legacyTokens} from './token-groups/legacy';
import {colors} from './token-groups/colors';
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
export interface Tokens {
  breakpoints: TokenGroup;
  colors: TokenGroup;
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
  colors,
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
