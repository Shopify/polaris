import tokens from '@shopify/polaris-tokens';
import {hexToHsluv, hsluvToHex} from 'hsluv';
import isEqual from 'lodash/isEqual';
import {HSLColor, HSLAColor} from '../color-types';
import {
  colorToHsla,
  hslToString,
  hslToRgb,
  hexToRgb,
} from '../color-transformers';
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
  Variant,
  HslaSetting,
} from './types';
import {roleVariants, UNSTABLE_Color} from './role-variants';

export function buildCustomProperties(
  themeConfig: ThemeConfig,
  globalTheming: boolean,
): CustomPropertiesLike {
  return globalTheming
    ? customPropertyTransformer({
        ...buildColors(themeConfig, roleVariants),
        ...overrides(),
      })
    : buildLegacyColors(themeConfig);
}

export function buildThemeContext(
  themeConfig: ThemeConfig,
  cssCustomProperties?: CustomPropertiesLike,
): Theme {
  const {logo} = themeConfig;
  return {
    logo,
    UNSTABLE_cssCustomProperties: toString(cssCustomProperties),
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
  theme: ThemeConfig,
  roleVariants: Partial<RoleVariants>,
) {
  const colors = {
    surface: UNSTABLE_Color.Surface,
    onSurface: UNSTABLE_Color.OnSurface,
    interactive: UNSTABLE_Color.Interactive,
    neutral: UNSTABLE_Color.Neutral,
    primary: UNSTABLE_Color.Primary,
    critical: UNSTABLE_Color.Critical,
    warning: UNSTABLE_Color.Warning,
    highlight: UNSTABLE_Color.Highlight,
    success: UNSTABLE_Color.Success,
    decorative: UNSTABLE_Color.Decorative,
    ...theme.UNSTABLE_colors,
  };

  const lightSurface = isLight(hexToRgb(colors.surface));

  return Object.entries(roleVariants).reduce(
    (acc1, [role, variants]: [Role, Variant[]]) => {
      const base = hexToHsluvObj(colors[role]);
      return {
        ...acc1,
        ...variants.reduce((acc2, {name, light, dark}) => {
          const configs: Record<string, HslaSetting> = {
            default: lightSurface ? light : dark,
          };

          if (!isEqual(light, dark)) {
            configs.Inverse = lightSurface ? dark : light;
            configs.Light = light;
            configs.Dark = dark;
          }

          return {
            ...acc2,
            ...Object.entries(configs).reduce((acc3, [variant, config]) => {
              const {
                hue = base.hue,
                saturation = base.saturation,
                lightness = base.lightness,
                alpha = 1,
              } = config;

              const displayName =
                variant === 'default' ? name : `${name}${variant}`;

              return {
                ...acc3,
                [displayName]: hslToString({
                  ...colorToHsla(hsluvToHex([hue, saturation, lightness])),
                  alpha,
                }),
              };
            }, {}),
          };
        }, {}),
      };
    },
    {},
  );
}

function overrides() {
  return {
    overrideNone: 'none',
    overrideTransparent: 'transparent',
    overrideOne: '1',
    overrideVisible: 'visible',
    overrideZero: '0',
    overrideLoadingZIndex: '514',
    buttonFontWeight: '500',
    nonNullContent: "''",
    borderRadiusBase: rem('4px'),
    borderRadiusWide: rem('8px'),
    bannerDefaultBorder: buildBannerBorder('--p-border-on-surface'),
    bannerSuccessBorder: buildBannerBorder('--p-success-border'),
    bannerHighlightBorder: buildBannerBorder('--p-highlight-border'),
    bannerWarningBorder: buildBannerBorder('--p-warning-border'),
    bannerCriticalBorder: buildBannerBorder('--p-critical-border'),
    badgeMixBlendMode: 'luminosity',
    borderSubdued: `${rem('1px')} solid var(--p-border-subdued-on-surface)`,
    textFieldSpinnerOffset: rem('2px'),
    textFieldFocusRingOffset: rem('-4px'),
    textFieldFocusRingBorderRadius: rem('7px'),
    cardShadow:
      '0px 0px 5px var(--p-shadow-from-ambient-light), 0px 1px 2px var(--p-shadow-from-direct-light)',
    popoverShadow:
      '-1px 0px 20px var(--p-shadow-from-ambient-light), 0px 1px 5px var(--p-shadow-from-direct-light)',
    modalShadow:
      '0px 6px 32px var(--p-shadow-from-ambient-light), 0px 1px 6px var(--p-shadow-from-direct-light)',
    buttonGroupItemSpacing: rem('2px'),
  };
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

function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}

function buildBannerBorder(cssVar: string) {
  return `inset 0 ${rem('2px')} 0 0 var(${cssVar}), inset 0 0 0 ${rem(
    '2px',
  )} var(${cssVar})`;
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
