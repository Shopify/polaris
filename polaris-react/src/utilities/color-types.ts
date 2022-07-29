export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export interface RGBAColor extends RGBColor {
  alpha: number;
}

export interface HSColor {
  /** The color */
  hue: number;
  /** Saturation of the color */
  saturation: number;
}

export interface HSBColor extends HSColor {
  /** Brightness of the color */
  brightness: number;
}

export interface HSLColor extends HSColor {
  /** Lightness of the color */
  lightness: number;
}

export type HSBLAColor = HSBAColor & HSLAColor;

export interface HSBAColor extends HSBColor {
  /** Level of transparency */
  alpha: number;
}

export interface HSLAColor extends HSLColor {
  /** Level of transparency */
  alpha: number;
}
