import type {MetadataProperties, Experimental} from '../types';

type FontFamilyAliasExperimental = Experimental<'sans'>;

type FontFamilyAlias = 'sans' | 'mono' | FontFamilyAliasExperimental;

type FontSizeScaleExperimental = Experimental<'70' | '80'>;

export type FontSizeScale =
  | '75'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | FontSizeScaleExperimental;

type FontLineHeightScaleExperimental = Experimental<'075'>;

export type FontLineHeightScale =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | FontLineHeightScaleExperimental;

type FontWeightAliasExperimental = Experimental<
  'extra-medium' | 'extra-semibold'
>;

export type FontWeightAlias =
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | FontWeightAliasExperimental;

type FontLetterSpacingAliasExperimental = Experimental<
  'tightest' | 'tighter' | 'tight' | 'normal'
>;

export type FontLetterSpacingAlias = FontLetterSpacingAliasExperimental;

export type FontTokenName =
  | `font-family-${FontFamilyAlias}`
  | `font-size-${FontSizeScale}`
  | `font-weight-${FontWeightAlias}`
  | `font-line-height-${FontLineHeightScale}`
  | `font-letter-spacing-${FontLetterSpacingAlias}`;

export type FontTokenGroup = {
  [TokenName in FontTokenName]: string;
};

export const font: {
  [TokenName in FontTokenName]: MetadataProperties;
} = {
  'font-family-sans': {
    value:
      "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  'font-family-sans-experimental': {
    value:
      "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  'font-family-mono': {
    value:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
  },
  'font-size-70-experimental': {
    value: '11px',
  },
  'font-size-75': {
    value: '12px',
  },
  'font-size-80-experimental': {
    value: '13px',
  },
  'font-size-100': {
    value: '14px',
  },
  'font-size-200': {
    value: '16px',
  },
  'font-size-300': {
    value: '20px',
  },
  'font-size-400': {
    value: '24px',
  },
  'font-size-500': {
    value: '28px',
    valueExperimental: '30px',
  },
  'font-size-600': {
    value: '32px',
    valueExperimental: '36px',
  },
  'font-size-700': {
    value: '40px',
  },
  'font-weight-regular': {
    value: '400',
    valueExperimental: '450',
  },
  'font-weight-medium': {
    value: '500',
  },
  'font-weight-extra-medium-experimental': {
    value: '550',
  },
  'font-weight-semibold': {
    value: '600',
  },
  'font-weight-extra-semibold-experimental': {
    value: '650',
  },
  'font-weight-bold': {
    value: '700',
  },
  'font-line-height-075-experimental': {
    value: '12px',
  },
  'font-line-height-1': {
    value: '16px',
  },
  'font-line-height-2': {
    value: '20px',
  },
  'font-line-height-3': {
    value: '24px',
  },
  'font-line-height-4': {
    value: '28px',
  },
  'font-line-height-5': {
    value: '32px',
  },
  'font-line-height-6': {
    value: '40px',
  },
  'font-line-height-7': {
    value: '48px',
  },
  'font-letter-spacing-tightest-experimental': {
    value: '-0.54px',
  },
  'font-letter-spacing-tighter-experimental': {
    value: '-0.3px',
  },
  'font-letter-spacing-tight-experimental': {
    value: '-0.2px',
  },
  'font-letter-spacing-normal-experimental': {
    value: '0px',
  },
};
