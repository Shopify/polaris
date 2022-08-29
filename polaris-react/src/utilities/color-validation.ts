import type {RGBColor, RGBAColor} from './color-types';

const IS_HEX_STRING_REGEX = /(^#[0-9A-F]{6}$)/i;

// implements: https://www.w3.org/WAI/ER/WD-AERT/#color-contrast
export function isLight({red, green, blue}: RGBColor | RGBAColor): boolean {
  const contrast = (red * 299 + green * 587 + blue * 114) / 1000;
  return contrast > 125;
}

export function isDark(color: RGBColor | RGBAColor): boolean {
  return !isLight(color);
}

export function isHexString(value: string) {
  return IS_HEX_STRING_REGEX.test(value);
}
