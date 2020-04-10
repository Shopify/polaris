import {clamp} from '@shopify/javascript-utilities/math';

import {HSLColor, HSBColor} from './color-types';

export function lightenColor(color: HSLColor | string, lighten = 0) {
  if (typeof color === 'string') {
    return color;
  }

  const {lightness} = color;
  const nextLightness = lightness + lighten;

  return {...color, lightness: clamp(nextLightness, 0, 100)};
}

export function darkenColor(color: HSLColor | string, lighten = 0) {
  if (typeof color === 'string') {
    return color;
  }

  const {lightness} = color;
  const nextLightness = lightness - lighten;

  return {...color, lightness: clamp(nextLightness, 0, 100)};
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
