import * as colors from '../colors';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeDarkPartial = createMetaThemePartial({
  color: {
    'color-scheme': {value: 'dark'},
    'color-bg': {value: colors.gray[16]},
    'color-bg-surface': {value: colors.blackAlpha[7]},
    'color-bg-fill': {value: colors.blackAlpha[7]},
    'color-icon': {value: colors.gray[8]},
    'color-icon-secondary': {value: colors.gray[12]},
    'color-icon-secondary-active': {value: colors.gray[8]},
    'color-text': {value: colors.gray[8]},
    'color-text-secondary': {value: colors.gray[11]},
    'color-bg-surface-secondary-active': {value: colors.gray[13]},
    'color-bg-surface-secondary-hover': {value: colors.gray[14]},
    'color-bg-fill-transparent': {value: colors.whiteAlpha[8]},
    'color-bg-fill-brand': {value: colors.gray[1]},
    'color-text-brand-on-bg-fill': {value: colors.gray[15]},
    'color-bg-surface-hover': {value: colors.gray[14]},
    'color-bg-fill-hover': {value: colors.blackAlpha[5]},
    'color-bg-fill-transparent-hover': {value: colors.whiteAlpha[9]},
    'color-bg-fill-brand-hover': {value: colors.gray[5]},
    'color-bg-surface-selected': {value: colors.gray[13]},
    'color-bg-fill-selected': {
      value: `linear-gradient(to bottom, ${colors.blackAlpha[2]}, ${colors.blackAlpha[9]} 10%, ${colors.whiteAlpha[13]})`,
    },
    'color-bg-fill-transparent-selected': {value: colors.whiteAlpha[11]},
    'color-bg-fill-brand-selected': {value: colors.gray[9]},
    'color-bg-surface-active': {value: colors.gray[13]},
    'color-bg-fill-active': {
      value: `linear-gradient(${colors.whiteAlpha[3]}, ${colors.whiteAlpha[3]}), linear-gradient(to bottom, ${colors.blackAlpha[2]}, ${colors.blackAlpha[9]} 10%, ${colors.whiteAlpha[13]})`,
    },
    'color-bg-fill-transparent-active': {value: colors.whiteAlpha[10]},
    'color-bg-fill-brand-active': {value: colors.gray[4]},
    'color-bg-surface-brand-selected': {value: colors.gray[14]},
    'color-border-secondary': {value: colors.gray[13]},
    'color-bg-fill-secondary': {value: colors.blackAlpha[7]},
    'color-bg-fill-secondary-hover': {value: colors.blackAlpha[8]},
    'color-bg-fill-secondary-selected-experimental': {
      value: colors.blackAlpha[10],
    },
    'color-tooltip-tail-down-border-experimental': {
      value: 'rgba(60, 60, 60, 1)',
    },
    'color-tooltip-tail-up-border-experimental': {
      value: 'rgba(71, 71, 71, 1)',
    },
    'color-border-gradient-experimental': {
      value: `linear-gradient(to bottom, ${colors.whiteAlpha[10]}, ${colors.whiteAlpha[4]})`,
    },
    'color-border-gradient-hover-experimental': {
      value: `linear-gradient(to bottom, ${colors.whiteAlpha[10]}, ${colors.whiteAlpha[4]})`,
    },
    'color-border-gradient-selected-experimental': {
      value: `linear-gradient(to bottom, ${colors.blackAlpha[16]}, ${colors.blackAlpha[10]} 25%, ${colors.whiteAlpha[10]})`,
    },
    'color-border-gradient-active-experimental': {
      value: `linear-gradient(to bottom, ${colors.blackAlpha[16]}, ${colors.blackAlpha[16]} 25%, ${colors.whiteAlpha[9]})`,
    },
  },
  shadow: {
    'shadow-bevel-100': {
      value:
        '1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, -1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px -1px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.16) inset',
    },
  },
});

export const metaThemeDark = createMetaTheme(metaThemeDarkPartial);
