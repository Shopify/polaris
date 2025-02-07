import type {MetaTokenProperties} from '../types';

export type ShadowScale = '0' | '100' | '200' | '300' | '400' | '500' | '600';

export type ShadowBevelScale = '100';

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

export type ShadowAliasOrScale = ShadowAlias | ShadowScale;

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
    value: '0px 1px 0px 0px rgba(26, 26, 26, 0.07)',
  },
  'shadow-200': {
    value: '0px 3px 1px -1px rgba(26, 26, 26, 0.07)',
  },
  'shadow-300': {
    value: '0px 4px 6px -2px rgba(26, 26, 26, 0.20)',
  },
  'shadow-400': {
    value: '0px 8px 16px -4px rgba(26, 26, 26, 0.22)',
  },
  'shadow-500': {
    value: '0px 12px 20px -8px rgba(26, 26, 26, 0.24)',
  },
  'shadow-600': {
    value: '0px 20px 20px -8px rgba(26, 26, 26, 0.28)',
  },
  'shadow-bevel-100': {
    value:
      '1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset',
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
      '0px -1px 0px 0px #b5b5b5 inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.1) inset, 0px 0.5px 0px 1.5px #FFF inset',
  },
  'shadow-button-hover': {
    value:
      '0px 1px 0px 0px #EBEBEB inset, -1px 0px 0px 0px #EBEBEB inset, 1px 0px 0px 0px #EBEBEB inset, 0px -1px 0px 0px #CCC inset',
  },
  'shadow-button-inset': {
    value:
      '-1px 0px 1px 0px rgba(26, 26, 26, 0.122) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.122) inset, 0px 2px 1px 0px rgba(26, 26, 26, 0.2) inset',
  },
  'shadow-button-primary': {
    value:
      '0px -1px 0px 1px rgba(0, 0, 0, 0.8) inset, 0px 0px 0px 1px rgba(48, 48, 48, 1) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.25) inset',
  },
  'shadow-button-primary-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1px 0px 0px #000 inset, 0px -1px 0px 1px #1A1A1A',
  },
  'shadow-button-primary-inset': {
    value: '0px 3px 0px 0px rgb(0, 0, 0) inset',
  },
  'shadow-button-primary-critical': {
    value:
      '0px -1px 0px 1px rgba(142, 31, 11, 0.8) inset, 0px 0px 0px 1px rgba(181, 38, 11, 0.8) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.349) inset',
  },
  'shadow-button-primary-critical-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-critical-inset': {
    value:
      '-1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 0px 2px 0px 0px rgba(0, 0, 0, 0.6) inset',
  },
  'shadow-button-primary-success': {
    value:
      '0px -1px 0px 1px rgba(12, 81, 50, 0.8) inset, 0px 0px 0px 1px rgba(19, 111, 69, 0.8) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.251) inset',
  },
  'shadow-button-primary-success-hover': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-success-inset': {
    value:
      '-1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 0px 2px 0px 0px rgba(0, 0, 0, 0.6) inset',
  },
  'shadow-border-inset': {
    value: '0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset',
  },
};
