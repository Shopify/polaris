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
    value: '0px',
  },
  'space-025': {
    value: '1px',
  },
  'space-050': {
    value: '2px',
  },
  'space-100': {
    value: '4px',
  },
  'space-150': {
    value: '6px',
  },
  'space-200': {
    value: '8px',
  },
  'space-300': {
    value: '12px',
  },
  'space-400': {
    value: '16px',
  },
  'space-500': {
    value: '20px',
  },
  'space-600': {
    value: '24px',
  },
  'space-800': {
    value: '32px',
  },
  'space-1000': {
    value: '40px',
  },
  'space-1200': {
    value: '48px',
  },
  'space-1600': {
    value: '64px',
  },
  'space-2000': {
    value: '80px',
  },
  'space-2400': {
    value: '96px',
  },
  'space-2800': {
    value: '112px',
  },
  'space-3200': {
    value: '128px',
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
