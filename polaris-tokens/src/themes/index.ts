import type {MetaThemeVariantPartials, MetaThemeVariants} from './types';
import {createMetaThemeVariant} from './utils';
import {themeNameDefault} from './constants';
import {metaThemeLight, metaThemeLightPartial} from './light';
import {
  metaThemeLightUplift,
  metaThemeLightUpliftPartial,
} from './light-uplift';

export {createMetaThemeVariant} from './utils';

export const metaThemeVariants: MetaThemeVariants = {
  light: metaThemeLight,
  'Polaris-Summer-Editions-2023': metaThemeLightUplift,
};

export const metaThemeVariantPartials: MetaThemeVariantPartials = {
  light: metaThemeLightPartial,
  'Polaris-Summer-Editions-2023': metaThemeLightUpliftPartial,
};

export const metaThemeDefaultPartial =
  metaThemeVariantPartials[themeNameDefault];

export const metaThemeDefault = createMetaThemeVariant(metaThemeDefaultPartial);
