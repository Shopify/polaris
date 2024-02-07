import {createVar} from '../utils';

import {createMetaTheme, createMetaThemePartial} from './utils';

const buttonShadow = `0 0 0 ${createVar('border-width-025')} ${createVar(
  'color-border',
)} inset`;

export const metaThemeLightMobilePartial = createMetaThemePartial({
  color: {
    'color-button-bg-gradient-primary': {
      value: 'none',
    },
  },
  shadow: {
    'shadow-100': {
      value: 'none',
    },
    'shadow-bevel-100': {
      value: 'none',
    },
    'shadow-button': {
      value: buttonShadow,
    },
    'shadow-button-hover': {
      value: buttonShadow,
    },
    'shadow-button-inset': {
      value: buttonShadow,
    },
    'shadow-button-primary': {
      value: 'none',
    },
    'shadow-button-primary-hover': {
      value: 'none',
    },
    'shadow-button-primary-inset': {
      value: 'none',
    },
    'shadow-button-primary-critical': {
      value: 'none',
    },
    'shadow-button-primary-critical-hover': {
      value: 'none',
    },
    'shadow-button-primary-critical-inset': {
      value: 'none',
    },
    'shadow-button-primary-success': {
      value: 'none',
    },
    'shadow-button-primary-success-hover': {
      value: 'none',
    },
    'shadow-button-primary-success-inset': {
      value: 'none',
    },
  },
  space: {
    'space-card-gap': {
      value: createVar('space-200'),
    },
  },
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
