import type {Exact, MetadataBase} from './types';
import {tokensToRems} from './utilities';
import {breakpoints} from './token-groups/breakpoints';
import {border} from './token-groups/border';
import {depth} from './token-groups/depth';
import {font} from './token-groups/font';
import {legacy} from './token-groups/legacy';
import {color} from './token-groups/color';
import {experimentalColor} from './token-groups/color-experimental';
import {colors} from './token-groups/colors';
import {motion} from './token-groups/motion';
import {shadow} from './token-groups/shadow';
import {shape} from './token-groups/shape';
import {spacing} from './token-groups/spacing';
import {space} from './token-groups/space';
import {zIndex} from './token-groups/zIndex';

export const metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  color,
  colors,
  depth,
  font: tokensToRems(font),
  legacy: tokensToRems(legacy),
  motion,
  shadow: tokensToRems(shadow),
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  space: tokensToRems(space),
  zIndex,
});

export const experimentalMetaData = createMetadata({
  experimentalColor,
});

export type Metadata = typeof metadata;
export type ExperimentalMetadata = typeof experimentalMetaData;

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
export function createMetadata<T extends Exact<MetadataBase, T>>(metadata: T) {
  return metadata;
}
