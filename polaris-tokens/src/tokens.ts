import type {Exact, MetaTokens} from './types';
import {breakpoints as breakpointsTokens} from './token-groups/breakpoints';
import {depth as depthTokens} from './token-groups/depth';
import {legacy as legacyTokens} from './token-groups/legacy';
import {colors as colorsTokens} from './token-groups/colors';
import {motion as motionTokens} from './token-groups/motion';
import {shape as shapeTokens} from './token-groups/shape';
import {spacing as spacingTokens} from './token-groups/spacing';
import {typography as typographyTokens} from './token-groups/typography';
import {zIndex as zIndexTokens} from './token-groups/zIndex';

export const breakpoints = breakpointsTokens;
export const colors = colorsTokens;
export const depth = depthTokens;
export const legacy = legacyTokens;
export const motion = motionTokens;
export const shape = shapeTokens;
export const spacing = spacingTokens;
export const typography = typographyTokens;
export const zIndex = zIndexTokens;

export const tokens = createTokens({
  breakpoints,
  colors,
  depth,
  legacy,
  motion,
  shape,
  spacing,
  typography,
  zIndex,
});

/**
 * Identity function that simply returns the provided tokens, but additionally
 * validates the input matches the `Tokens` type exactly and infers all members.
 */
function createTokens<T extends Exact<MetaTokens, T>>(tokens: T) {
  return tokens;
}
