import type {TokenGroup} from './tokens';

export const motion: TokenGroup = {
  'duration-1': '100ms',
  'duration-2': '200ms',
  'duration-3': '300ms',
  'duration-4': '400ms',
  'duration-5': '500m',
  'easing-base': 'cubic-bezier(0.64, 0, 0.35, 1)',
  'easing-in': 'cubic-bezier(0.36, 0, 1, 1)',
  'easing-out': 'cubic-bezier(0, 0, 0.42, 1)',
  'easing-excite': 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
  'easing-overshoot': 'cubic-bezier(0.07, 0.28, 0.32, 1.22)',
  'easing-anticipate': 'cubic-bezier(0.38, -0.4, 0.88, 0.65)',
};
