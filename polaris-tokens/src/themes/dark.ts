import * as colors from '../colors';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeDarkPartial = createMetaThemePartial({
  color: {
    'color-bg': {value: colors.gray[16]},
    'color-bg-surface': {value: colors.gray[15]},
    'color-bg-fill-disabled': {value: colors.gray[15]},
    'color-bg-fill-secondary': {value: colors.gray[13]},
    'color-text': {value: colors.gray[3]},
    'color-text-secondary': {value: colors.gray[6]},
    'color-text-disabled': {value: colors.gray[13]},
    'color-text-brand': {value: colors.blue[14]},
    'color-icon': {value: colors.gray[11]},
    'color-icon-disabled': {value: colors.gray[13]},
  },
});

export const metaThemeDark = createMetaTheme(metaThemeDarkPartial);
