import type {Exact, MetadataBase} from './types';
import {tokensToRems} from './utilities';
import {border} from './token-groups/border';
import {breakpoints} from './token-groups/breakpoints';
import {color} from './token-groups/color';
import {font} from './token-groups/font';
import {motion} from './token-groups/motion';
import {shadow} from './token-groups/shadow';
import {spacing} from './token-groups/spacing';
import {zIndex} from './token-groups/zIndex';

export const metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  color,
  font: tokensToRems(font),
  motion,
  shadow: tokensToRems(shadow),
  spacing: tokensToRems(spacing),
  zIndex,
});

export type Metadata = typeof metadata;

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
export function createMetadata<T extends Exact<MetadataBase, T>>(metadata: T) {
  return metadata;
}
