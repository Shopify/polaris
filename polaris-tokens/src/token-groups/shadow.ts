import type {MetadataProperties, Experimental} from '../types';

type ShadowAliasExperimental = Experimental<
  | 'bevel'
  | 'card-sm'
  | 'card-md'
  | 'card-lg'
  | 'button'
  | 'button-hover'
  | 'button-disabled'
  | 'button-primary-strong-inset'
  | 'button-primary-strong-hover'
  | 'button-primary-strong'
  | 'button-primary'
  | 'button-primary-hover'
  | 'button-inset'
  | 'border-inset'
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
  'shadow-bevel-experimental': {
    value:
      '1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset',
  },
  'shadow-card-sm-experimental': {
    value:
      '0px 2px 0px rgba(0, 0, 0, 0.07), 0px 1px 0px rgba(0, 0, 0, 0.07), 1px 0px 0px #E3E3E3, -1px 0px 0px #E3E3E3, 0px -1px 0px #E3E3E3',
  },
  'shadow-card-md-experimental': {
    value:
      '0px 3px 1px -1px rgba(0, 0, 0, 0.07),  0px -1px 0px 0px rgba(0, 0, 0, 0.16),  1px 0px 0px 0px rgba(227, 227, 227, 1),  -1px 0px 0px 0px rgba(227, 227, 227, 1),  0px 1px 0px 0px rgba(227, 227, 227, 1)',
  },
  'shadow-card-lg-experimental': {
    value:
      '0px 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0px -1px 0px #D4D4D4, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
  'shadow-button-experimental': {
    value:
      'inset 0px -1px 0px #B5B5B5, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3',
  },
  'shadow-button-hover-experimental': {
    value: `inset 0px -1px 0px #cccccc, inset 1px 0px 0px #ebebeb, inset -1px 0px 0px #ebebeb, inset 0px 1px 0px #ebebeb`,
  },
  'shadow-button-disabled-experimental': {
    value: 'inset 0px 0px 0px 1px rgba(227, 227, 227, 1)',
  },
  'shadow-button-primary-strong-inset-experimental': {
    value: '0px 3px 0px 0px #000 inset',
  },
  'shadow-button-primary-strong-hover-experimental': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 0px 0px 0.5px #1A1A1A',
  },
  'shadow-button-primary-strong-experimental': {
    value:
      '0px 2px 0px 0px rgba(255, 255, 255, 0.2) inset, 2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1px 0px 1px #000 inset, 0px 1px 0px 0px #000 inset',
  },
  'shadow-button-primary-experimental': {
    value:
      '0px 1px 0px 0px rgba(255, 255, 255, 0.4) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
  },
  'shadow-button-primary-hover-experimental': {
    value:
      '-1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px 0.5px 0px 0px rgba(0, 0, 0, 0.25), 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset',
  },
  'shadow-button-inset-experimental': {
    value:
      '0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset',
  },
  'shadow-border-inset-experimental': {
    value: '0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset',
  },
};
