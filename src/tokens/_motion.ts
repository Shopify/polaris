import type {TokenGroup} from './tokens';

export const motion: TokenGroup = {
  'duration-0': '0ms',
  'duration-50': '50ms',
  'duration-100': '100ms',
  'duration-150': '150ms',
  'duration-200': '200ms',
  'duration-250': '250ms',
  'duration-300': '300ms',
  'duration-350': '350ms',
  'duration-400': '400ms',
  'duration-450': '450ms',
  'duration-500': '500ms',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  linear: 'cubic-bezier(0, 0, 1, 1)',
  'ease-excite': 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
};
