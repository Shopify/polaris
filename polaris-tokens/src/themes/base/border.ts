import type {Experimental} from '../../types';
import type {MetaTokenProperties} from '../types';
import {size} from '../../size';

type BorderRadiusScaleExperimental = Experimental<'0' | '1_5'>;

export type BorderRadiusScale =
  | '0'
  | '050'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '750'
  | 'full'
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | BorderRadiusScaleExperimental;

type BorderWidthScaleExperimental = Experimental<'1' | '2'>;

export type BorderWidthScale =
  | '0165'
  | '025'
  | '050'
  | '100'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | BorderWidthScaleExperimental;

export type BorderTokenName =
  | `border-radius-${BorderRadiusScale}`
  | `border-width-${BorderWidthScale}`;

export type BorderTokenGroup = {
  [TokenName in BorderTokenName]: string;
};

export const border: {
  [TokenName in BorderTokenName]: MetaTokenProperties;
} = {
  'border-radius-0': {
    value: size[0],
  },
  'border-radius-050': {
    value: size['050'],
  },
  'border-radius-100': {
    value: size[100],
  },
  'border-radius-150': {
    value: size[150],
  },
  'border-radius-200': {
    value: size[200],
  },
  'border-radius-300': {
    value: size[300],
  },
  'border-radius-400': {
    value: size[400],
  },
  'border-radius-500': {
    value: size[500],
  },
  'border-radius-750': {
    value: size[750],
  },
  'border-radius-full': {
    value: '9999px',
  },
  'border-radius-0-experimental': {
    value: '0px',
  },
  'border-radius-05': {
    value: '2px',
  },
  'border-radius-1': {
    value: '4px',
  },
  'border-radius-2': {
    value: '8px',
  },
  'border-radius-3': {
    value: '12px',
  },
  'border-radius-4': {
    value: '16px',
  },
  'border-radius-5': {
    value: '20px',
  },
  'border-radius-6': {
    value: '30px',
  },
  'border-radius-1_5-experimental': {
    value: '6px',
  },
  'border-width-0165': {
    value: size['0165'],
  },
  'border-width-025': {
    value: size['025'],
  },
  'border-width-050': {
    value: size['050'],
  },
  'border-width-100': {
    value: size[100],
  },
  'border-width-1': {
    value: '1px',
  },
  'border-width-2': {
    value: '2px',
  },
  'border-width-3': {
    value: '3px',
  },
  'border-width-4': {
    value: '4px',
  },
  'border-width-5': {
    value: '5px',
  },
  'border-width-1-experimental': {
    value: '0.66px',
  },
  'border-width-2-experimental': {
    value: '1px',
  },
};
