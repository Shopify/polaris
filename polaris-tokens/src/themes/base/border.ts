import type {Experimental} from '../../types';
import type {MetaTokenProperties} from '../types';

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
    value: createVar('border-radius-0-experimental'),
  },
  'border-radius-050': {
    value: createVar('border-radius-05'),
  },
  'border-radius-100': {
    value: createVar('border-radius-1'),
  },
  'border-radius-150': {
    value: createVar('border-radius-1_5-experimental'),
  },
  'border-radius-200': {
    value: createVar('border-radius-2'),
  },
  'border-radius-300': {
    value: createVar('border-radius-3'),
  },
  'border-radius-400': {
    value: createVar('border-radius-4'),
  },
  'border-radius-500': {
    value: createVar('border-radius-5'),
  },
  'border-radius-750': {
    value: createVar('border-radius-6'),
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
    value: createVar('border-width-1-experimental'),
  },
  'border-width-025': {
    value: createVar('border-width-1'),
  },
  'border-width-050': {
    value: createVar('border-width-2'),
  },
  'border-width-100': {
    value: createVar('border-width-4'),
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

function createVar(borderTokenName: BorderTokenName) {
  return `var(--p-${borderTokenName})`;
}
