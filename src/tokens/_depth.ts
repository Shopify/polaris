import type {TokenGroup} from './tokens';

export const depth: TokenGroup = {
  'card-shadow':
    '0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px var(--p-shadow-from-direct-light)',
  'popover-shadow':
    '-1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px var(--p-shadow-from-direct-light)',
  'modal-shadow':
    '0px 26px 80px var(--p-shadow-from-dim-light), 0px 0px 1px var(--p-shadow-from-dim-light)',
  'top-bar-shadow': '0 2px 2px -1px var(--p-shadow-from-direct-light)',
  'button-drop-shadow': '0 1px 0 rgba(0, 0, 0, 0.05)',
  'button-inner-shadow': 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
  'button-pressed-inner-shadow': 'inset 0 1px 0 rgba(0, 0, 0, 0.15)',
};
