import tokens from '@shopify/polaris-tokens';
import {HSLColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';
import {compose} from '../compose';
import {needsVariantList} from './config';
import {ThemeConfig, Theme, CustomPropertiesLike} from './types';

export function buildCustomProperties(
  themeConfig: ThemeConfig,
): CustomPropertiesLike {
  return {
    ...setColors(themeConfig),
  };
}

export function buildThemeContext(themeConfig: ThemeConfig): Theme {
  const {logo} = themeConfig;
  return {logo};
}

function setColors(theme: ThemeConfig | undefined): CustomPropertiesLike {
  let colorPairs;
  const pairs =
    theme && theme.colors && theme.colors.topBar
      ? theme.colors.topBar
      : {background: '#00848e', backgroundLighter: '#f9fafb', color: '#1d9ba4'};

  const colorKey = 'topBar';
  const colorKeys = Object.keys(pairs);
  if (colorKeys.length > 1) {
    colorPairs = colorKeys.map((key: string) => {
      const colors = pairs;
      return colors && [constructColorName(colorKey, key), colors[key]];
    });
  } else {
    colorPairs = parseColors([colorKey, pairs]);
  }

  return colorPairs.reduce(
    (state, [key, value]) => ({...state, [key]: value}),
    {},
  );
}

export function needsVariant(name: string) {
  return needsVariantList.indexOf(name) !== -1;
}

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
  variant: 'light' | 'dark' = 'dark',
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
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 7, -10),
      ]);

      break;
    case 'dark':
      colorPairs.push(
        setTextColor(constructColorName(baseName, null, 'color'), 'dark'),
      );

      colorPairs.push([
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 15, 15),
      ]);

      break;
    default:
  }

  return colorPairs;
}

function parseColors([baseName, colors]: [
  string,
  {[key: string]: string},
]): string[][] {
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
