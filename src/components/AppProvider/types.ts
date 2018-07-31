import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';
import {Props as AppProviderProps} from '../AppProvider';

import Intl from './Intl';
import Link from './Link';
import EASDK from './EASDK';
import StickyManager from './StickyManager';

export type ColorsToParse = ThemeColor;

export interface ThemeLogo {
  /** Provides a path for a logo used on a dark background */
  topBarSource?: string;
  /** Provides a path for a logo used on a light background */
  contextualSaveBarSource?: string;
  /** Destination the merchant will navigate to when clicking the logo */
  url?: string;
  /** Accessible label the logo image */
  accessibilityLabel?: string;
  /** Number of pixels wide the logo image is */
  width: number;
}

export interface ThemeColor {
  [key: string]: string;
}

export interface TopBar extends ThemeColor {
  background: string;
}

export type ThemeColors = {
  topBar: TopBar;
};

export interface Theme {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  /** Sets the background color of the top bar component. Complimentary and typography colors are determined programmatically */
  colors?: ThemeColors;
}

export interface ThemeContext {
  logo: Theme['logo'] | null;
}

export type ThemeVariant = 'light' | 'dark';

export const polarisAppProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
  theme: PropTypes.any,
  easdk: PropTypes.any,
};

export interface WithAppProviderProps {
  polaris: {
    intl: Intl;
    link: Link;
    easdk: EASDK;
    stickyManager: StickyManager;
    theme: ThemeContext;
  };
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface PrimitiveReplacementDictionary {
  [key: string]: string | number;
}

export interface ComplexReplacementDictionary {
  [key: string]: string | number | React.ReactNode;
}

export interface CreatePolarisContext extends AppProviderProps {
  stickyManager?: StickyManager;
}
