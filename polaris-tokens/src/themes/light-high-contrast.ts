import * as colors from '../colors-experimental';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeLightHighContrastPartial = createMetaThemePartial({
  color: {
    'color-text': {
      value: colors.gray[16](),
    },
  },
});

export const metaThemeLightHighContrast = createMetaTheme(
  metaThemeLightHighContrastPartial,
);
