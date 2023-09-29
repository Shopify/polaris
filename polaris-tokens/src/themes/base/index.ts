import {createExact, tokensToRems} from '../../utils';
import type {MetaThemeShape} from '../types';

import {border} from './border';
import {breakpoints} from './breakpoints';
import {color} from './color';
import {font} from './font';
import {height} from './height';
import {motion} from './motion';
import {shadow} from './shadow';
import {space} from './space';
import {text} from './text';
import {width} from './width';
import {zIndex} from './zIndex';

const createMetaThemeBase = createExact<MetaThemeShape>();

export const metaThemeBase = createMetaThemeBase({
  border: tokensToRems(border),
  breakpoints: tokensToRems(breakpoints),
  color,
  font: tokensToRems(font),
  height: tokensToRems(height),
  motion,
  shadow: tokensToRems(shadow),
  space: tokensToRems(space),
  text,
  width: tokensToRems(width),
  zIndex,
});
