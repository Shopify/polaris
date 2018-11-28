import tokens from '@shopify/polaris-tokens';
import {noop} from '@shopify/javascript-utilities/other';
import {needsVariantList} from '../config';
import {HSLColor} from '../../ColorPicker';
import {
  colorToHsla,
  hslToString,
  hslToRgb,
} from '../../../utilities/color-transformers';
import {isLight} from '../../../utilities/color-validation';
import {constructColorName} from '../../../utilities/color-names';
import {
  createDarkColor,
  createLightColor,
} from '../../../utilities/color-manipulation';
import {compose} from '../../../utilities/compose';

import {
  Theme,
  ColorsToParse,
  ThemeVariant,
  ThemeColors,
  ThemeContext,
  ThemeProviderContext,
} from '../types';

export function setColors(theme: Theme | undefined): string[][] | undefined {
  let colorPairs;
  if (theme && theme.colors) {
    Object.entries(theme.colors).forEach(([colorKey, pairs]) => {
      const colorKeys = Object.keys(pairs);
      if (colorKey === 'topBar' && colorKeys.length > 1) {
        colorPairs = colorKeys.map((key: string) => {
          const colors = (theme.colors as ThemeColors).topBar;
          return [constructColorName(colorKey, key), colors[key]];
        });
      } else {
        colorPairs = parseColors([colorKey, pairs]);
      }
    });
  }

  return colorPairs;
}

export function needsVariant(name: string) {
  return needsVariantList.indexOf(name) !== -1;
}

const darkenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(
  hslToString,
  createDarkColor,
);

const lightenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(
  hslToString,
  createLightColor,
);

export function setTextColor(
  name: string,
  variant: ThemeVariant = 'dark',
): string[] {
  if (variant === 'light') {
    return [name, tokens.colorInk];
  }

  return [name, tokens.colorWhite];
}

export function setTheme(
  color: string | HSLColor,
  baseName: string,
  key: string,
  variant: 'light' | 'dark',
): string[][] {
  const colorPairs = [];
  switch (variant) {
    case 'light':
      colorPairs.push(
        setTextColor(constructColorName(baseName, null, 'color'), 'light'),
      );

      colorPairs.push([
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 0, 0),
      ]);

      colorPairs.push([
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 7, -10),
      ]);

      break;
    case 'dark':
      colorPairs.push(
        setTextColor(constructColorName(baseName, null, 'color'), 'dark'),
      );

      colorPairs.push([
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 5, 5),
      ]);

      colorPairs.push([
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 15, 15),
      ]);

      break;
    default:
  }

  return colorPairs;
}

function parseColors([baseName, colors]: [string, ColorsToParse]): string[][] {
  const keys = Object.keys(colors);
  const colorPairs = [];
  for (let i = 0; i < keys.length; i++) {
    colorPairs.push([constructColorName(baseName, keys[i]), colors[keys[i]]]);

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[keys[i]]);

      if (typeof hslColor === 'string') {
        return colorPairs;
      }

      const rgbColor = hslToRgb(hslColor);

      if (isLight(rgbColor)) {
        colorPairs.push(...setTheme(hslColor, baseName, keys[i], 'light'));
      } else {
        colorPairs.push(...setTheme(hslColor, baseName, keys[i], 'dark'));
      }
    }
  }

  return colorPairs;
}

export function createThemeContext(theme?: ThemeContext): ThemeProviderContext {
  if (!theme) {
    return {polarisTheme: {logo: null, subscribe: noop, unsubscribe: noop}};
  }

  const {logo = null, subscribe = noop, unsubscribe = noop} = theme;
  return {polarisTheme: {logo, subscribe, unsubscribe}};
}
