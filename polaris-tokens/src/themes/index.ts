import type {MetaThemePartials, MetaThemes} from './types';
import {createMetaTheme} from './utils';
import {themeNameDefault} from './constants';
import {metaThemeLight, metaThemeLightPartial} from './light';
import {
  metaThemeLightHighContrast,
  metaThemeLightHighContrastPartial,
} from './light-high-contrast';
import {metaThemeDark, metaThemeDarkPartial} from './dark';

export {createMetaTheme} from './utils';

export const metaThemes: MetaThemes = {
  light: metaThemeLight,
  'light-high-contrast-experimental': metaThemeLightHighContrast,
  'dark-experimental': metaThemeDark,
};

export const metaThemePartials: MetaThemePartials = {
  light: metaThemeLightPartial,
  'light-high-contrast-experimental': metaThemeLightHighContrastPartial,
  'dark-experimental': metaThemeDarkPartial,
};

export const metaThemeDefaultPartial = metaThemePartials[themeNameDefault];

export const metaThemeDefault = createMetaTheme(metaThemeDefaultPartial);
