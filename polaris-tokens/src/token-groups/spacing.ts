import type {TokenGroup} from '../types';

export const spacing = {
  'space-025': {
    value: '1px',
  },
  'space-05': {
    value: '2px',
  },
  'space-1': {
    value: '4px',
  },
  'space-2': {
    value: '8px',
  },
  'space-3': {
    value: '12px',
  },
  'space-4': {
    value: '16px',
  },
  'space-5': {
    value: '20px',
  },
  'space-6': {
    value: '24px',
  },
  'space-8': {
    value: '32px',
  },
  'space-10': {
    value: '40px',
  },
  'space-12': {
    value: '48px',
  },
  'space-16': {
    value: '64px',
  },
  'space-20': {
    value: '80px',
  },
  'space-24': {
    value: '96px',
  },
  'space-28': {
    value: '112px',
  },
  'space-32': {
    value: '128px',
  },
};

export type SpacingTokenGroup = TokenGroup<typeof spacing>;
export type SpacingTokenName = keyof SpacingTokenGroup;

export const spacingSpaceScale = [
  '025',
  '05',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '16',
  '20',
  '24',
  '28',
  '32',
] as const;
export type SpacingSpaceScale = typeof spacingSpaceScale[number];
