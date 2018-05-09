export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export interface RGBAColor extends RGBColor {
  alpha: number;
}

export interface HSBColor {
  /** The color */
  hue: number;
  /** Brightness of the color */
  brightness: number;
  /** Saturation of the color */
  saturation: number;
}

export interface HSBAColor extends HSBColor {
  /** Level of transparency */
  alpha: number;
}
