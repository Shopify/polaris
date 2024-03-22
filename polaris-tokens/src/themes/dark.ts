import * as colors from '../colors';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeDarkPartial = createMetaThemePartial({
  color: {
    'color-bg': {value: colors.gray[16]},
    'color-bg-surface': {value: colors.gray[15]},
    'color-bg-fill': {value: colors.gray[15]},
    'color-icon': {value: colors.gray[8]},
    'color-icon-secondary': {value: colors.gray[12]},
    'color-text': {value: colors.gray[8]},
    'color-text-secondary': {value: colors.gray[11]},
  },
});

export const metaThemeDark = createMetaTheme(metaThemeDarkPartial);
