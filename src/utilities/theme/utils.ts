import tokens from '@shopify/polaris-tokens';
import {hexToHsluv, hsluvToHex} from 'hsluv';
import {HSLColor, HSLAColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';
import {compose} from '../compose';
import {needsVariantList} from './config';
import {
  ThemeConfig,
  Theme,
  CustomPropertiesLike,
  RoleVariants,
  Role,
  RoleColors,
  ColorScheme,
  Lambda,
} from './types';

import {roleVariants} from './role-variants';

interface CustomPropertiesConfig extends ThemeConfig {
  colorScheme: ColorScheme;
}

export function buildCustomProperties(
  themeConfig: CustomPropertiesConfig,
  globalTheming: boolean,
  tokens?: Record<string, string>,
): CustomPropertiesLike {
  const {UNSTABLE_colors = {}, colorScheme} = themeConfig;
  return globalTheming
    ? customPropertyTransformer({
        ...buildColors(UNSTABLE_colors, roleVariants, colorScheme),
        ...tokens,
      })
    : buildLegacyColors(themeConfig);
}

export function buildThemeContext(
  themeConfig: ThemeConfig,
  cssCustomProperties?: CustomPropertiesLike,
): Theme {
  const {logo, UNSTABLE_colors, colorScheme} = themeConfig;
  return {
    logo,
    UNSTABLE_cssCustomProperties: toString(cssCustomProperties),
    UNSTABLE_colors,
    colorScheme,
  };
}

function toString(obj?: CustomPropertiesLike) {
  if (obj) {
    return Object.entries(obj)
      .map((pair) => pair.join(':'))
      .join(';');
  } else {
    return undefined;
  }
}

function hexToHsluvObj(hex: string) {
  const [hue, saturation, lightness] = hexToHsluv(hex);

  return {
    hue,
    saturation,
    lightness,
  };
}

export function buildColors(
  colors: Partial<RoleColors>,
  roleVariants: Partial<RoleVariants>,
  colorScheme: ColorScheme,
) {
  return Object.assign(
    {},
    ...Object.entries(colors).map(([role, hex]: [Role, string]) => {
      const base = hexToHsluvObj(hex);
      const variants = roleVariants[role] || [];
      return {
        ...variants.reduce((accumulator, {name, ...settings}) => {
          const {
            hue = base.hue,
            saturation = base.saturation,
            lightness = base.lightness,
            alpha = 1,
          } = settings[colorScheme];

          const resolve = (value: number | Lambda, base: number) =>
            typeof value === 'number' ? value : value(base);

          return {
            ...accumulator,
            [name]: hslToString({
              ...colorToHsla(
                hsluvToHex([
                  resolve(hue, base.hue),
                  resolve(saturation, base.saturation),
                  resolve(lightness, base.lightness),
                ]),
              ),
              alpha,
            }),
          };
        }, {}),
      };
    }),
  );
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

function buildLegacyColors(theme?: ThemeConfig): CustomPropertiesLike {
  let colorPairs;
  const colors =
    theme && theme.colors && theme.colors.topBar
      ? theme.colors.topBar
      : {background: '#00848e', backgroundLighter: '#1d9ba4', color: '#f9fafb'};

  const colorKey = 'topBar';
  const colorKeys = Object.keys(colors);

  if (colorKeys.length > 1) {
    colorPairs = colorKeys.map((key) => {
      return [constructColorName(colorKey, key), colors[key]];
    });
  } else {
    colorPairs = parseColors([colorKey, colors]);
  }

  return colorPairs.reduce(
    (state, [key, value]) => ({...state, [key]: value}),
    {},
  );
}

export function needsVariant(name: string) {
  return needsVariantList.includes(name);
}

const lightenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(hslToString, createLightColor);

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
  for (const key of keys) {
    colorPairs.push([constructColorName(baseName, key), colors[key]]);

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[key]);

      if (typeof hslColor === 'string') {
        return colorPairs;
      }

      const rgbColor = hslToRgb(hslColor);

      if (isLight(rgbColor)) {
        colorPairs.push(...setTheme(hslColor, baseName, key, 'light'));
      } else {
        colorPairs.push(...setTheme(hslColor, baseName, key, 'dark'));
      }
    }
  }

  return colorPairs;
}
