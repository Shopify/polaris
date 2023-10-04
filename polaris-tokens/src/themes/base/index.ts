import {createMetaThemeBase} from '../../utils';

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

export const metaThemeBase = createMetaThemeBase({
  border,
  breakpoints,
  color,
  font,
  height,
  motion,
  shadow,
  space,
  text,
  width,
  zIndex,
});
