import type {MetaTokenProperties} from '../types';
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

export type BorderRadiusAlias = 'full';

export type BorderRadiusAliasOrScale = BorderRadiusAlias | BorderRadiusScale;

export type BorderWidthScale = '0' | '0165' | '025' | '050' | '100';

export type BorderTokenName =
  | `border-radius-${BorderRadiusAliasOrScale}`
  | `border-width-${BorderWidthScale}`;

export type BorderTokenGroup = {
  [TokenName in BorderTokenName]: string;
};

export type BorderStyleProps = {
  [T in (typeof borderRadiusStyleProps)[number]]?: BorderRadiusAliasOrScale;
} & {
  [T in (typeof borderWidthStyleProps)[number]]?: BorderWidthScale;
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
  'border-width-0': {
    value: size['0'],
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

const borderRadiusStyleProps = [
  // Shorthand
  'borderRadius',
  // Logical properties
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
  // Positional properties
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] as const;

const borderWidthStyleProps = [
  // Shorthand
  'borderWidth',
  'outlineWidth',
  // Logical properties
  'borderBlockStartWidth',
  'borderBlockEndWidth',
  'borderInlineStartWidth',
  'borderInlineEndWidth',
  'borderInlineWidth',
  'borderBlockWidth',
  // Positional properties
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
] as const;

export const borderStylePropTokenGroups = {
  'border-radius': borderRadiusStyleProps,
  'border-width': borderWidthStyleProps,
} as const;
