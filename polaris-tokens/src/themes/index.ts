import type {Themes, ThemesPartials} from './types';
import {themeLight} from './light';
import {themeLightUplift, themeLightUpliftPartial} from './light-uplift';

export {themeDefault} from './constants';

export const themes: Themes = {
  light: themeLight,
  'Polaris-Summer-Editions-2023': themeLightUplift,
};

export const themesPartials: ThemesPartials = {
  'Polaris-Summer-Editions-2023': themeLightUpliftPartial,
};
