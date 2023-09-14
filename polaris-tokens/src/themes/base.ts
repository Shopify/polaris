import {createExact, tokensToRems} from '../utilities';
import {border} from '../token-groups/border';
import {breakpoints} from '../token-groups/breakpoints';
import {color} from '../token-groups/color';
import {font} from '../token-groups/font';
import {height} from '../token-groups/height';
import {motion} from '../token-groups/motion';
import {shadow} from '../token-groups/shadow';
import {space} from '../token-groups/space';
import {zIndex} from '../token-groups/zIndex';

import type {MetaThemeShape} from './types';

const createMetaThemeBase = createExact<MetaThemeShape>();

export const metaThemeBase = createMetaThemeBase({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  color,
  font: tokensToRems(font),
  height: tokensToRems(height),
  motion,
  shadow: tokensToRems(shadow),
  space: tokensToRems(space),
  zIndex,
});
