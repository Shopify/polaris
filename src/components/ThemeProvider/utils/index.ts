import tokens from '@shopify/polaris-tokens';
import {needsVariantList} from '../config';
import {HSLColor, HSLAColor} from '../../../utilities/color-types';
import {
  colorToHsla,
  hslToRgb,
  hslToString,
  rgbToHex,
} from '../../../utilities/color-transformers';
import {isLight} from '../../../utilities/color-validation';
import {constructColorName} from '../../../utilities/color-names';
import {
  createLightColor,
  opacifyColor,
  lightenColor,
  darkenColor,
  mixColors,
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

function noop() {}

const NAMESPACE = 'polaris';

const hslToHex: (color: HSLColor | HSLAColor) => string = compose(
  rgbToHex,
  hslToRgb,
);

type CSSProperties = {
  [key: string]: string;
};

export function createColorRange(
  baseColor: string,
  colorRole: string,
  options?: {
    opacify?: boolean;
    stops?: number;
    increment?: number;
  },
) {
  const {opacify = false, stops = 2, increment = 22} = options || {};

  const hslBaseColor = colorToHsla(baseColor);
  const rgbBaseColor = hslToRgb(colorToHsla(baseColor) as HSLAColor);

  const base = {
    [constructColorName(NAMESPACE, colorRole)]: baseColor,
  };

  const lightRange = createLightRange(
    stops,
    colorRole,
    hslBaseColor as HSLColor,
    increment,
  );

  const darkRange = createDarkRange(
    stops,
    colorRole,
    hslBaseColor as HSLColor,
    increment,
  );

  const opaqueRange = opacify && createOpaqueRange(baseColor, colorRole);

  const on = {
    [constructColorName(NAMESPACE, colorRole, 'on')]: rgbToHex(
      mixColors(rgbBaseColor, {red: 0, green: 0, blue: 0}, 45),
    ),
  };

  return {
    ...base,
    ...lightRange,
    ...darkRange,
    ...opaqueRange,
    ...on,
  };
}

export function createSurfaceRange(
  baseColor: string,
  colorRole: string,
): CSSProperties {
  const hslBaseColor = colorToHsla(baseColor);
  const rgbBaseColor = hslToRgb(hslBaseColor as HSLColor);

  const config = {
    stops: 29,
    increment: 3,
  };

  let greyRange: CSSProperties;

  if (isLight(rgbBaseColor)) {
    greyRange = createDarkRange(
      config.stops,
      colorRole,
      hslBaseColor as HSLColor,
      config.increment,
      {suffix: ''},
    );
  } else {
    greyRange = createLightRange(
      config.stops,
      colorRole,
      hslBaseColor as HSLColor,
      config.increment,
      {suffix: ''},
    );
  }

  const opposingBaseColor: string = Object.values(greyRange).slice(-1)[0];

  const base = {
    [constructColorName(NAMESPACE, colorRole, '0')]: baseColor,
  };

  const baseOpacified = createOpaqueRange(baseColor, colorRole, {
    suffix: 'baseOpacified',
  });

  const opposingBaseOpacified = createOpaqueRange(
    opposingBaseColor,
    colorRole,
    {suffix: 'opposingOpacified'},
  );

  return {
    ...base,
    ...greyRange,
    ...baseOpacified,
    ...opposingBaseOpacified,
  };
}

function createLightRange(
  stops: number,
  colorRole: string,
  hslBaseColor: HSLColor,
  increment: number,
  options?: {
    suffix?: string;
  },
): CSSProperties {
  const {suffix = 'lightened'} = options || {};
  return Array.from({length: stops}, (_, i) => i + 1).reduce(
    (colorStyles: CSSProperties, stop) => {
      const color = hslToHex(lightenColor(
        hslBaseColor,
        increment * stop,
      ) as HSLColor);
      const validColor = isHex(color) ? color : '#ffffff';
      colorStyles[
        constructColorName(NAMESPACE, colorRole, `${suffix}${stop}`)
      ] = validColor;
      return colorStyles;
    },
    {},
  );
}

function createDarkRange(
  stops: number,
  colorRole: string,
  hslBaseColor: HSLColor,
  increment: number,
  options?: {
    suffix?: string;
  },
): CSSProperties {
  const {suffix = 'darkened'} = options || {};
  return Array.from({length: stops}, (_, i) => i + 1).reduce(
    (colorStyles: CSSProperties, stop) => {
      const color = hslToHex(darkenColor(
        hslBaseColor,
        increment * stop,
      ) as HSLColor);
      const validColor = isHex(color) ? color : '#000000';
      colorStyles[
        constructColorName(NAMESPACE, colorRole, `${suffix}${stop}`)
      ] = validColor;
      return colorStyles;
    },
    {},
  );
}

function createOpaqueRange(
  baseColor: string,
  colorRole: string,
  options?: {
    suffix?: string;
  },
): CSSProperties {
  const {hue, saturation, lightness} = colorToHsla(baseColor) as HSLColor;
  const {suffix = 'opacified'} = options || {};
  return [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].reduce(
    (colorStyles: CSSProperties, stop) => {
      colorStyles[
        constructColorName(
          NAMESPACE,
          colorRole,
          `${suffix}${stop.toString().split('0.')[1]}`,
        )
      ] = hslToString(
        opacifyColor({hue, saturation, lightness, alpha: 1}, stop),
      );

      return colorStyles;
    },
    {},
  );
}

function isHex(color: string): boolean {
  return RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gim).test(color);
}
