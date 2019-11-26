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
  width?: number;
}

export type Role =
  | 'surface'
  | 'onSurface'
  | 'interactive'
  | 'neutral'
  | 'branded'
  | 'critical'
  | 'warning'
  | 'highlight'
  | 'success';

export type RoleColors = {
  [r in Role]: string;
};

// The value that is passed into the ThemeProvider
export interface ThemeConfig {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  colors?: {
    /** Sets the background color of the top bar component. Complimentary and typography colors are determined programmatically */
    topBar?: Record<string, string>;
  };
  UNSTABLE_colors?: Partial<RoleColors>;
}

export type CustomPropertiesLike = Record<string, string>;

// The value that is stored in the ThemeContext
export interface Theme {
  /** Sets the logo for the top bar and contextual save bar components*/
  logo?: ThemeLogo;
  UNSTABLE_cssCustomProperties?: string;
}

export interface HslaSetting {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
}

export interface Variant {
  name: string;
  light: HslaSetting;
  dark: HslaSetting;
}

export type RoleVariants = {
  [r in Role]: Variant[];
};
