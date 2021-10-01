import {colorFactory, mergeConfigs} from '@shopify/polaris-tokens/dist-modern';
import {config as base} from '@shopify/polaris-tokens/dist-modern/configs/base';

import type {HSLAColor} from '../color-types';

import type {Theme, ProcessedThemeConfig} from './types';

type CustomPropertiesObject = Record<string, string>;

export function buildCustomPropertiesNoMemo(
  themeConfig: ProcessedThemeConfig,
  tokens?: Record<string, string>,
): CustomPropertiesObject {
  const {colors = {}, colorScheme, config, frameOffset = '0px'} = themeConfig;
  const mergedConfig = mergeConfigs(base, config || {});

  return customPropertyTransformer({
    ...colorFactory(colors, colorScheme, mergedConfig),
    ...tokens,
    frameOffset,
  });
}

export function buildThemeContext(
  themeConfig: ProcessedThemeConfig,
  cssCustomProperties?: CustomPropertiesObject,
): Theme {
  const {logo, colors = {}, colorScheme} = themeConfig;
  return {
    logo,
    cssCustomProperties: toString(cssCustomProperties),
    colors,
    colorScheme,
  };
}

export function toString(obj?: CustomPropertiesObject) {
  if (obj) {
    return Object.entries(obj)
      .map((pair) => pair.join(':'))
      .join(';');
  } else {
    return '';
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
