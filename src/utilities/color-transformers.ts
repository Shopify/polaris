import {clamp} from '@shopify/javascript-utilities/math';
import {
  RGBColor,
  RGBAColor,
  HSBColor,
  HSBAColor,
  HSLColor,
  HSLAColor,
  HSBLAColor,
} from '../components';
import {compose} from './compose';

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

function rgbFromHueAndChroma(hue: number, chroma: number) {
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

  return {red, green, blue};
}

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
export function hsbToRgb(color: HSBColor): RGBColor;
export function hsbToRgb(color: HSBAColor): RGBAColor;
export function hsbToRgb(color: HSBAColor): RGBAColor {
  const {hue, saturation, brightness, alpha = 1} = color;
  const chroma = brightness * saturation;

  let {red, green, blue} = rgbFromHueAndChroma(hue, chroma);

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

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
export function hslToRgb(color: HSLColor): RGBColor;
export function hslToRgb(color: HSLAColor): RGBAColor;
export function hslToRgb(color: HSLAColor): RGBAColor {
  const {hue, saturation, lightness, alpha = 1} = color;
  const chroma = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);

  let {red, green, blue} = rgbFromHueAndChroma(hue, chroma);

  const lightnessVal = lightness / 100 - chroma / 2;
  red += lightnessVal;
  green += lightnessVal;
  blue += lightnessVal;

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha,
  };
}

// ref https://en.wikipedia.org/wiki/HSL_and_HSV
function rgbToHsbl(color: RGBAColor, type: 'b' | 'l' = 'b'): HSBLAColor {
  const {red, green, blue, alpha = 1} = color;
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const largestComponent = Math.max(r, g, b);
  const smallestComponent = Math.min(r, g, b);

  const delta = largestComponent - smallestComponent;
  const lightness = (largestComponent + smallestComponent) / 2;
  let saturation = 0;
  if (largestComponent === 0) {
    saturation = 0;
  } else if (type === 'b') {
    saturation = delta / largestComponent;
  } else if (type === 'l') {
    saturation =
      lightness > 0.5
        ? delta / (2 - largestComponent - smallestComponent)
        : delta / (largestComponent + smallestComponent);
  }

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
    saturation: parseFloat(clamp(saturation, 0, 1).toFixed(2)),
    brightness: parseFloat(clamp(largestComponent, 0, 1).toFixed(2)),
    lightness: parseFloat(lightness.toFixed(2)),
    alpha: parseFloat(alpha.toFixed(2)),
  };
}

export function rgbToHsb(color: RGBColor): HSBColor;
export function rgbToHsb(color: RGBAColor): HSBAColor;
export function rgbToHsb(color: RGBAColor): HSBAColor {
  const {hue, saturation, brightness, alpha} = rgbToHsbl(color, 'b');
  return {hue, saturation, brightness, alpha};
}

export function rgbToHsl(color: RGBColor): HSLColor;
export function rgbToHsl(color: RGBAColor): HSLAColor;
export function rgbToHsl(color: RGBAColor): HSLAColor {
  const {
    hue,
    saturation: rawSaturation,
    lightness: rawLightness,
    alpha,
  } = rgbToHsbl(color, 'l');
  const saturation = rawSaturation * 100;
  const lightness = rawLightness * 100;
  return {hue, saturation, lightness, alpha};
}

function hexToRgb(color: string) {
  if (color.length === 4) {
    const repeatHex = (a: number, b: number) => color.slice(a, b).repeat(2);
    const red = parseInt(repeatHex(1, 2), 16);
    const green = parseInt(repeatHex(2, 3), 16);
    const blue = parseInt(repeatHex(3, 4), 16);

    return {red, green, blue};
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);

  return {red, green, blue};
}

export enum colorTypes {
  HEX = 'hex',
  RGB = 'rgb',
  RGBA = 'rgba',
  HSL = 'hsl',
  HSLA = 'hsla',
  DEFAULT = 'default',
}

function colorType(color: string): colorTypes {
  if (color.includes('#')) {
    return colorTypes.HEX;
  } else if (color.includes('rgb')) {
    return colorTypes.RGB;
  } else if (color.includes('rgba')) {
    return colorTypes.RGBA;
  } else if (color.includes('hsl')) {
    return colorTypes.HSL;
  } else if (color.includes('hsla')) {
    return colorTypes.HSLA;
  } else {
    /* eslint-disable */
    if (process.env.NODE_ENV === 'development') {
      console.warn('Accepted colors formats are: hex, rgb, rgba, hsl and hsla');
    }
    /* eslint-enable */
    return colorTypes.DEFAULT;
  }
}

export function hslToString(hslColor: HSLAColor | string) {
  if (typeof hslColor === 'string') {
    return hslColor;
  }

  const {alpha = 1, hue, lightness, saturation} = hslColor;
  return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}

function rgbToObject(color: string) {
  const colorMatch = color.match(/\(([^)]+)\)/);

  if (!colorMatch) {
    return {red: 0, green: 0, blue: 0, alpha: 0};
  }

  const [red, green, blue, alpha] = colorMatch[1].split(',');
  const objColor = {
    red: parseInt(red, 10),
    green: parseInt(green, 10),
    blue: parseInt(blue, 10),
    alpha: parseInt(alpha, 10) || 1,
  };
  return objColor;
}

const hexToHsl: (color: string) => HSLColor | HSLAColor = compose(
  rgbToHsl,
  hexToRgb,
);

const rbgStringToHsl: (color: string) => HSLColor | HSLAColor = compose(
  rgbToHsl,
  rgbToObject,
);

export function colorToHsla(color: string) {
  const type: colorTypes = colorType(color);
  switch (type) {
    case colorTypes.HEX:
      return hexToHsl(color);
    case colorTypes.RGB:
    case colorTypes.RGBA:
      return rbgStringToHsl(color);
    case colorTypes.HSL:
    case colorTypes.HSLA:
    default:
      return color;
  }
}
