import type {MetaTokenProperties} from '../types';
import {shadows} from '../../shadows';

export type ShadowScale = '0' | '100' | '200' | '300' | '400' | '500' | '600';

export type ShadowBevelScale = Exclude<ShadowScale, '0'>;

export type ShadowInsetScale = '100' | '200';

export type ShadowAlias =
  | 'button'
  | 'button-hover'
  | 'button-inset'
  | 'button-primary'
  | 'button-primary-hover'
  | 'button-primary-inset'
  | 'button-primary-critical'
  | 'button-primary-critical-hover'
  | 'button-primary-critical-inset'
  | 'button-primary-success'
  | 'button-primary-success-hover'
  | 'button-primary-success-inset'
  | 'border-inset';

export type ShadowAliasOrScale =
  | ShadowAlias
  | ShadowScale
  | `bevel-${ShadowBevelScale}`
  | `inset-${ShadowInsetScale}`;

export type ShadowTokenName =
  | `shadow-${ShadowAliasOrScale}`
  | `shadow-bevel-${ShadowBevelScale}`
  | `shadow-inset-${ShadowInsetScale}`;

export type ShadowTokenGroup = {
  [TokenName in ShadowTokenName]: string;
};

export const shadow: {
  [TokenName in ShadowTokenName]: MetaTokenProperties;
} = {
  'shadow-0': {
    value: 'none',
  },
  'shadow-100': {
    value: shadows[100],
  },
  'shadow-200': {
    value: shadows[200],
  },
  'shadow-300': {
    value: shadows[300],
  },
  'shadow-400': {
    value: shadows[400],
  },
  'shadow-500': {
    value: shadows[500],
  },
  'shadow-600': {
    value: shadows[600],
  },
  'shadow-bevel-100': {
    value: `${shadows.bevel}, ${shadows[100]}`,
  },
  'shadow-bevel-200': {
    value: `${shadows.bevel}, ${shadows[200]}`,
  },
  'shadow-bevel-300': {
    value: `${shadows.bevel}, ${shadows[300]}`,
  },
  'shadow-bevel-400': {
    value: `${shadows.bevel}, ${shadows[400]}`,
  },
  'shadow-bevel-500': {
    value: `${shadows.bevel}, ${shadows[500]}`,
  },
  'shadow-bevel-600': {
    value: `${shadows.bevel}, ${shadows[600]}`,
  },
  'shadow-inset-100': {
    value:
      '0px 1px 2px 0px rgba(26, 26, 26, 0.15) inset, 0px 1px 1px 0px rgba(26, 26, 26, 0.15) inset',
  },
  'shadow-inset-200': {
    value:
      '0px 2px 1px 0px rgba(26, 26, 26, 0.20) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset, -1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset',
  },
  'shadow-button': {
    value:
      '0px 1px 0px 0px #E3E3E3 inset, 1px 0px 0px 0px #E3E3E3 inset, -1px 0px 0px 0px #E3E3E3 inset, 0px -1px 0px 0px #B5B5B5 inset',
  },
  'shadow-button-hover': {
    value:
      '0px 1px 0px 0px #EBEBEB inset, -1px 0px 0px 0px #EBEBEB inset, 1px 0px 0px 0px #EBEBEB inset, 0px -1px 0px 0px #CCC inset',
  },
  'shadow-button-inset': {
    value:
      '0px 2px 1px 0px rgba(26, 26, 26, 0.20) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset, -1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset',
  },
  'shadow-button-primary': {
    value:
      '0px 2px 0px 0px rgba(255, 255, 255, 0.2) inset, 2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1px 0px 1px #000 inset, 0px 1px 0px 0px #000 inset',
  },
  'shadow-button-primary-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1px 0px 0px #000 inset, 0px -1px 0px 1px #1A1A1A',
  },
  'shadow-button-primary-inset': {
    value: '0px 3px 0px 0px #000 inset',
  },
  'shadow-button-primary-critical': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-critical-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-critical-inset': {
    value:
      '0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset',
  },
  'shadow-button-primary-success': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-success-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-success-inset': {
    value:
      '0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset',
  },
  'shadow-border-inset': {
    value: '0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset',
  },
};
