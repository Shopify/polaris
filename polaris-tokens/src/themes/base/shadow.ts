import {createVarName} from '../../utilities';
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
    value: '0px 0px 2px rgba(31, 33, 36, 0.24)',
  },
  'shadow-200': {
    value: '0px 1px 1px rgba(31, 33, 36, 0.1)',
  },
  'shadow-300': {
    value:
      '0px 2px 4px rgba(31, 33, 36, 0.1), 0px 1px 6px rgba(31, 33, 36, 0.05)',
  },
  'shadow-400': {
    value:
      '0px 4px 12px rgba(31, 33, 36, 0.2), 0px 2px 6px rgba(31, 33, 36, 0.05)',
  },
  'shadow-500': {
    value:
      '0px 4px 18px -2px rgba(31, 33, 36, 0.08), 0px 12px 18px -2px rgba(31, 33, 36, 0.15)',
  },
  'shadow-600': {
    value:
      '0px 32px 32px rgba(31, 33, 36, 0.15), 0px 32px 56px -2px rgba(31, 33, 36, 0.16)',
  },
  'shadow-bevel-100': {
    value:
      '1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset',
  },
  'shadow-inset-100': {
    value: 'inset 0px 0px 3px rgba(31, 33, 36, 0.56)',
  },
  'shadow-inset-200': {
    value: 'inset 0px 2px 4px rgba(31, 33, 36, 0.32)',
  },
  'shadow-button': {
    value:
      'inset 0px -1px 0px #B5B5B5, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
  'shadow-button-hover': {
    value: `inset 0px -1px 0px #CCCCCC, inset 1px 0px 0px #EBEBEB, inset -1px 0px 0px #EBEBEB, inset 0px 1px 0px #EBEBEB`,
  },
  'shadow-button-inset': {
    value: createVar('shadow-inset-200'),
  },
  'shadow-button-primary': {
    value: `0px 2px 0px 0px rgba(255, 255, 255, 0.2) inset, 2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1px 0px 1px #000 inset, 0px 1px 0px 0px #000 inset`,
  },
  'shadow-button-primary-hover': {
    value: `0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 0px 0px 0.5px #1A1A1A`,
  },
  'shadow-button-primary-inset': {
    value: `0px 3px 0px 0px #000 inset`,
  },
  'shadow-button-primary-critical': {
    value: `0px 1px 0px 0px rgba(255, 255, 255, 0.4) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset`,
  },
  'shadow-button-primary-critical-hover': {
    value: `-1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px 0.5px 0px 0px rgba(0, 0, 0, 0.25), 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset`,
  },
  'shadow-button-primary-critical-inset': {
    value: `0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset`,
  },
  'shadow-button-primary-success': {
    value: `0px 1px 0px 0px rgba(255, 255, 255, 0.4) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset`,
  },
  'shadow-button-primary-success-hover': {
    value: `-1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px 0.5px 0px 0px rgba(0, 0, 0, 0.25), 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset`,
  },
  'shadow-button-primary-success-inset': {
    value: `0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset`,
  },
  'shadow-border-inset': {
    value: `0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset`,
  },
};

function createVar(shadowTokenName: ShadowTokenName) {
  return `var(${createVarName(shadowTokenName)})`;
}
