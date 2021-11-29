import type {TokenGroup} from './tokens';

export const border: TokenGroup = {
  'border-radius-slim': '0.2rem',
  'border-radius-base': '0.4rem',
  'border-radius-wide': '0.8rem',
  'border-radius-full': '50%',
  'control-border-width': '0.2rem',
  'banner-border-default':
    'inset 0 0.1rem 0 0 var(--p-border-neutral-subdued), inset 0 0 0 0.1rem var(--p-border-neutral-subdued)',
  'banner-border-success':
    'inset 0 0.1rem 0 0 var(--p-border-success-subdued), inset 0 0 0 0.1rem var(--p-border-success-subdued)',
  'banner-border-highlight':
    'inset 0 0.1rem 0 0 var(--p-border-highlight-subdued), inset 0 0 0 0.1rem var(--p-border-highlight-subdued)',
  'banner-border-warning':
    'inset 0 0.1rem 0 0 var(--p-border-warning-subdued), inset 0 0 0 0.1rem var(--p-border-warning-subdued)',
  'banner-border-critical':
    'inset 0 0.1rem 0 0 var(--p-border-critical-subdued), inset 0 0 0 0.1rem var(--p-border-critical-subdued)',
  'thin-border-subdued': '0.1rem solid var(--p-border-subdued)',
};
