import {clamp} from './math';
import {RGBColor, HSBColor} from './types';

export function rgbToHex([r, g, b]: RGBColor) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex(component: number) {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
export function hsbToRgb(hue: number, saturation: number, brightness: number): RGBColor {
  const chroma = brightness * saturation;
  const huePrime = hue / 60;
  const hueDelta = 1 - Math.abs(huePrime % 2 - 1);
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
  return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
}

// ref https://en.wikipedia.org/wiki/HSL_and_HSV
export function rgbToHsb(red: number, green: number, blue: number): HSBColor {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const largestComponent = Math.max(r, g, b);
  const smallestComponent = Math.min(r, g, b);

  const delta = largestComponent - smallestComponent;
  const saturation = largestComponent === 0
    ? 0
    : delta / largestComponent;

  let huePercentage = 0;
  switch (largestComponent) {
    case r:
      huePercentage = (g - b) / delta % 6;
     break;
    case g:
      huePercentage = (b - r) / delta + 2;
      break;
    case b:
      huePercentage = (r - g) / delta + 4;
      break;
  }

  const hue = Math.round(huePercentage / 6 * 360);

  return {
    hue: clamp(hue, 0, 360) || 0,
    saturation: clamp(saturation, 0, 1),
    brightness: clamp(largestComponent, 0, 1),
  };
}
