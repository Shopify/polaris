import {size} from '../../size';
import type {Experimental} from '../../types';
import type {MetaTokenProperties} from '../types';

type SpaceScaleExperimental = Experimental<'1_5'>;

export type SpaceScale =
  | '0'
  | '025'
  | '050'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '800'
  | '1000'
  | '1200'
  | '1600'
  | '2000'
  | '2400'
  | '2800'
  | '3200'
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | SpaceScaleExperimental;

export type SpaceTokenName = `space-${SpaceScale}`;

export type SpaceTokenGroup = {
  [TokenName in SpaceTokenName]: string;
};

export const space: {
  [TokenName in SpaceTokenName]: MetaTokenProperties;
} = {
  'space-0': {
    value: size[0],
  },
  'space-025': {
    value: size['025'],
  },
  'space-050': {
    value: size['050'],
  },
  'space-100': {
    value: size[100],
  },
  'space-150': {
    value: size[150],
  },
  'space-200': {
    value: size[200],
  },
  'space-300': {
    value: size[300],
  },
  'space-400': {
    value: size[400],
  },
  'space-500': {
    value: size[500],
  },
  'space-600': {
    value: size[600],
  },
  'space-800': {
    value: size[800],
  },
  'space-1000': {
    value: size[1000],
  },
  'space-1200': {
    value: size[1200],
  },
  'space-1600': {
    value: size[1600],
  },
  'space-2000': {
    value: size[2000],
  },
  'space-2400': {
    value: size[2400],
  },
  'space-2800': {
    value: size[2800],
  },
  'space-3200': {
    value: size[3200],
  },
  'space-05': {
    value: '2px',
  },
  'space-1': {
    value: '4px',
  },
  'space-1_5-experimental': {
    value: '6px',
  },
  'space-2': {
    value: '8px',
  },
  'space-3': {
    value: '12px',
  },
  'space-4': {
    value: '16px',
  },
  'space-5': {
    value: '20px',
  },
  'space-6': {
    value: '24px',
  },
  'space-8': {
    value: '32px',
  },
  'space-10': {
    value: '40px',
  },
  'space-12': {
    value: '48px',
  },
  'space-16': {
    value: '64px',
  },
  'space-20': {
    value: '80px',
  },
  'space-24': {
    value: '96px',
  },
  'space-28': {
    value: '112px',
  },
  'space-32': {
    value: '128px',
  },
};
