import * as colors from '../colors';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeLightHighContrastPartial = createMetaThemePartial({
  color: {
    'color-text': {
      value: colors.gray[16],
    },
    'color-text-secondary': {
      value: colors.gray[16],
    },
    'color-text-brand': {
      value: colors.gray[16],
    },
    'color-icon-secondary': {
      value: colors.gray[14],
    },
    'color-border': {
      value: colors.gray[12],
    },
    'color-input-border': {
      value: colors.gray[14],
    },
    'color-border-secondary': {
      value: colors.gray[12],
    },
    'color-bg-surface-secondary': {
      value: colors.gray[6],
    },
  },
  shadow: {
    'shadow-bevel-100': {
      value:
        '0px 1px 0px 0px rgba(26, 26, 26, 0.07), 0px 1px 0px 0px rgba(208, 208, 208, 0.40) inset, 1px 0px 0px 0px #CCC inset, -1px 0px 0px 0px #CCC inset, 0px -1px 0px 0px #999 inset',
    },
  },
});

export const metaThemeLightHighContrast = createMetaTheme(
  metaThemeLightHighContrastPartial,
);
