import tokens from '@shopify/polaris-tokens';
import {colorFactory} from '@shopify/polaris-tokens/dist-modern';
import {mergeConfigs} from '@shopify/polaris-tokens/dist-modern/utils';
import {config as base} from '@shopify/polaris-tokens/dist-modern/configs/base';

import type {HSLColor, HSLAColor} from '../color-types';
import {hslToString} from '../color-transformers';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';

import {needsVariantList} from './config';
import type {
  ThemeConfig,
  Theme,
  CustomPropertiesLike,
  ColorScheme,
} from './types';

interface CustomPropertiesConfig extends ThemeConfig {
  colorScheme: ColorScheme;
}

export function buildCustomPropertiesNoMemo(
  themeConfig: CustomPropertiesConfig,
  tokens?: Record<string, string>,
): CustomPropertiesLike {
  const {colors = {}, colorScheme, config, frameOffset = 0} = themeConfig;
  const mergedConfig = mergeConfigs(base, config || {});

  return customPropertyTransformer({
    ...colorFactory(colors, colorScheme, mergedConfig),
    ...tokens,
    frameOffset: `${frameOffset}px`,
  });
}

export function buildThemeContext(
  themeConfig: ThemeConfig,
  cssCustomProperties?: CustomPropertiesLike,
): Theme {
  const {logo, colors = {}, colorScheme} = themeConfig;
  const {...colorValues} = colors;
  return {
    logo,
    cssCustomProperties: toString(cssCustomProperties),
    colors: colorValues,
    colorScheme,
  };
}

export function toString(obj?: CustomPropertiesLike) {
  if (obj) {
    return Object.entries(obj)
      .map((pair) => pair.join(':'))
      .join(';');
  } else {
    return undefined;
  }
}

function customPropertyTransformer(
  properties: Record<string, HSLAColor | string>,
) {
  return Object.entries(properties).reduce(
    (transformed, [key, value]) => ({
      ...transformed,
      [toCssCustomPropertySyntax(key)]: value,
    }),
    {},
  );
}

export function toCssCustomPropertySyntax(camelCase: string) {
  return `--p-${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

export function needsVariant(name: string) {
  return needsVariantList.includes(name);
}

function lightenToString(
  color: HSLColor | string,
  lightness: number,
  saturation: number,
): string {
  return hslToString(createLightColor(color, lightness, saturation));
}

export function setTextColor(
  name: string,
  variant: 'light' | 'dark' = 'dark',
): string[] {
  if (variant === 'light') {
    return [name, tokens.colorInk];
  }

  return [name, tokens.colorWhite];
}

export function setBorderColor(
  name: string,
  variant: 'light' | 'dark' = 'dark',
): string[] {
  if (variant === 'light') {
    return [name, tokens.colorInkLighter];
  }
  return [name, tokens.colorSkyDark];
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

      colorPairs.push(
        setBorderColor(constructColorName(baseName, null, 'border'), 'light'),
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

      colorPairs.push(
        setBorderColor(constructColorName(baseName, null, 'border'), 'dark'),
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

// eslint-disable-next-line @typescript-eslint/ban-types
function memoize(fnToMemoize: Function) {
  const cache: Map<string, any> = new Map();
  return function (...args: any[]) {
    const key = JSON.stringify([fnToMemoize.name, args]);
    if (cache.get(key) === undefined) {
      cache.set(key, fnToMemoize(...args));
    }
    return cache.get(key);
  };
}

export const buildCustomProperties = memoize(buildCustomPropertiesNoMemo);
