import {color} from '../token-groups/color';

import {
  createThemeVariant,
  createThemePartial,
  withValueExperimental,
} from './utils';
import {themeBase} from './base';

// Note: This partial theme is separate from the complete variant theme below
// (as partials are inserted in a dedicated selector to avoid duplication)
export const themePartialHighContrast = createThemePartial({
  color: {
    ...withValueExperimental(color),
    'color-bg-app': {value: 'rgba(250, 250, 250, 1)'},
    'color-bg-strong': {value: 'rgba(192, 192, 192, 1)'},
    'color-bg-subdued-active': {value: 'rgba(240, 240, 240, 1)'},
    'color-text': {value: 'rgba(9, 9, 9, 1)'},
    'color-text-subdued': {value: 'rgba(23, 23, 23, 1)'},
    'color-icon': {value: 'rgba(14, 14, 14, 1)'},
  },
});

export const themeHighContrast = createThemeVariant({
  ...themeBase,
  ...themePartialHighContrast,
});

export type ThemeHighContrast = typeof themeHighContrast;
