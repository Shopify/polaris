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
import {setRootProperty} from '../../../utilities/setRootProperty';

import {Context as ThemeProviderContext} from '../ThemeProvider';
import {
  Theme,
  ColorsToParse,
  ThemeVariant,
  ThemeColors,
  ThemeContext,
} from '../types';

export function setColors(theme: Theme | undefined, node: Element | null) {
  if (theme && theme.colors) {
    Object.entries(theme.colors).forEach(([colorKey, pairs]) => {
      const colorKeys = Object.keys(pairs);
      if (colorKey === 'topBar' && colorKeys.length > 1) {
        colorKeys.forEach((key: string) => {
          const colors = (theme.colors as ThemeColors).topBar;
          setRootProperty(constructColorName(colorKey, key), colors[key], node);
        });
      } else {
        parseColors([colorKey, pairs], node);
      }
    });
  }
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
  node: Element | null,
) {
  if (variant === 'light') {
    setRootProperty(name, tokens.colorInkBase, node);
    return;
  }

  setRootProperty(name, tokens.colorWhiteBase, node);
}

export function setTheme(
  color: string | HSLColor,
  baseName: string,
  key: string,
  variant: 'light' | 'dark',
  node: Element | null,
) {
  switch (variant) {
    case 'light':
      setTextColor(constructColorName(baseName, null, 'color'), 'light', node);

      setRootProperty(
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 0, 0),
        node,
      );

      setRootProperty(
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 12, 60),
        node,
      );

      break;
    case 'dark':
      setTextColor(constructColorName(baseName, null, 'color'), 'dark', node);

      setRootProperty(
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 5, -5),
        node,
      );

      setRootProperty(
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 10, -20),
        node,
      );

      break;
    default:
  }
}

function parseColors(
  [baseName, colors]: [string, ColorsToParse],
  node: Element | null,
) {
  const keys = Object.keys(colors);
  for (let i = 0; i < keys.length; i++) {
    setRootProperty(
      constructColorName(baseName, keys[i]),
      colors[keys[i]],
      node,
    );

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[keys[i]]);

      if (typeof hslColor === 'string') {
        return;
      }

      const rgbColor = hslToRgb(hslColor);

      if (isLight(rgbColor)) {
        setTheme(hslColor, baseName, keys[i], 'light', node);
      } else {
        setTheme(hslColor, baseName, keys[i], 'dark', node);
      }
    }
  }
}

export function createThemeContext(theme?: ThemeContext): ThemeProviderContext {
  if (!theme) {
    return {theme: {logo: null, subscribe: noop, unsubscribe: noop}};
  }

  const {logo = null, subscribe = noop, unsubscribe = noop} = theme;
  return {theme: {logo, subscribe, unsubscribe}};
}
