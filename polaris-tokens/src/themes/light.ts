import {color} from '../token-groups/color';

import {
  createThemeVariant,
  createThemePartial,
  withValueExperimental,
} from './utils';
import {themeBase} from './base';

// Note: This partial theme is separate from the complete variant theme below
// (as partials are inserted in a dedicated selector to avoid duplication)
export const themePartialLight = createThemePartial({
  color: withValueExperimental(color),
});

export const themeLight = createThemeVariant({
  ...themeBase,
  ...themePartialLight,
});

export type ThemeLight = typeof themeLight;
