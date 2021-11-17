import type {Tokens} from './designTokens';
import {lightLegacyTokens, darkLegacyTokens} from './legacyTokens';

/**
 * Polaris color schemes.
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Mapping of Polaris color schemes to operating system color schemes.
 *
 * Note: The associated OS value will be set for the CSS `color-scheme` declaration.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
 */
export const osColorSchemes: {
  [C in ColorScheme]: 'light' | 'dark' | 'normal';
} = {
  light: 'light',
  dark: 'dark',
};

/**
 * Polaris color schemes and their associated color tokens.
 */
export type ColorSchemes = {
  [C in ColorScheme]: Tokens;
};

export const colorSchemes: ColorSchemes = {
  light: {
    ...lightLegacyTokens,
  },
  dark: {
    ...darkLegacyTokens,
  },
};
