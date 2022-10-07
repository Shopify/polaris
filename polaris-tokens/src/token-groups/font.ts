import type {TokenGroup} from '../types';

export const font = {
  'font-family-sans': {
    value:
      "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  'font-family-mono': {
    value:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
  },
  'font-size-75': {
    value: '12px',
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
  },
  'font-size-600': {
    value: '32px',
  },
  'font-size-700': {
    value: '40px',
  },
  'font-weight-regular': {
    value: '400',
  },
  'font-weight-medium': {
    value: '500',
  },
  'font-weight-semibold': {
    value: '600',
  },
  'font-weight-bold': {
    value: '700',
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
};

export type FontTokenGroup = TokenGroup<typeof font>;
export type FontTokenName = keyof FontTokenGroup;

// e.g. "400" | "500" | "600" | "700" | "100" | ...
export type FontSizeScale = Extract<
  FontTokenName,
  `font-size-${number}`
> extends `font-size-${infer Scale}`
  ? Scale
  : never;

// e.g. "1" | "2" | "3" | "4" | "5" | "6" | "7"
export type FontLineHeightScale = Extract<
  FontTokenName,
  `font-line-height-${number}`
> extends `font-line-height-${infer Scale}`
  ? Scale
  : never;

// e.g. "bold" | "regular" | "medium" | "semibold"
export type FontWeightAlias = Extract<
  FontTokenName,
  `font-weight-${string}`
> extends `font-weight-${infer Alias}`
  ? Alias
  : never;
