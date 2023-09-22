import {size} from '../../size';
import type {Experimental} from '../../types';
import {createVarName} from '../../utilities';
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

export type SpaceAlias =
  | 'button-group-gap'
  | 'card-gap'
  | 'card-padding'
  | 'table-cell-padding';

export type SpaceAliasOrScale = SpaceAlias | SpaceScale;

export type SpaceTokenName = `space-${SpaceAliasOrScale}`;

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
    value: createVar('space-05'),
  },
  'space-100': {
    value: createVar('space-1'),
  },
  'space-150': {
    value: createVar('space-1_5-experimental'),
  },
  'space-200': {
    value: createVar('space-2'),
  },
  'space-300': {
    value: createVar('space-3'),
  },
  'space-400': {
    value: createVar('space-4'),
  },
  'space-500': {
    value: createVar('space-5'),
  },
  'space-600': {
    value: createVar('space-6'),
  },
  'space-800': {
    value: createVar('space-8'),
  },
  'space-1000': {
    value: createVar('space-10'),
  },
  'space-1200': {
    value: createVar('space-12'),
  },
  'space-1600': {
    value: createVar('space-16'),
  },
  'space-2000': {
    value: createVar('space-20'),
  },
  'space-2400': {
    value: createVar('space-24'),
  },
  'space-2800': {
    value: createVar('space-28'),
  },
  'space-3200': {
    value: createVar('space-32'),
  },
  'space-button-group-gap': {
    value: createVar('space-200'),
  },
  'space-card-gap': {
    value: createVar('space-400'),
  },
  'space-card-padding': {
    value: createVar('space-400'),
  },
  'space-table-cell-padding': {
    value: createVar('space-150'),
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

function createVar(spaceTokenName: SpaceTokenName) {
  return `var(${createVarName(spaceTokenName)})`;
}
