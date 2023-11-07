import type {MetaTokenProperties} from '../types';

export const typeMap = {
  ZindexZScale: ['z-index'],
};
export type ZIndexZScale =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type ZIndexTokenName = `z-index-${ZIndexZScale}`;

export type ZIndexTokenGroup = {
  [TokenName in ZIndexTokenName]: string;
};

export const zIndex: {
  [TokenName in ZIndexTokenName]: MetaTokenProperties;
} = {
  'z-index-0': {
    value: 'auto',
  },
  'z-index-1': {
    value: '100',
  },
  'z-index-2': {
    value: '400',
  },
  'z-index-3': {
    value: '510',
  },
  'z-index-4': {
    value: '512',
  },
  'z-index-5': {
    value: '513',
  },
  'z-index-6': {
    value: '514',
  },
  'z-index-7': {
    value: '515',
  },
  'z-index-8': {
    value: '516',
  },
  'z-index-9': {
    value: '517',
  },
  'z-index-10': {
    value: '518',
  },
  'z-index-11': {
    value: '519',
  },
  'z-index-12': {
    value: '520',
  },
};
