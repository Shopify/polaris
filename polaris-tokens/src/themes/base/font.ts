import type {Experimental} from '../../types';
import {createVarName} from '../../utilities';
import type {MetaTokenProperties} from '../types';

type FontFamilyAlias = 'sans' | 'mono';

type FontSizeScaleExperimental = Experimental<'70' | '80'>;

export type FontSizeScale =
  | '275'
  | '325'
  | '350'
  | '750'
  | '900'
  | '1000'
  | '75'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | FontSizeScaleExperimental;

type FontLineHeightScaleExperimental = Experimental<'075'>;

export type FontLineHeightScale =
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '1000'
  | '1200'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | FontLineHeightScaleExperimental;

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
      "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  'font-family-mono': {
    value:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
  },
  'font-size-275': {
    value: createVar('font-size-70-experimental'),
  },
  'font-size-325': {
    value: createVar('font-size-80-experimental'),
  },
  'font-size-350': {
    value: createVar('font-size-100'),
  },
  'font-size-750': {
    value: createVar('font-size-500'),
  },
  'font-size-900': {
    value: createVar('font-size-600'),
  },
  'font-size-1000': {
    value: createVar('font-size-700'),
  },
  'font-size-70-experimental': {
    value: '11px',
  },
  'font-size-75': {
    value: '12px',
  },
  'font-size-80-experimental': {
    value: '13px',
  },
  'font-size-100': {
    value: '14px',
  },
  'font-size-200': {
    value: '16px',
  },
  'font-size-300': {
    value: '20px',
  },
  'font-size-400': {
    value: '24px',
  },
  'font-size-500': {
    value: '28px',
  },
  'font-size-600': {
    value: '32px',
  },
  'font-size-700': {
    value: '40px',
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
    value: createVar('font-line-height-075-experimental'),
  },
  'font-line-height-400': {
    value: createVar('font-line-height-1'),
  },
  'font-line-height-500': {
    value: createVar('font-line-height-2'),
  },
  'font-line-height-600': {
    value: createVar('font-line-height-3'),
  },
  'font-line-height-700': {
    value: createVar('font-line-height-4'),
  },
  'font-line-height-800': {
    value: createVar('font-line-height-5'),
  },
  'font-line-height-1000': {
    value: createVar('font-line-height-6'),
  },
  'font-line-height-1200': {
    value: createVar('font-line-height-7'),
  },
  'font-line-height-075-experimental': {
    value: '12px',
  },
  'font-line-height-1': {
    value: '16px',
  },
  'font-line-height-2': {
    value: '20px',
  },
  'font-line-height-3': {
    value: '24px',
  },
  'font-line-height-4': {
    value: '28px',
  },
  'font-line-height-5': {
    value: '32px',
  },
  'font-line-height-6': {
    value: '40px',
  },
  'font-line-height-7': {
    value: '48px',
  },
};

function createVar(fontTokenName: FontTokenName) {
  return `var(${createVarName(fontTokenName)})`;
}
