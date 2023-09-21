import * as colors from '../colors-experimental';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeLightHighContrastPartial = createMetaThemePartial({
  color: {
    'color-text': {
      value: colors.gray[16],
    },
    'color-text-subdued': {
      value: colors.gray[16],
    },
    'color-text-primary': {
      value: colors.gray[16],
    },
    'color-icon-subdued': {
      value: colors.gray[14],
    },
    'color-border': {
      value: colors.gray[12],
    },
    'color-border-input': {
      value: colors.gray[14],
    },
    'color-border-subdued': {
      value: colors.gray[12],
    },
    'color-bg-subdued': {
      value: colors.gray[6],
    },
  },
  shadow: {
    'shadow-bevel-experimental': {
      value:
        '0px 1px 0px 0px rgba(26, 26, 26, 0.07), 0px 1px 0px 0px rgba(208, 208, 208, 0.40) inset, 1px 0px 0px 0px #CCC inset, -1px 0px 0px 0px #CCC inset, 0px -1px 0px 0px #999 inset',
    },
  },
});

export const metaThemeLightHighContrast = createMetaTheme(
  metaThemeLightHighContrastPartial,
);
