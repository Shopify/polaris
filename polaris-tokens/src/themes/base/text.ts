import type {MetaTokenProperties} from '../types';
import {createVar} from '../../utils';

import type {FontPrefix} from './font';

export type TextVariant =
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs';

export type TextTokenName = `text-${TextVariant}-${FontPrefix}`;

export type TextTokenGroup = {
  [TokenName in TextTokenName]: string;
};

export const text: {
  [TokenName in TextTokenName]: MetaTokenProperties;
} = {
  // heading-xl
  'text-heading-xl-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-heading-xl-font-size': {
    value: createVar('font-size-600'),
  },
  'text-heading-xl-font-weight': {
    value: createVar('font-weight-bold'),
  },
  'text-heading-xl-font-letter-spacing': {
    value: createVar('font-letter-spacing-dense'),
  },
  'text-heading-xl-font-line-height': {
    value: createVar('font-line-height-800'),
  },
  // heading-lg
  'text-heading-lg-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-heading-lg-font-size': {
    value: createVar('font-size-500'),
  },
  'text-heading-lg-font-weight': {
    value: createVar('font-weight-semibold'),
  },
  'text-heading-lg-font-letter-spacing': {
    value: createVar('font-letter-spacing-dense'),
  },
  'text-heading-lg-font-line-height': {
    value: createVar('font-line-height-600'),
  },
  // heading-md
  'text-heading-md-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-heading-md-font-size': {
    value: createVar('font-size-350'),
  },
  'text-heading-md-font-weight': {
    value: createVar('font-weight-semibold'),
  },
  'text-heading-md-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-heading-md-font-line-height': {
    value: createVar('font-line-height-500'),
  },
  // heading-sm
  'text-heading-sm-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-heading-sm-font-size': {
    value: createVar('font-size-325'),
  },
  'text-heading-sm-font-weight': {
    value: createVar('font-weight-semibold'),
  },
  'text-heading-sm-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-heading-sm-font-line-height': {
    value: createVar('font-line-height-500'),
  },
  // body-lg
  'text-body-lg-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-body-lg-font-size': {
    value: createVar('font-size-350'),
  },
  'text-body-lg-font-weight': {
    value: createVar('font-weight-regular'),
  },
  'text-body-lg-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-body-lg-font-line-height': {
    value: createVar('font-line-height-500'),
  },
  // body-md
  'text-body-md-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-body-md-font-size': {
    value: createVar('font-size-325'),
  },
  'text-body-md-font-weight': {
    value: createVar('font-weight-regular'),
  },
  'text-body-md-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-body-md-font-line-height': {
    value: createVar('font-line-height-500'),
  },
  // body-sm
  'text-body-sm-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-body-sm-font-size': {
    value: createVar('font-size-300'),
  },
  'text-body-sm-font-weight': {
    value: createVar('font-weight-regular'),
  },
  'text-body-sm-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-body-sm-font-line-height': {
    value: createVar('font-line-height-400'),
  },
  // body-xs
  'text-body-xs-font-family': {
    value: createVar('font-family-sans'),
  },
  'text-body-xs-font-size': {
    value: createVar('font-size-275'),
  },
  'text-body-xs-font-weight': {
    value: createVar('font-weight-regular'),
  },
  'text-body-xs-font-letter-spacing': {
    value: createVar('font-letter-spacing-normal'),
  },
  'text-body-xs-font-line-height': {
    value: createVar('font-line-height-300'),
  },
};
