import {size} from '../../size';
import type {MetaTokenProperties} from '../types';
import {createVar as createVarName} from '../../utilities';

type FontFamilyAlias = 'sans' | 'mono';

export type FontSizeScale =
  | '275'
  | '300'
  | '325'
  | '350'
  | '400'
  | '500'
  | '600'
  | '750'
  | '900'
  | '1000';

export type FontLineHeightScale =
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '1000'
  | '1200';

export type FontWeightAlias = 'regular' | 'medium' | 'semibold' | 'bold';

export type FontTokenName =
  | `font-family-${FontFamilyAlias}`
  | `font-size-${FontSizeScale}`
  | `font-weight-${FontWeightAlias}`
  | `font-line-height-${FontLineHeightScale}`;

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
    value: '20px',
  },
  'font-size-325': {
    value: size[325],
  },
  'font-size-350': {
    value: size[350],
  },
  'font-size-400': {
    value: '24px',
  },
  'font-size-500': {
    value: '30px',
  },
  'font-size-600': {
    value: '36px',
  },
  'font-size-750': {
    value: size[750],
  },
  'font-size-900': {
    value: size[900],
  },
  'font-size-1000': {
    value: size[1000],
  },
  'font-weight-regular': {
    value: '400',
  },
  'font-weight-medium': {
    value: '500',
  },
  'font-weight-semibold': {
    value: '600',
  },
  'font-weight-bold': {
    value: '700',
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
  'font-line-height-1000': {
    value: size[1000],
  },
  'font-line-height-1200': {
    value: size[1200],
  },
};

export function createVar(fontTokenName: FontTokenName) {
  return `var(${createVarName(fontTokenName)})`;
}
