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
};

// The value that is passed into the ThemeProvider
export interface ThemeConfig {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  colors?: {
    /** Sets the background color of the top bar component. Complimentary and typography colors are determined programmatically */
    topBar?: Record<string, string>;
  };
  // eslint-disable-next-line babel/camelcase
  UNSTABLE_colors?: {
    surface?: string;
    onSurface?: string;
    interactive?: string;
    neutral?: string;
    branded?: string;
    critical?: string;
    warning?: string;
    highlight?: string;
    success?: string;
  };
}

export type CustomPropertiesLike = Record<string, string>;

// The value that is stored in the ThemeContext
export interface Theme {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  // eslint-disable-next-line babel/camelcase
  UNSTABLE_cssCustomProperties?: string;
}
