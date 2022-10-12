import type {TokenGroup} from '../types';

export const shape = {
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

export type ShapeTokenGroup = TokenGroup<typeof shape>;
export type ShapeTokenName = keyof ShapeTokenGroup;

export const borderRadiusScale = ['05', '1', '2', '3', '4', '5', '6'] as const;
export type ShapeBorderRadiusScale = typeof borderRadiusScale[number];

export const borderRadiusAlias = ['base', 'large', 'half'] as const;
export type ShapeBorderRadiusAlias = typeof borderRadiusAlias[number];
