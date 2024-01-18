import type {FontWeightAlias} from './base/font';
import {fontWeightAliasMap} from './base/font';
import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeLightMobilePartial = createMetaThemePartial({
  text: {
    'text-heading-3xl-font-family': {
      value: getWeightedFontFamily('bold'),
    },
    'text-heading-2xl-font-family': {
      value: getWeightedFontFamily('bold'),
    },
    'text-heading-xl-font-family': {
      value: getWeightedFontFamily('bold'),
    },
    'text-heading-lg-font-family': {
      value: getWeightedFontFamily('semibold'),
    },
    'text-heading-md-font-family': {
      value: getWeightedFontFamily('semibold'),
    },
    'text-heading-sm-font-family': {
      value: getWeightedFontFamily('semibold'),
    },
    'text-body-lg-font-family': {
      value: getWeightedFontFamily('regular'),
    },
    'text-body-md-font-family': {
      value: getWeightedFontFamily('regular'),
    },
    'text-body-sm-font-family': {
      value: getWeightedFontFamily('regular'),
    },
    'text-body-xs-font-family': {
      value: getWeightedFontFamily('regular'),
    },
  },
});

export const metaThemeLightMobile = createMetaTheme(
  metaThemeLightMobilePartial,
);

function getWeightedFontFamily(fontWeightAlias: FontWeightAlias) {
  return `Inter-${fontWeightAliasMap[fontWeightAlias]}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`;
}
