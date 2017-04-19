export interface RGBColor {
  red: number,
  green: number,
  blue: number,
}

export interface RGBAColor extends RGBColor {
  alpha: number,
}

export interface HSBColor {
  hue: number,
  brightness: number,
  saturation: number,
}

export interface HSBAColor extends HSBColor {
  alpha: number,
}
