import type {MetadataBase} from './types';
import {tokensToRems} from './utilities';
import {breakpoints} from './token-groups/breakpoints';
import {depth} from './token-groups/depth';
import {font} from './token-groups/font';
import {legacy} from './token-groups/legacy';
import {colors} from './token-groups/colors';
import {motion} from './token-groups/motion';
import {shape} from './token-groups/shape';
import {spacing} from './token-groups/spacing';
import {zIndex} from './token-groups/zIndex';

export const metadata = {
  breakpoints: tokensToRems(breakpoints),
  colors,
  depth,
  font: tokensToRems(font),
  legacy: tokensToRems(legacy),
  motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  zIndex,
} satisfies MetadataBase;

export type Metadata = typeof metadata;
