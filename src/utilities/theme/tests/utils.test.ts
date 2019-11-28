import tokens from '@shopify/polaris-tokens';
import {needsVariantList} from '../config';
import {
  needsVariant,
  setTextColor,
  setTheme,
  buildThemeContext,
  buildCustomProperties,
  buildColors,
} from '../utils';
import {RoleVariants} from '../types';

describe('setTextColor', () => {
  it('sets a css variable to white if the variant is dark', () => {
    const textColor = setTextColor('topBar', 'dark');
    expect(textColor).toStrictEqual(['topBar', tokens.colorWhite]);
  });

  it('sets a css variable to ink if the variant is light', () => {
    const textColor = setTextColor('topBar', 'light');
    expect(textColor).toStrictEqual(['topBar', tokens.colorInk]);
  });
});

describe('setTheme', () => {
  it('returns a base theme', () => {
    const theme = setTheme(
      {hue: 184, saturation: 100, lightness: 28},
      'topBar',
      'background',
      'dark',
    );

    expect(theme).toStrictEqual([
      ['--top-bar-color', 'rgb(255, 255, 255)'],
      ['--top-bar-background-lighter', 'hsla(184, 85%, 43%, 1)'],
    ]);
  });
});

describe('needsVariant', () => {
  it('will return false if the parameter is not on the list', () => {
    const hasVariant = needsVariant('frame');
    expect(hasVariant).toBe(needsVariantList.includes('frame'));
  });

  it('will return true if the paramater is on the list', () => {
    const hasVariant = needsVariant('topBar');
    expect(hasVariant).toBe(needsVariantList.includes('topBar'));
  });
});

describe('buildCustomProperties', () => {
  const legacyCustomProperties = {
    '--top-bar-background': '#eeeeee',
    '--top-bar-background-lighter': 'hsla(0, 10%, 100%, 1)',
    '--top-bar-color': 'rgb(33, 43, 54)',
  };

  it('creates legacy custom properties but ignores new custom properties when global theming is disabled', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}},
      UNSTABLE_colors: {surface: '#ffffff'},
    };

    const colors = buildCustomProperties(theme, false);
    expect(colors).toStrictEqual(legacyCustomProperties);
    expect(colors).not.toStrictEqual(
      expect.objectContaining({'--p-surface': 'hsla(0, 0%, 100%, 1)'}),
    );
  });

  it('creates new custom properties when global theming is enabled but ignores legacy colors', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}},
      UNSTABLE_colors: {surface: '#ffffff'},
    };

    const colors = Object.keys(buildCustomProperties(theme, true));
    expect(colors).toContain('--p-surface');
    expect(colors).not.toContain('--top-bar-background');
  });
});

describe('buildColors', () => {
  const different: Partial<RoleVariants> = {
    surface: [
      {
        name: 'surface',
        light: {lightness: 100},
        dark: {lightness: 0},
      },
    ],
  };

  const same: Partial<RoleVariants> = {
    surface: [
      {
        name: 'surface',
        light: {lightness: 100},
        dark: {lightness: 100},
      },
    ],
  };

  it('creates inverse, light, and dark variants when light and dark adjustments are different', () => {
    expect(
      Object.keys(buildColors({UNSTABLE_colors: {}}, different)),
    ).toStrictEqual([
      'surface',
      'surfaceInverse',
      'surfaceLight',
      'surfaceDark',
    ]);
  });

  it('does not create inverse, light, and dark variants when light and dark adjustments are the same', () => {
    expect(
      Object.keys(buildColors({UNSTABLE_colors: {}}, same)),
    ).toStrictEqual(['surface']);
  });

  it('uses light adjustments if the surface value is light', () => {
    expect(
      buildColors({UNSTABLE_colors: {surface: '#CCCCCC'}}, different),
    ).toStrictEqual(
      expect.objectContaining({
        surface: 'hsla(0, 0%, 100%, 1)',
      }),
    );
  });

  it('uses dark adjustments if the surface value is dark', () => {
    expect(
      buildColors({UNSTABLE_colors: {surface: '#333333'}}, different),
    ).toStrictEqual(
      expect.objectContaining({
        surface: 'hsla(0, 0%, 0%, 1)',
      }),
    );
  });
});

describe('buildThemeContext', () => {
  it('reduces theme config down to a theme', () => {
    expect(
      buildThemeContext({colors: {}, logo: {}}, {foo: 'bar'}),
    ).toStrictEqual({logo: {}, UNSTABLE_cssCustomProperties: 'foo:bar'});
  });
});
