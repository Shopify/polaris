export interface TokenProperties {
  description?: string;
  value: string;
  valueExperimental?: string;
}

export interface TokenGroupShape {
  [tokenName: string]: TokenProperties;
}

export type ThemeBaseShape = Omit<ThemeVariantShape, 'color'>;

export interface ThemeVariantShape {
  breakpoints: TokenGroupShape;
  border: TokenGroupShape;
  color: TokenGroupShape;
  font: TokenGroupShape;
  motion: TokenGroupShape;
  shadow: TokenGroupShape;
  space: TokenGroupShape;
  zIndex: TokenGroupShape;
}

export type ThemePartialShape = Partial<ThemeVariantShape>;
