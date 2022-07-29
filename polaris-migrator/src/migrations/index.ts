/* eslint sort-imports: error */
/* eslint sort-keys: error */

import {migration as replaceSassSpacing} from './replace-sass-spacing';
import {migration as replaceTextComponent} from './replace-text-component';

export const migrations = {
  replaceSassSpacing,
  replaceTextComponent,
};
