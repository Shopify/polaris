import * as PropTypes from 'prop-types';
import {ThemeStyles} from './utils/themeStyles';

export type ThemeLogo = {
  /** Provides a path for a logo used on a dark background */
  topBarSource?: string;
  /** Provides a path for a logo used on a light background */
  contextualSaveBarSource?: string;
  /** Destination the merchant will navigate to when clicking the logo */
  url?: string;
  /** Accessible label the logo image */
  accessibilityLabel?: string;
  /** Number of pixels wide the logo image is */
  width?: number;
} | null;

export interface Theme {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  /** Sets the background color of the top bar component. Complimentary and typography colors are determined programmatically */
  styles?: ThemeStyles;
}

export interface ThemeContext {
  logo: Theme['logo'] | null;
  subscribe: (callback: () => void) => void;
  unsubscribe: (callback: () => void) => void;
}

export type ThemeVariant = 'light' | 'dark';

export const THEME_CONTEXT_TYPES = {polarisTheme: PropTypes.any};
