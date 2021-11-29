import type {TokenGroup} from './tokens';

/**
 * This file contains legacy design tokens that have not yet been categorized
 * and organized into files. The goal is to eventually remove this file by
 * categorizing tokens by group, moving them into separate files, and/or
 * deprecating any undesired tokens.
 */
export const legacyTokens: TokenGroup = {
  'card-shadow':
    '0px 0px 5px var(--p-shadow-from-ambient-light), 0px 1px 2px var(--p-shadow-from-direct-light)',
  'popover-shadow':
    '-1px 0px 20px var(--p-shadow-from-ambient-light), 0px 1px 5px var(--p-shadow-from-direct-light)',
  'modal-shadow':
    '0px 26px 80px var(--p-shadow-from-dim-light), 0px 0px 1px var(--p-shadow-from-dim-light)',
  'top-bar-shadow': '0 2px 2px -1px var(--p-shadow-from-direct-light)',
  'button-drop-shadow': '0 1px 0 rgba(0, 0, 0, 0.05)',
  'button-inner-shadow': 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
  'button-pressed-inner-shadow': 'inset 0 1px 0 rgba(0, 0, 0, 0.15)',
  'override-loading-z-index': '514',
  'choice-size': '2rem',
  'icon-size': '1rem',
  'choice-margin': '0.1rem',
  'text-field-spinner-offset': '0.2rem',
  'text-field-focus-ring-offset': '-0.4rem',
  'button-group-item-spacing': '-0.1rem',
  'duration-100': '100ms',
  'duration-150': '150ms',
  'ease-in': 'cubic-bezier(0.5, 0.1, 1, 1)',
  ease: 'cubic-bezier(0.4, 0.22, 0.28, 1)',
  'range-slider-thumb-size-base': '1.6rem',
  'range-slider-thumb-size-active': '2.4rem',
  'frame-offset': '0px',
};
