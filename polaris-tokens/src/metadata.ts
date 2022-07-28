import type {Exact, Metadata} from './types';
import {tokensToRems} from './utilities';
import {breakpoints} from './token-groups/breakpoints';
import {depth} from './token-groups/depth';
import {legacy} from './token-groups/legacy';
import {colors} from './token-groups/colors';
import {motion} from './token-groups/motion';
import {shape} from './token-groups/shape';
import {spacing} from './token-groups/spacing';
import {font} from './token-groups/font';
import {zIndex} from './token-groups/zIndex';

export const metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  colors,
  depth,
  legacy: tokensToRems(legacy),
  motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  font: tokensToRems(font),
  zIndex,
});

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
export function createMetadata<T extends Exact<Metadata, T>>(metadata: T) {
  return metadata;
}
