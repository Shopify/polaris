import type {MetadataProperties} from '../types';

export type ShapeBorderRadiusScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'full';

export type ShapeBorderRadiusAlias = 'base' | 'large' | 'half';

export type ShapeBorderWidthScale = '1' | '2' | '3' | '4' | '5';

type ShapeBorderAlias =
  | 'base'
  | 'dark'
  | 'transparent'
  | 'divider'
  | 'divider-on-dark';

export type ShapeTokenName =
  | `border-radius-${ShapeBorderRadiusScale}`
  | `border-radius-${ShapeBorderRadiusAlias}`
  | `border-width-${ShapeBorderWidthScale}`
  | `border-${ShapeBorderAlias}`;

export type ShapeTokenGroup = {
  [TokenName in ShapeTokenName]: string;
};

export const shape: {
  [TokenName in ShapeTokenName]: MetadataProperties;
} = {
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
  'border-radius-full': {
    value: '9999px',
  },
  'border-radius-base': {
    value: '3px',
  },
  'border-radius-large': {
    value: '6px',
  },
  'border-radius-half': {
    value: '50%',
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
  'border-base': {
    value: 'var(--p-border-width-1) solid var(--p-border-subdued)',
  },
  'border-dark': {
    value: 'var(--p-border-width-1) solid var(--p-border)',
  },
  'border-transparent': {
    value: 'var(--p-border-width-1) solid transparent',
  },
  'border-divider': {
    value: 'var(--p-border-width-1) solid var(--p-divider)',
  },
  'border-divider-on-dark': {
    value: 'var(--p-border-width-1) solid var(--p-divider-dark)',
  },
};
