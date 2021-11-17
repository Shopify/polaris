import type {Config} from '@shopify/polaris-tokens/dist-modern';

export interface RoleColors {
  /** The surface role is used for the backgrounds of the UI. With a light color scheme, surface colors are nearly white, while in a dark color scheme, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts. */
  surface: string;
  /** The onSurface role is made up of elements which appear on top of a surface, including borders, secondary icons, and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided, onSurface values will be light. */
  onSurface: string;
  /** The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states. */
  interactive: string;
  /** A secondary interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color. */
  secondary: string;
  /** A primary interactive color, for use in primary buttons as a background color. Also used in navigation and tabs for icons, and for a surface color when in a selected state. */
  primary: string;
  /** Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a critical event in inert elements that requires immediate merchant action. */
  critical: string;
  /** For use as an indicator that action should be taken by merchants in components including badges, banners, and exception lists. */
  warning: string;
  /** Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used in information banners and badges, indicators that draw attention to new information, bars that indicate loading or progress, and in data visualization. */
  highlight: string;
  /** Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to illustrate growth. */
  success: string;
  /** Used to decorate elements where color does convey a specific meaning in components like avatars */
  decorative: string;
}

export type Role = keyof RoleColors;

// The value that is passed into the AppProvider
export interface AppThemeConfig extends ThemeConfig {
  colorScheme?: 'light' | 'dark';
}

// The config that is passed into a ThemeProvider.
// The ThemeProvider converts this object into a Theme, and then stores
// the Theme in a context.
export interface ThemeConfig {
  colors?: Partial<RoleColors>;
  colorScheme?: 'light' | 'dark' | 'inverse';
  config?: Config;
  frameOffset?: string;
}

// An intermediate state of transforming the ThemeConfig into a Theme
export interface ProcessedThemeConfig extends ThemeConfig {
  colorScheme: 'light' | 'dark';
}

// The value that is stored in the ThemeContext
export interface Theme {
  colors?: Partial<RoleColors>;
  colorScheme: 'light' | 'dark';
  cssCustomProperties: string;
}
