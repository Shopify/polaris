import {size} from '../../size';
import type {MetaTokenProperties, ObjectFromKeys} from '../types';

export const mappedHeightStyleProps = [
  // Logical properties
  'blockSize',
  'minBlockSize',
  'maxBlockSize',
  // Positional properties
  'height',
  'minHeight',
  'maxHeight',
  'containIntrinsicHeight',
] as const;
export type MappedHeightStyleProps = ObjectFromKeys<
  typeof mappedHeightStyleProps,
  `height-${HeightScale}`
>;

export type HeightScale =
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
  | '700'
  | '800'
  | '900'
  | '1000'
  | '1200'
  | '1600'
  | '2000'
  | '2400'
  | '2800'
  | '3200';

export type HeightTokenName = `height-${HeightScale}`;

export type HeightTokenGroup = {
  [TokenName in HeightTokenName]: string;
};

export const height: {
  [TokenName in HeightTokenName]: MetaTokenProperties;
} = {
  'height-0': {
    value: size[0],
  },
  'height-025': {
    value: size['025'],
  },
  'height-050': {
    value: size['050'],
  },
  'height-100': {
    value: size[100],
  },
  'height-150': {
    value: size[150],
  },
  'height-200': {
    value: size[200],
  },
  'height-300': {
    value: size[300],
  },
  'height-400': {
    value: size[400],
  },
  'height-500': {
    value: size[500],
  },
  'height-600': {
    value: size[600],
  },
  'height-700': {
    value: size[700],
  },
  'height-800': {
    value: size[800],
  },
  'height-900': {
    value: size[900],
  },
  'height-1000': {
    value: size[1000],
  },
  'height-1200': {
    value: size[1200],
  },
  'height-1600': {
    value: size[1600],
  },
  'height-2000': {
    value: size[2000],
  },
  'height-2400': {
    value: size[2400],
  },
  'height-2800': {
    value: size[2800],
  },
  'height-3200': {
    value: size[3200],
  },
};
