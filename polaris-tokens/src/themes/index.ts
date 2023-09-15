import type {MetaThemePartials, MetaThemes} from './types';
import {createMetaTheme} from './utils';
import {themeNameDefault} from './constants';
import {metaThemeLight, metaThemeLightPartial} from './light';
import {
  metaThemeLightUplift,
  metaThemeLightUpliftPartial,
} from './light-uplift';

export {createMetaTheme} from './utils';

export const metaThemes: MetaThemes = {
  light: metaThemeLight,
  'Polaris-Summer-Editions-2023': metaThemeLightUplift,
};

export const metaThemePartials: MetaThemePartials = {
  light: metaThemeLightPartial,
  'Polaris-Summer-Editions-2023': metaThemeLightUpliftPartial,
};

export const metaThemeDefaultPartial = metaThemePartials[themeNameDefault];

export const metaThemeDefault = createMetaTheme(metaThemeDefaultPartial);
