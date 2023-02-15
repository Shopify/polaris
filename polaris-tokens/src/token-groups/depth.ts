import type {MetadataProperties} from '../types';

export type DepthShadowAlias =
  | 'base'
  | 'transparent'
  | 'faint'
  | 'deep'
  | 'button'
  | 'top-bar'
  | 'card'
  | 'popover'
  | 'layer'
  | 'modal';

type DepthShadowsAlias = 'inset-button' | 'inset-button-pressed';

export type DepthTokenName =
  | `shadow-${DepthShadowAlias}`
  | `shadows-${DepthShadowsAlias}`;

export type DepthTokenGroup = {
  [TokenName in DepthTokenName]: string;
};

export const depth: {
  [TokenName in DepthTokenName]: MetadataProperties;
} = {
  'shadow-transparent': {
    value: '0 0 0 0 transparent',
  },
  'shadow-faint': {
    value: '0 1px 0 0 rgba(22, 29, 37, 0.05)',
  },
  'shadow-base': {
    value:
      '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
  },
  'shadow-deep': {
    value: '0 0 0 1px rgba(6, 44, 82, 0.1), 0 2px 16px rgba(33, 43, 54, 0.08)',
  },
  'shadow-button': {
    value: '0 1px 0 rgba(0, 0, 0, 0.05)',
  },
  'shadow-top-bar': {
    value: '0 2px 2px -1px rgba(0, 0, 0, 0.15)',
  },
  'shadow-card': {
    value: '0 0 5px rgba(23, 24, 24, 0.05), 0 1px 2px rgba(0, 0, 0, 0.15)',
  },
  'shadow-popover': {
    value:
      '0 3px 6px -3px rgba(23, 24, 24, 0.08), 0 8px 20px -4px rgba(23, 24, 24, 0.12)',
  },
  'shadow-layer': {
    value:
      '0 31px 41px 0 rgba(32, 42, 53, 0.2), 0 2px 16px 0 rgba(32, 42, 54, 0.08)',
  },
  'shadow-modal': {
    value: '0 26px 80px rgba(0, 0, 0, 0.2), 0 0px 1px rgba(0, 0, 0, 0.2)',
  },
  'shadows-inset-button': {
    value: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
  },
  'shadows-inset-button-pressed': {
    value: 'inset 0 1px 0 rgba(0, 0, 0, 0.15)',
  },
};
