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
