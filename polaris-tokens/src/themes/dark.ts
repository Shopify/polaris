import * as colors from '../colors';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeDarkPartial = createMetaThemePartial({
  color: {
    'color-scheme': {value: 'dark'},
    'color-bg': {value: colors.gray[16]},
    'color-bg-surface': {value: colors.gray[15]},
    'color-bg-fill': {value: colors.gray[15]},
    'color-icon': {value: colors.gray[8]},
    'color-icon-secondary': {value: colors.gray[12]},
    'color-text': {value: colors.gray[8]},
    'color-text-secondary': {value: colors.gray[11]},
    'color-bg-surface-secondary-active': {value: colors.gray[13]},
    'color-bg-surface-secondary-hover': {value: colors.gray[14]},
    'color-bg-fill-transparent': {value: colors.whiteAlpha[8]},
    'color-bg-fill-brand': {value: colors.gray[1]},
    'color-text-brand-on-bg-fill': {value: colors.gray[15]},
    'color-bg-surface-hover': {value: colors.gray[14]},
    'color-bg-fill-hover': {value: colors.gray[14]},
    'color-bg-fill-transparent-hover': {value: colors.whiteAlpha[9]},
    'color-bg-fill-brand-hover': {value: colors.gray[5]},
    'color-bg-surface-selected': {value: colors.gray[13]},
    'color-bg-fill-selected': {value: colors.gray[13]},
    'color-bg-fill-transparent-selected': {value: colors.whiteAlpha[11]},
    'color-bg-fill-brand-selected': {value: colors.gray[9]},
    'color-bg-surface-active': {value: colors.gray[13]},
    'color-bg-fill-active': {value: colors.gray[13]},
    'color-bg-fill-transparent-active': {value: colors.whiteAlpha[10]},
    'color-bg-fill-brand-active': {value: colors.gray[4]},
    'color-bg-surface-brand-selected': {value: colors.gray[14]},
    'color-border-secondary': {value: colors.gray[13]},
    'color-tooltip-border-tail-down-experimental': {
      value: 'rgba(40, 40, 40, 1)',
    },
    'color-tooltip-border-tail-up-experimental': {
      value: 'rgba(126, 126, 126, 1)',
    },
    'color-border-gradient-experimental': {
      value: `linear-gradient(to bottom, ${colors.whiteAlpha[9]}, ${colors.whiteAlpha[4]})`,
    },
    'color-border-gradient-hover-experimental': {
      value: `linear-gradient(to bottom, ${colors.whiteAlpha[9]}, ${colors.whiteAlpha[4]})`,
    },
    'color-border-gradient-selected-experimental': {
      value: `linear-gradient(to bottom, ${colors.blackAlpha[10]}, ${colors.whiteAlpha[10]})`,
    },
    'color-border-gradient-active-experimental': {
      value: `linear-gradient(to bottom, ${colors.whiteAlpha[10]}, ${colors.whiteAlpha[4]})`,
    },
  },
});

export const metaThemeDark = createMetaTheme(metaThemeDarkPartial);
