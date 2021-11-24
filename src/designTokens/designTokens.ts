import {colorSchemes, ColorSchemes} from './colorSchemes';
import {motion} from './motion';
import {typography} from './typography';
import {legacyTokens} from './legacyTokens';

export interface Tokens {
  /**
   * Values to convert to CSS custom properties.
   * @example {background: '#000'} // --p-background: #000;
   */
  [token: string]: string;
}

export interface DesignTokens {
  colorSchemes: ColorSchemes;
  legacyTokens: Tokens;
  motion: Tokens;
  typography: Tokens;
}

export const designTokens: DesignTokens = {
  colorSchemes,
  legacyTokens,
  motion,
  typography,
};
