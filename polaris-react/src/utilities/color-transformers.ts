import {clamp} from './clamp';
import type {
  RGBColor,
  RGBAColor,
  HSBColor,
  HSBAColor,
  HSLColor,
  HSLAColor,
  HSBLAColor,
} from './color-types';
import {roundNumberToDecimalPlaces} from './roundNumberToDecimalPlaces';

const RGB_STRING_TO_HEX_REGEX =
  /^rgb[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;

export function rgbString(color: RGBColor | RGBAColor) {
  const {red, green, blue} = color;

  if ('alpha' in color) {
    return `rgba(${red}, ${green}, ${blue}, ${color.alpha})`;
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
  const {alpha = 1} = color;

  const red = color.red / 255;
  const green = color.green / 255;
  const blue = color.blue / 255;

  const largestComponent = Math.max(red, green, blue);
  const smallestComponent = Math.min(red, green, blue);

  const delta = largestComponent - smallestComponent;
  const lightness = (largestComponent + smallestComponent) / 2;
  let saturation = 0;
  if (largestComponent === 0) {
    saturation = 0;
  } else if (type === 'b') {
    saturation = delta / largestComponent;
  } else if (type === 'l') {
    const baseSaturation =
      lightness > 0.5
        ? delta / (2 - largestComponent - smallestComponent)
        : delta / (largestComponent + smallestComponent);
    saturation = isNaN(baseSaturation) ? 0 : baseSaturation;
  }

  let huePercentage = 0;
  switch (largestComponent) {
    case red:
      huePercentage = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      huePercentage = (blue - red) / delta + 2;
      break;
    case blue:
      huePercentage = (red - green) / delta + 4;
  }

  const hue = (huePercentage / 6) * 360;
  const clampedHue = clamp(hue, 0, 360);

  return {
    hue: clampedHue ? roundNumberToDecimalPlaces(clampedHue, 2) : 0,
    saturation: roundNumberToDecimalPlaces(clamp(saturation, 0, 1), 4),
    brightness: roundNumberToDecimalPlaces(clamp(largestComponent, 0, 1), 4),
    lightness: roundNumberToDecimalPlaces(lightness, 4),
    alpha: roundNumberToDecimalPlaces(alpha, 4),
  };
}

export function rgbToHsb(color: RGBColor): HSBColor;
export function rgbToHsb(color: RGBAColor): HSBAColor {
  const {hue, saturation, brightness, alpha = 1} = rgbToHsbl(color, 'b');
  return {hue, saturation, brightness, alpha};
}

export function rgbToHsl(color: RGBColor): HSLAColor;
export function rgbToHsl(color: RGBAColor): HSLAColor {
  const {
    hue,
    saturation: rawSaturation,
    lightness: rawLightness,
    alpha = 1,
  } = rgbToHsbl(color, 'l');

  const saturation = roundNumberToDecimalPlaces(rawSaturation * 100, 2);
  const lightness = roundNumberToDecimalPlaces(rawLightness * 100, 2);

  return {hue, saturation, lightness, alpha};
}

export function hexToRgb(color: string) {
  if (color.length === 4) {
    const repeatHex = (hex1: number, hex2: number) =>
      color.slice(hex1, hex2).repeat(2);
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

type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'default';

function getColorType(color: string): ColorType {
  if (color.includes('#')) {
    return 'hex';
  } else if (color.includes('rgb')) {
    return 'rgb';
  } else if (color.includes('rgba')) {
    return 'rgba';
  } else if (color.includes('hsl')) {
    return 'hsl';
  } else if (color.includes('hsla')) {
    return 'hsla';
  } else {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line no-console */
      console.warn('Accepted colors formats are: hex, rgb, rgba, hsl and hsla');
    }
    return 'default';
  }
}

function rgbToObject(color: string): RGBAColor {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
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

function hexToHsla(color: string): HSLAColor {
  return rgbToHsl(hexToRgb(color));
}

function rbgStringToHsla(color: string): HSLAColor {
  return rgbToHsl(rgbToObject(color));
}

function hslToObject(color: string): HSLAColor {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const colorMatch = color.match(/\(([^)]+)\)/);

  if (!colorMatch) {
    return {hue: 0, saturation: 0, lightness: 0, alpha: 0};
  }

  const [hue, saturation, lightness, alpha] = colorMatch[1].split(',');
  const objColor = {
    hue: roundNumberToDecimalPlaces(parseFloat(hue), 2),
    saturation: roundNumberToDecimalPlaces(parseFloat(saturation), 2),
    lightness: roundNumberToDecimalPlaces(parseFloat(lightness), 2),
    alpha: roundNumberToDecimalPlaces(parseFloat(alpha), 2) || 1,
  };
  return objColor;
}

export function hsbToString(hsbColor: HSBColor | string) {
  if (typeof hsbColor === 'string') {
    return hsbColor;
  }

  return rgbString(hsbToRgb(hsbColor));
}

export function colorToHsla(color: string): HSLAColor {
  const type = getColorType(color);
  switch (type) {
    case 'hex':
      return hexToHsla(color);
    case 'rgb':
    case 'rgba':
      return rbgStringToHsla(color);
    case 'hsl':
    case 'hsla':
      return hslToObject(color);
    case 'default':
    default:
      throw new Error(
        'Accepted color formats are: hex, rgb, rgba, hsl and hsla',
      );
  }
}

export function normalizeColorString(value: string) {
  return value.toLowerCase().replace(/\s/g, '');
}

export function hexToHsb(hex: string): HSBColor {
  return rgbToHsb(hexToRgb(hex));
}

export function expandHex(hex: string) {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return hex;
}

export function rgbStringToHex(value: string) {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const rgb = normalizeColorString(value).match(RGB_STRING_TO_HEX_REGEX) || [
    undefined,
    '0',
    '0',
    '0',
  ];
  return rgbToHex({
    red: parseInt(rgb[1]!, 10),
    green: parseInt(rgb[2]!, 10),
    blue: parseInt(rgb[3]!, 10),
  });
}
