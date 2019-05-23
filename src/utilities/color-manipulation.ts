import {HSLColor, HSBColor, HSLAColor, RGBColor} from './color-types';

export function lightenColor(color: HSLColor | string, lighten = 0) {
  if (typeof color === 'string') {
    return color;
  }

  const {lightness} = color;
  const nextLightness = lightness + lighten;

  return {...color, lightness: nextLightness};
}

export function darkenColor(color: HSLColor | string, lighten = 0) {
  if (typeof color === 'string') {
    return color;
  }

  const {lightness} = color;
  const nextLightness = lightness - lighten;

  return {...color, lightness: nextLightness};
}

export function opacifyColor(
  color: HSLAColor | string,
  alpha: number,
): HSLAColor | string {
  if (typeof color === 'string') {
    return color;
  }

  const {alpha: prevAlpha, ...rest} = color;

  return {...rest, alpha: alpha > 1 ? Math.floor(alpha) / 100 : alpha};
}

export function saturateColor(
  color: HSLColor | HSBColor | string,
  saturate = 0,
) {
  if (typeof color === 'string') {
    return color;
  }

  const {saturation} = color;
  const nextSaturation = saturation + saturate;

  return {...color, saturation: nextSaturation};
}

export function createDarkColor(
  color: HSLColor | string,
  darkness: number,
  saturation: number,
) {
  const darkenedColor = darkenColor(color, darkness);
  const saturatedColor = saturateColor(darkenedColor, saturation);

  return saturatedColor;
}

export function createLightColor(
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) {
  const lightenedColor = lightenColor(color, lightness);
  const saturatedColor = saturateColor(lightenedColor, -saturation);

  return saturatedColor;
}

export function mixColors(
  primaryColor: RGBColor,
  mixColor: RGBColor,
  weight: number,
): RGBColor {
  return {
    red: Math.round(
      mixColor.red + (primaryColor.red - mixColor.red) * (weight / 100.0),
    ),
    green: Math.round(
      mixColor.green + (primaryColor.green - mixColor.green) * (weight / 100.0),
    ),
    blue: Math.round(
      mixColor.blue + (primaryColor.blue - mixColor.blue) * (weight / 100.0),
    ),
  };
}
