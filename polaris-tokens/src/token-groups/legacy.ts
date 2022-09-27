import type {TokenGroup} from '../types';

export const legacy = {
  'override-loading-z-index': {
    value: '514',
  },
  'choice-size': {
    value: '20px',
  },
  'icon-size-small': {
    value: '8px',
  },
  'icon-size-medium': {
    value: '20px',
  },
  'choice-margin': {
    value: '1px',
  },
  'control-border-width': {
    value: '2px',
  },
  'banner-border-default': {
    value:
      'inset 0 1px 0 0 var(--p-border-neutral-subdued), inset 0 0 0 1px var(--p-border-neutral-subdued)',
  },
  'banner-border-success': {
    value:
      'inset 0 1px 0 0 var(--p-border-success-subdued), inset 0 0 0 1px var(--p-border-success-subdued)',
  },
  'banner-border-highlight': {
    value:
      'inset 0 1px 0 0 var(--p-border-highlight-subdued), inset 0 0 0 1px var(--p-border-highlight-subdued)',
  },
  'banner-border-warning': {
    value:
      'inset 0 1px 0 0 var(--p-border-warning-subdued), inset 0 0 0 1px var(--p-border-warning-subdued)',
  },
  'banner-border-critical': {
    value:
      'inset 0 1px 0 0 var(--p-border-critical-subdued), inset 0 0 0 1px var(--p-border-critical-subdued)',
  },
  'thin-border-subdued': {
    value: '1px solid var(--p-border-subdued)',
  },
  'text-field-spinner-offset': {
    value: '2px',
  },
  'text-field-focus-ring-offset': {
    value: '-4px',
  },
  'button-group-item-spacing': {
    value: '-1px',
  },
  'range-slider-thumb-size-base': {
    value: '16px',
  },
  'range-slider-thumb-size-active': {
    value: '24px',
  },
  'frame-offset': {
    value: '0px',
  },
};

export type LegacyTokenGroup = TokenGroup<typeof legacy>;
export type LegacyTokenName = keyof LegacyTokenGroup;
