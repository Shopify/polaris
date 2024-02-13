import {size} from '../../size';
import type {MetaTokenProperties} from '../types';

export type FontFamilyPrefix = 'font-family';
type FontFamilyAlias = 'sans' | 'mono';

export type FontSizePrefix = 'font-size';
export type FontSizeScale =
  | '275'
  | '300'
  | '325'
  | '350'
  | '400'
  | '500'
  | '600';

export type FontLineHeightPrefix = 'font-line-height';
export type FontLineHeightScale = '300' | '400' | '500' | '600' | '700' | '800';

export type FontLetterSpacingPrefix = 'font-letter-spacing';
export type FontLetterSpacingAlias = 'dense' | 'normal';

export type FontWeightPrefix = 'font-weight';
export type FontWeightAlias = 'regular' | 'medium' | 'semibold' | 'bold';

export type FontPrefix =
  | FontFamilyPrefix
  | FontLetterSpacingPrefix
  | FontLineHeightPrefix
  | FontSizePrefix
  | FontWeightPrefix;

export type FontTokenName =
  | `${FontFamilyPrefix}-${FontFamilyAlias}`
  | `${FontLetterSpacingPrefix}-${FontLetterSpacingAlias}`
  | `${FontLineHeightPrefix}-${FontLineHeightScale}`
  | `${FontSizePrefix}-${FontSizeScale}`
  | `${FontWeightPrefix}-${FontWeightAlias}`;

export type FontTokenGroup = {
  [TokenName in FontTokenName]: string;
};

export const font: {
  [TokenName in FontTokenName]: MetaTokenProperties;
} = {
  'font-family-sans': {
    value:
      "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  'font-family-mono': {
    value:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
  },
  'font-size-275': {
    value: size[275],
  },
  'font-size-300': {
    value: size[300],
  },
  'font-size-325': {
    value: size[325],
  },
  'font-size-350': {
    value: size[350],
  },
  'font-size-400': {
    value: size[400],
  },
  'font-size-500': {
    value: size[500],
  },
  'font-size-600': {
    value: size[600],
  },
  'font-weight-regular': {
    value: '450',
  },
  'font-weight-medium': {
    value: '550',
  },
  'font-weight-semibold': {
    value: '650',
  },
  'font-weight-bold': {
    value: '700',
  },
  'font-letter-spacing-dense': {
    value: '-0.2px',
  },
  'font-letter-spacing-normal': {
    value: '0px',
  },
  'font-line-height-300': {
    value: size[300],
  },
  'font-line-height-400': {
    value: size[400],
  },
  'font-line-height-500': {
    value: size[500],
  },
  'font-line-height-600': {
    value: size[600],
  },
  'font-line-height-700': {
    value: size[700],
  },
  'font-line-height-800': {
    value: size[800],
  },
};
