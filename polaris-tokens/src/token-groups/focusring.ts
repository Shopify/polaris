import type {TokenGroup} from '../types';

import {colors} from './colors';

export const focusRing = {
  'focusRing-offset-1': {
    value: '2px',
    description: '',
  },
  'focusRing-base': {
    value: `2px transparent solid`,
    description: '',
  },
  'focusRing-focused': {
    value: `2px ${colors.focused.value} solid`,
    description: '',
  },
};

export type FocusRingTokenGroup = TokenGroup<typeof focusRing>;
export type FocusRingTokenName = keyof FocusRingTokenGroup;
