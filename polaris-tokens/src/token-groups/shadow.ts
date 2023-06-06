import type {MetadataProperties, Experimental} from '../types';

type ShadowAliasExperimental = Experimental<
  'card-sm' | 'card-md' | 'card-lg' | 'button'
>;

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
  | ShadowAliasExperimental;

export type ShadowTokenName = `shadow-${ShadowAlias}`;

export type ShadowTokenGroup = {
  [TokenName in ShadowTokenName]: string;
};

export const shadow: {
  [TokenName in ShadowTokenName]: MetadataProperties;
} = {
  'shadow-inset-lg': {
    value: 'inset 0px 0px 7px 2px rgba(31, 33, 36, 0.18)',
    valueExperimental:
      'inset -1px 0px 1px rgba(0, 0, 0, 0.2), inset 1px 0px 1px rgba(0, 0, 0, 0.2), inset 0px 2px 1px rgba(0, 0, 0, 0.6)',
  },
  'shadow-inset-md': {
    value: 'inset 0px 2px 4px rgba(31, 33, 36, 0.32)',
    valueExperimental:
      'inset -1px 0px 1px rgba(0, 0, 0, 0.12), inset 1px 0px 1px rgba(0, 0, 0, 0.12), inset 0px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  'shadow-inset-sm': {
    value: 'inset 0px 0px 3px rgba(31, 33, 36, 0.56)',
    valueExperimental:
      'inset 0px 1px 1px rgba(0, 0, 0, 0.15), inset 0px 1px 2px rgba(255, 255, 255, 0.15)',
  },
  'shadow-none': {
    value: 'none',
  },
  'shadow-xs': {
    value: '0px 0px 2px rgba(31, 33, 36, 0.24)',
    valueExperimental: '0px 1px 0px rgba(0, 0, 0, 0.07)',
  },
  'shadow-sm': {
    value: '0px 1px 1px rgba(31, 33, 36, 0.1)',
    valueExperimental: '0px 3px 1px -1px rgba(0, 0, 0, 0.07)',
  },
  'shadow-md': {
    value:
      '0px 2px 4px rgba(31, 33, 36, 0.1), 0px 1px 6px rgba(31, 33, 36, 0.05)',
    valueExperimental: '0px 4px 6px -2px rgba(0, 0, 0, 0.2)',
  },
  'shadow-lg': {
    value:
      '0px 4px 12px rgba(31, 33, 36, 0.2), 0px 2px 6px rgba(31, 33, 36, 0.05)',
    valueExperimental: '0px 8px 16px -4px rgba(0, 0, 0, 0.22)',
  },
  'shadow-xl': {
    value:
      '0px 4px 18px -2px rgba(31, 33, 36, 0.08), 0px 12px 18px -2px rgba(31, 33, 36, 0.15)',
    valueExperimental: '0px 12px 20px -8px rgba(0, 0, 0, 0.24)',
  },
  'shadow-2xl': {
    value:
      '0px 32px 32px rgba(31, 33, 36, 0.15), 0px 32px 56px -2px rgba(31, 33, 36, 0.16)',
    valueExperimental: '0px 20px 20px -8px rgba(0, 0, 0, 0.28)',
  },
  'shadow-card-sm-experimental': {
    value:
      '0px 1px 0px rgba(0, 0, 0, 0.07), inset 0px -1px 0px #D4D4D4, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
  'shadow-card-md-experimental': {
    value:
      '0px 3px 1px -1px rgba(0, 0, 0, 0.07), inset 0px -1px 0px rgba(0, 0, 0, 0.16), inset 1px 0px 0px rgba(0, 0, 0, 0.1), inset -1px 0px 0px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
  },
  'shadow-card-lg-experimental': {
    value:
      '0px 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0px -1px 0px #D4D4D4, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
  'shadow-button-experimental': {
    value:
      'inset 0px -1px 0px #B5B5B5, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
};
