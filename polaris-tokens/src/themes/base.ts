import {tokensToRems} from '../utilities';
import {border} from '../token-groups/border';
import {breakpoints} from '../token-groups/breakpoints';
import {font} from '../token-groups/font';
import {motion} from '../token-groups/motion';
import {shadow} from '../token-groups/shadow';
import {space} from '../token-groups/space';
import {zIndex} from '../token-groups/zIndex';

import {createMetadataThemeBase} from './utils';

export const metadataThemeBase = createMetadataThemeBase({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  font: tokensToRems(font),
  motion,
  shadow: tokensToRems(shadow),
  space: tokensToRems(space),
  zIndex,
});

export type MetadataThemeBase = typeof metadataThemeBase;
