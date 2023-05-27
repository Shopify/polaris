import type {MetadataProperties} from '../types';

export type ShadowAlias =
  | 'inset-lg'
  | 'inset-md'
  | 'inset-sm'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | ShadowExperimentalAlias;

type ShadowExperimentalAlias = 'experimental-card-md';

export type ShadowTokenName = `shadow-${ShadowAlias}`;

export type ShadowTokenGroup = {
  [TokenName in ShadowTokenName]: string;
};

export const shadow: {
  [TokenName in ShadowTokenName]: MetadataProperties;
} = {
  'shadow-inset-lg': {
    value: 'inset 0px 0px 7px 2px rgba(31, 33, 36, 0.18)',
  },
  'shadow-inset-md': {
    value: 'inset 0px 2px 4px rgba(31, 33, 36, 0.32)',
  },
  'shadow-inset-sm': {
    value: 'inset 0px 0px 3px rgba(31, 33, 36, 0.56)',
  },
  'shadow-none': {
    value: 'none',
  },
  'shadow-xs': {
    value: '0px 0px 2px rgba(31, 33, 36, 0.24)',
  },
  'shadow-sm': {
    value: '0px 1px 1px rgba(31, 33, 36, 0.1)',
    valueExperimental:
      '0px 1px 0px rgba(0, 0, 0, 0.07), inset 0px -1px 0px #d4d4d4, inset -1px 0px 0px #e3e3e3, inset 1px 0px 0px #e3e3e3, inset 0px 1px 0px #e3e3e3',
  },
  'shadow-md': {
    value:
      '0px 2px 4px rgba(31, 33, 36, 0.1), 0px 1px 6px rgba(31, 33, 36, 0.05)',
  },
  'shadow-lg': {
    value:
      '0px 4px 12px rgba(31, 33, 36, 0.2), 0px 2px 6px rgba(31, 33, 36, 0.05)',
  },
  'shadow-xl': {
    value:
      '0px 4px 18px -2px rgba(31, 33, 36, 0.08), 0px 12px 18px -2px rgba(31, 33, 36, 0.15)',
  },
  'shadow-2xl': {
    value:
      '0px 32px 32px rgba(31, 33, 36, 0.15), 0px 32px 56px -2px rgba(31, 33, 36, 0.16)',
  },
  'shadow-experimental-card-md': {
    value:
      '0px 3px 1px -1px rgba(0, 0, 0, 0.07), inset 0px -1px 0px rgba(0, 0, 0, 0.16), inset 1px 0px 0px rgba(0, 0, 0, 0.1), inset -1px 0px 0px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
  },
};
