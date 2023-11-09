import type {MetaTokenProperties, ObjectFromKeys} from '../types';
import {size} from '../../size';

export type BorderRadiusScale =
  | '0'
  | '050'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '750';

const mappedBorderRadiusStyleProps = ['borderRadius'] as const;
type MappedBorderRadiusStypeProps = ObjectFromKeys<
  typeof mappedBorderRadiusStyleProps,
  `border-radius-${BorderRadiusAliasOrScale}`
>;

const mappedBorderWidthStyleProps = ['borderWidth'] as const;
type MappedBorderWidthStyleProps = ObjectFromKeys<
  typeof mappedBorderWidthStyleProps,
  `border-width-${BorderWidthScale}`
>;

export const mappedBorderStyleProps = [
  ...mappedBorderRadiusStyleProps,
  ...mappedBorderWidthStyleProps,
];

export type MappedBorderStyleProps = MappedBorderRadiusStypeProps &
  MappedBorderWidthStyleProps;

export type BorderRadiusAlias = 'full';

export type BorderRadiusAliasOrScale = BorderRadiusAlias | BorderRadiusScale;

export type BorderWidthScale = '0165' | '025' | '050' | '100';

export type BorderTokenName =
  | `border-radius-${BorderRadiusAliasOrScale}`
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
};
