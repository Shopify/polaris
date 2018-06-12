import {clamp} from '@shopify/javascript-utilities/math';
import {RGBColor, RGBAColor, HSBColor, HSBAColor} from './types';

export function rgbString(color: RGBColor | RGBAColor) {
  const {red, green, blue} = color;

  if (color.hasOwnProperty('alpha')) {
    return `rgba(${red}, ${green}, ${blue}, ${(color as RGBAColor).alpha})`;
  } else {
    return `rgb(${red}, ${green}, ${blue})`;
  }
}

export const rgbaString = rgbString;

export function rgbToHex({red, green, blue}: RGBColor) {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(
    blue,
  )}`;
}

function componentToHex(component: number) {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function hsbToHex(color: HSBColor) {
  return rgbToHex(hsbToRgb(color));
}

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
export function hsbToRgb(color: HSBColor): RGBColor;
export function hsbToRgb(color: HSBAColor): RGBAColor;
export function hsbToRgb(color: HSBAColor): RGBAColor {
  const {hue, saturation, brightness, alpha = 1} = color;
  const chroma = brightness * saturation;
  const huePrime = hue / 60;
  const hueDelta = 1 - Math.abs((huePrime % 2) - 1);
  const intermediateValue = chroma * hueDelta;

  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime <= 1) {
    red = chroma;
    green = intermediateValue;
    blue = 0;
  }

  if (huePrime >= 1 && huePrime <= 2) {
    red = intermediateValue;
    green = chroma;
    blue = 0;
  }

  if (huePrime >= 2 && huePrime <= 3) {
    red = 0;
    green = chroma;
    blue = intermediateValue;
  }

  if (huePrime >= 3 && huePrime <= 4) {
    red = 0;
    green = intermediateValue;
    blue = chroma;
  }

  if (huePrime >= 4 && huePrime <= 5) {
    red = intermediateValue;
    green = 0;
    blue = chroma;
  }

  if (huePrime >= 5 && huePrime <= 6) {
    red = chroma;
    green = 0;
    blue = intermediateValue;
  }

  const chromaBrightnessDelta = brightness - chroma;
  red += chromaBrightnessDelta;
  green += chromaBrightnessDelta;
  blue += chromaBrightnessDelta;

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha,
  };
}

// ref https://en.wikipedia.org/wiki/HSL_and_HSV
export function rgbToHsb(color: RGBColor): HSBColor;
export function rgbToHsb(color: RGBAColor): HSBAColor;
export function rgbToHsb(color: RGBAColor): HSBAColor {
  const {red, green, blue, alpha = 1} = color;
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const largestComponent = Math.max(r, g, b);
  const smallestComponent = Math.min(r, g, b);

  const delta = largestComponent - smallestComponent;
  const saturation = largestComponent === 0 ? 0 : delta / largestComponent;

  let huePercentage = 0;
  switch (largestComponent) {
    case r:
      huePercentage = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      huePercentage = (b - r) / delta + 2;
      break;
    case b:
      huePercentage = (r - g) / delta + 4;
  }

  const hue = Math.round((huePercentage / 6) * 360);

  return {
    hue: clamp(hue, 0, 360) || 0,
    saturation: clamp(saturation, 0, 1),
    brightness: clamp(largestComponent, 0, 1),
    alpha,
  };
}
