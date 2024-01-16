import {createVar} from '../utils';

import {createMetaTheme, createMetaThemePartial} from './utils';

export const metaThemeLightMobilePartial = createMetaThemePartial({
  text: {
    // heading-2xl
    'text-heading-2xl-font-size': {
      value: createVar('font-size-800'),
    },
    // heading-xl
    'text-heading-xl-font-size': {
      value: createVar('font-size-550'),
    },
    'text-heading-xl-font-line-height': {
      value: createVar('font-line-height-700'),
    },
    // heading-lg
    'text-heading-lg-font-size': {
      value: createVar('font-size-450'),
    },
    // heading-md
    'text-heading-md-font-size': {
      value: createVar('font-size-400'),
    },
    // heading-sm
    'text-heading-sm-font-size': {
      value: createVar('font-size-350'),
    },
    // body-lg
    'text-body-lg-font-size': {
      value: createVar('font-size-450'),
    },
    'text-body-lg-font-line-height': {
      value: createVar('font-line-height-700'),
    },
    // body-md
    'text-body-md-font-size': {
      value: createVar('font-size-400'),
    },
    'text-body-md-font-line-height': {
      value: createVar('font-line-height-600'),
    },
    // body-sm
    'text-body-sm-font-size': {
      value: createVar('font-size-350'),
    },
    'text-body-sm-font-line-height': {
      value: createVar('font-line-height-500'),
    },
    // body-xs
    'text-body-xs-font-size': {
      value: createVar('font-size-300'),
    },
    'text-body-xs-font-line-height': {
      value: createVar('font-line-height-400'),
    },
  },
});

export const metaThemeLightMobile = createMetaTheme(
  metaThemeLightMobilePartial,
);
