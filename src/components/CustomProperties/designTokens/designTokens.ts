import {colorSchemes, ColorSchemes} from './colorSchemes';
import {motion} from './motion';

export interface Tokens {
  /**
   * Values to convert to CSS custom properties.
   * @example --p-background: #000;
   */
  [token: string]: string;
}

export interface DesignTokens {
  colorSchemes: ColorSchemes;
  motion: Tokens;
}

export const designTokens: DesignTokens = {
  colorSchemes,
  motion,
};
