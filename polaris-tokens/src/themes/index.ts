import type {MetaThemeVariantPartials} from './types';
import {createMetaThemeVariant} from './utils';
import {themeNameDefault} from './constants';
import {metaThemeLightPartial} from './light';
import {metaThemeLightUpliftPartial} from './light-uplift';

export {createMetaThemeVariant} from './utils';

export const metaThemeVariantPartials: MetaThemeVariantPartials = {
  light: metaThemeLightPartial,
  'Polaris-Summer-Editions-2023': metaThemeLightUpliftPartial,
};

export const metaThemeDefaultPartial =
  metaThemeVariantPartials[themeNameDefault];

export const metaThemeDefault = createMetaThemeVariant(metaThemeDefaultPartial);
