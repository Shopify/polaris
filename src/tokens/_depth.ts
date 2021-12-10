import type {TokenGroup} from './tokens';

export const depth: TokenGroup = {
  'shadow-transparent': '0 0 0 0 transparent',
  'shadow-faint': '0 1px 0 0 rgba(22, 29, 37, 0.05)',
  'shadow-base':
    '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
  'shadow-deep':
    '0 0 0 1px rgba(6, 44, 82, 0.1), 0 2px 16px rgba(33, 43, 54, 0.08)',
  'shadow-layer':
    '0 31px 41px 0 rgba(32, 42, 53, 0.2), 0 2px 16px 0 rgba(32, 42, 54, 0.08)',
  'card-shadow':
    '0 0 5px rgba(23, 24, 24, 0.05), 0 1px 2px rgba(0, 0, 0, 0.15)',
  'popover-shadow':
    '-1px 0 20px rgba(23, 24, 24, 0.05), 0 1px 5px rgba(0, 0, 0, 0.15)',
  'modal-shadow':
    '0 26px 80px rgba(0, 0, 0, 0.2), 0 0px 1px rgba(0, 0, 0, 0.2)',
  'top-bar-shadow': '0 2px 2px -1px rgba(0, 0, 0, 0.15)',
  'button-drop-shadow': '0 1px 0 rgba(0, 0, 0, 0.05)',
  'button-inner-shadow': 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
  'button-pressed-inner-shadow': 'inset 0 1px 0 rgba(0, 0, 0, 0.15)',
};
