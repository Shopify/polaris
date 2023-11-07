import {size} from '../../size';
import type {MetaTokenProperties} from '../types';

export interface WidthCSSProperties {
  inlineSize: WidthScale;
}
export type WidthScale =
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

export type WidthTokenName = `width-${WidthScale}`;

export type WidthTokenGroup = {
  [TokenName in WidthTokenName]: string;
};

export const width: {
  [TokenName in WidthTokenName]: MetaTokenProperties;
} = {
  'width-0': {
    value: size[0],
  },
  'width-025': {
    value: size['025'],
  },
  'width-050': {
    value: size['050'],
  },
  'width-100': {
    value: size[100],
  },
  'width-150': {
    value: size[150],
  },
  'width-200': {
    value: size[200],
  },
  'width-300': {
    value: size[300],
  },
  'width-400': {
    value: size[400],
  },
  'width-500': {
    value: size[500],
  },
  'width-600': {
    value: size[600],
  },
  'width-700': {
    value: size[700],
  },
  'width-800': {
    value: size[800],
  },
  'width-900': {
    value: size[900],
  },
  'width-1000': {
    value: size[1000],
  },
  'width-1200': {
    value: size[1200],
  },
  'width-1600': {
    value: size[1600],
  },
  'width-2000': {
    value: size[2000],
  },
  'width-2400': {
    value: size[2400],
  },
  'width-2800': {
    value: size[2800],
  },
  'width-3200': {
    value: size[3200],
  },
};
