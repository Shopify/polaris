import type {Exact, MetaTokens} from './types';
import {tokensToRems} from './utilities';
import {breakpoints} from './token-groups/breakpoints';
import {depth} from './token-groups/depth';
import {legacy} from './token-groups/legacy';
import {colors} from './token-groups/colors';
import {motion} from './token-groups/motion';
import {shape} from './token-groups/shape';
import {spacing} from './token-groups/spacing';
import {typography} from './token-groups/typography';
import {zIndex} from './token-groups/zIndex';

export const metaTokens = createMetaTokens({
  breakpoints: tokensToRems(breakpoints),
  colors,
  depth,
  legacy: tokensToRems(legacy),
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
export function createMetaTokens<T extends Exact<MetaTokens, T>>(tokens: T) {
  return tokens;
}
