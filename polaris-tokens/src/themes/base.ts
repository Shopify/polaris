import {tokensToRems} from '../utilities';
import {border} from '../token-groups/border';
import {breakpoints} from '../token-groups/breakpoints';
import {font} from '../token-groups/font';
import {motion} from '../token-groups/motion';
import {shadow} from '../token-groups/shadow';
import {space} from '../token-groups/space';
import {zIndex} from '../token-groups/zIndex';

import {createThemeBase} from './utils';

export const themeBase = createThemeBase({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  font: tokensToRems(font),
  motion,
  shadow: tokensToRems(shadow),
  space: tokensToRems(space),
  zIndex,
});

export type ThemeBase = typeof themeBase;
