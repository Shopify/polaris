import type {TokenGroup} from '../types';

import {colors} from './colors';

export const focusring = {
  'ring-offset-1': {
    value: '2px',
    description: '',
  },
  'ring-base': {
    value: `2px transparent solid`,
    description: '',
  },
  'ring-focused': {
    value: `2px ${colors.focused.value} solid`,
    description: '',
  },
};

export type FocusRingsTokenGroup = TokenGroup<typeof focusring>;
export type FocusRingsTokenName = keyof FocusRingsTokenGroup;
