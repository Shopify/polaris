import tokens from '@shopify/polaris-tokens';
import {noop} from '@shopify/javascript-utilities/other';
import {needsVariantList} from '../config';
import {HSLColor} from '../../ColorPicker/types';
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

import {
  Theme,
  ThemeContext,
  ColorsToParse,
  ThemeVariant,
  ThemeColors,
} from '../types';

export function setColors(theme: Theme | undefined) {
  if (theme && theme.colors) {
    Object.entries(theme.colors).forEach(([colorKey, pairs]) => {
      const colorKeys = Object.keys(pairs);
      if (colorKey === 'topBar' && colorKeys.length > 1) {
        colorKeys.forEach((key: string) => {
          const colors = (theme.colors as ThemeColors).topBar;
          setRootProperty(constructColorName(colorKey, key), colors[key]);
        });
      } else {
        parseColors([colorKey, pairs]);
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

export function setTextColor(name: string, variant: ThemeVariant = 'dark') {
  if (variant === 'light') {
    setRootProperty(name, tokens.colorInkBase);
    return;
  }

  setRootProperty(name, tokens.colorWhiteBase);
}

export function setTheme(
  color: string | HSLColor,
  baseName: string,
  key: string,
  variant: 'light' | 'dark',
) {
  switch (variant) {
    case 'light':
      setTextColor(constructColorName(baseName, null, 'color'), 'light');

      setRootProperty(
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 14, 30),
      );

      setRootProperty(
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 9, 10),
      );

      break;
    case 'dark':
      setTextColor(constructColorName(baseName, null, 'color'), 'dark');

      setRootProperty(
        constructColorName(baseName, key, 'darker'),
        darkenToString(color, 9, 10),
      );

      setRootProperty(
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 14, 30),
      );

      break;
    default:
  }
}

function parseColors([baseName, colors]: [string, ColorsToParse]) {
  const keys = Object.keys(colors);
  for (let i = 0; i < keys.length; i++) {
    setRootProperty(constructColorName(baseName, keys[i]), colors[keys[i]]);

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[keys[i]]);

      if (typeof hslColor === 'string') {
        return;
      }

      const rgbColor = hslToRgb(hslColor);

      if (isLight(rgbColor)) {
        setTheme(hslColor, baseName, keys[i], 'light');
      } else {
        setTheme(hslColor, baseName, keys[i], 'dark');
      }
    }
  }
}

export function createThemeContext(
  theme: ThemeContext = {
    logo: null,
    subscribe: noop,
    unsubscribe: noop,
  },
): {theme: ThemeContext} {
  return {theme};
}
