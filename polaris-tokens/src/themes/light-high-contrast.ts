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
});

export const metaThemeLightHighContrast = createMetaTheme(
  metaThemeLightHighContrastPartial,
);
