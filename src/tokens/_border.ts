import type {TokenGroup} from './tokens';

export const border: TokenGroup = {
  'banner-border-critical':
    'inset 0 0.1rem 0 0 var(--p-border-critical-subdued), inset 0 0 0 0.1rem var(--p-border-critical-subdued)',
  'banner-border-default':
    'inset 0 0.1rem 0 0 var(--p-border-neutral-subdued), inset 0 0 0 0.1rem var(--p-border-neutral-subdued)',
  'banner-border-highlight':
    'inset 0 0.1rem 0 0 var(--p-border-highlight-subdued), inset 0 0 0 0.1rem var(--p-border-highlight-subdued)',
  'banner-border-success':
    'inset 0 0.1rem 0 0 var(--p-border-success-subdued), inset 0 0 0 0.1rem var(--p-border-success-subdued)',
  'banner-border-warning':
    'inset 0 0.1rem 0 0 var(--p-border-warning-subdued), inset 0 0 0 0.1rem var(--p-border-warning-subdued)',
  'border-radius-base': '0.4rem',
  'border-radius-small': '3px',
  'border-radius-large': '6px',
  'border-radius-full': '50%',
  'border-radius-slim': '0.2rem',
  'border-radius-wide': '0.8rem',
  'control-border-width': '0.2rem',
  'thin-border-subdued': '0.1rem solid var(--p-border-subdued)',
};
