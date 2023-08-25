import type {ThemePartials} from './types';
import {createThemeVariant} from './utils';
import {themeNameDefault} from './constants';
import {themeLightPartial} from './light';
import {themeLightUpliftPartial} from './light-uplift';

export {createThemeVariant} from './utils';

export const themePartials: ThemePartials = {
  light: themeLightPartial,
  'Polaris-Summer-Editions-2023': themeLightUpliftPartial,
};

export const themeDefaultPartial = themePartials[themeNameDefault];
export const themeDefault = createThemeVariant(themeDefaultPartial);
