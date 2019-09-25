import {names} from 'tinycolor2';
import {RGBColor, RGBAColor} from './color-types';

export const nameHexMap: Record<string, string> = names;
const IS_RGB_STRING_REGEX = /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/i;

// implements: https://www.w3.org/WAI/ER/WD-AERT/#color-contrast
export function isLight({red, green, blue}: RGBColor | RGBAColor): boolean {
  const contrast = (red * 299 + green * 587 + blue * 114) / 1000;
  return contrast > 125;
}

export function isDark(color: RGBColor | RGBAColor): boolean {
  return !isLight(color);
}

export function isColorName(value: string) {
  if (nameHexMap[value]) {
    return true;
  }
  return false;
}

export function isHexString(value: string) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
}

export function isHashlessHex(value: string) {
  return /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(value);
}

export function isRgbString(value: string) {
  return IS_RGB_STRING_REGEX.test(value);
}
