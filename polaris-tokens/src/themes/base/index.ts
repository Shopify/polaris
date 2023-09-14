import {createExact, tokensToRems} from '../../utilities';
import type {MetaThemeShape} from '../types';

import {breakpoints} from './breakpoints';
import {color} from './color';
import {font} from './font';
import {height} from './height';
import {motion} from './motion';
import {shadow} from './shadow';
import {space} from './space';
import {width} from './width';
import {zIndex} from './zIndex';
import {border} from './border';

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
  width: tokensToRems(width),
  zIndex,
});
