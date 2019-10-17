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
      ['--top-bar-background-lighter', 'hsl(184, 85%, 43%, 1)'],
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

/* eslint-disable babel/camelcase */
describe('buildCustomProperties', () => {
  const legacyCustomProperties = {
    '--top-bar-background': '#eeeeee',
    '--top-bar-background-lighter': 'hsl(0, 10%, 100%, 1)',
    '--top-bar-color': 'rgb(33, 43, 54)',
  };

  it('creates legacy custom properties but ignores new custom properties when global theming is disabled', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}},
      UNSTABLE_colors: {surface: '#ffffff'},
    };

    const colors = buildCustomProperties(theme, false);
    expect(colors).toStrictEqual(legacyCustomProperties);
  });

  it('creates new custom properties when global theming is enabled but ignores legacy colors', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}},
      UNSTABLE_colors: {surface: '#ffffff'},
    };

    const colors = buildCustomProperties(theme, true);
    expect(colors).toStrictEqual(
      expect.objectContaining({
        '--p-surface': 'hsl(0, 0%, 100%, 1)',
        '--p-surface-background': 'hsl(0, 0%, 98%, 1)',
        '--p-surface-foreground': 'hsl(0, 0%, 100%, 1)',
        '--p-surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
        '--p-surface-inverse': 'hsl(0, 0%, 0%, 1)',
        '--p-surface-hovered': 'hsl(0, 0%, 93%, 1)',
        '--p-surface-pressed': 'hsl(0, 0%, 86%, 1)',
      }),
    );
    expect(colors).not.toStrictEqual(
      expect.objectContaining(legacyCustomProperties),
    );
  });
});

describe('buildColors', () => {
  describe('surface', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-surface': 'hsl(0, 0%, 98%, 1)',
          '--p-surface-background': 'hsl(0, 0%, 98%, 1)',
          '--p-surface-foreground': 'hsl(0, 0%, 100%, 1)',
          '--p-surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
          '--p-surface-inverse': 'hsl(0, 0%, 0%, 1)',
          '--p-surface-hovered': 'hsl(0, 0%, 93%, 1)',
          '--p-surface-pressed': 'hsl(0, 0%, 86%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({UNSTABLE_colors: {surface: '#ffffff'}}),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-surface': 'hsl(0, 0%, 100%, 1)',
          '--p-surface-background': 'hsl(0, 0%, 98%, 1)',
          '--p-surface-foreground': 'hsl(0, 0%, 100%, 1)',
          '--p-surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
          '--p-surface-inverse': 'hsl(0, 0%, 0%, 1)',
          '--p-surface-hovered': 'hsl(0, 0%, 93%, 1)',
          '--p-surface-pressed': 'hsl(0, 0%, 86%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({UNSTABLE_colors: {surface: '#000000'}}),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-surface': 'hsl(0, 0%, 0%, 1)',
          '--p-surface-background': 'hsl(0, 0%, 7%, 1)',
          '--p-surface-foreground': 'hsl(0, 0%, 13%, 1)',
          '--p-surface-foreground-subdued': 'hsl(0, 0%, 10%, 1)',
          '--p-surface-inverse': 'hsl(0, 0%, 100%, 1)',
          '--p-surface-hovered': 'hsl(0, 0%, 20%, 1)',
          '--p-surface-pressed': 'hsl(0, 0%, 27%, 1)',
        }),
      );
    });
  });

  describe('onSurface', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-action-disabled-on-dark': 'hsl(210, 9%, 66%, 1)',
          '--p-action-disabled-on-inverse': 'hsl(210, 9%, 66%, 1)',
          '--p-action-disabled-on-light': 'hsl(210, 9%, 46%, 1)',
          '--p-action-disabled-on-surface': 'hsl(210, 9%, 46%, 1)',
          '--p-action-hovered-on-dark': 'hsl(210, 9%, 86%, 1)',
          '--p-action-hovered-on-inverse': 'hsl(210, 9%, 86%, 1)',
          '--p-action-hovered-on-light': 'hsl(210, 9%, 26%, 1)',
          '--p-action-hovered-on-surface': 'hsl(210, 9%, 26%, 1)',
          '--p-action-on-dark': 'hsl(210, 9%, 76%, 1)',
          '--p-action-on-inverse': 'hsl(210, 9%, 76%, 1)',
          '--p-action-on-light': 'hsl(210, 9%, 36%, 1)',
          '--p-action-on-surface': 'hsl(210, 9%, 36%, 1)',
          '--p-action-pressed-on-dark': 'hsl(210, 9%, 96%, 1)',
          '--p-action-pressed-on-inverse': 'hsl(210, 9%, 96%, 1)',
          '--p-action-pressed-on-light': 'hsl(210, 9%, 16%, 1)',
          '--p-action-pressed-on-surface': 'hsl(210, 9%, 16%, 1)',
          '--p-divider-disabled-on-dark': 'hsl(210, 9%, 70%, 1)',
          '--p-divider-disabled-on-inverse': 'hsl(210, 9%, 70%, 1)',
          '--p-divider-disabled-on-light': 'hsl(210, 9%, 95%, 1)',
          '--p-divider-disabled-on-surface': 'hsl(210, 9%, 95%, 1)',
          '--p-divider-on-dark': 'hsl(210, 9%, 80%, 1)',
          '--p-divider-on-inverse': 'hsl(210, 9%, 80%, 1)',
          '--p-divider-on-light': 'hsl(210, 9%, 75%, 1)',
          '--p-divider-on-surface': 'hsl(210, 9%, 75%, 1)',
          '--p-divider-subdued-on-dark': 'hsl(210, 9%, 75%, 1)',
          '--p-divider-subdued-on-inverse': 'hsl(210, 9%, 75%, 1)',
          '--p-divider-subdued-on-light': 'hsl(210, 9%, 85%, 1)',
          '--p-divider-subdued-on-surface': 'hsl(210, 9%, 85%, 1)',
          '--p-icon-disabled-on-dark': 'hsl(210, 9%, 75%, 1)',
          '--p-icon-disabled-on-inverse': 'hsl(210, 9%, 75%, 1)',
          '--p-icon-disabled-on-light': 'hsl(210, 9%, 68%, 1)',
          '--p-icon-disabled-on-surface': 'hsl(210, 9%, 68%, 1)',
          '--p-icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--p-icon-on-dark': 'hsl(210, 9%, 98%, 1)',
          '--p-icon-on-inverse': 'hsl(210, 9%, 98%, 1)',
          '--p-icon-on-light': 'hsl(210, 9%, 18%, 1)',
          '--p-icon-on-surface': 'hsl(210, 9%, 18%, 1)',
          '--p-icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--p-icon-subdued-on-dark': 'hsl(210, 9%, 88%, 1)',
          '--p-icon-subdued-on-inverse': 'hsl(210, 9%, 88%, 1)',
          '--p-icon-subdued-on-light': 'hsl(210, 9%, 43%, 1)',
          '--p-icon-subdued-on-surface': 'hsl(210, 9%, 43%, 1)',
          '--p-on-surface': 'hsl(210, 9%, 13%, 1)',
          '--p-text-disabled-on-dark': 'hsl(210, 9%, 80%, 1)',
          '--p-text-disabled-on-inverse': 'hsl(210, 9%, 80%, 1)',
          '--p-text-disabled-on-light': 'hsl(210, 9%, 63%, 1)',
          '--p-text-disabled-on-surface': 'hsl(210, 9%, 63%, 1)',
          '--p-text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--p-text-on-dark': 'hsl(210, 9%, 100%, 1)',
          '--p-text-on-inverse': 'hsl(210, 9%, 100%, 1)',
          '--p-text-on-light': 'hsl(210, 9%, 13%, 1)',
          '--p-text-on-surface': 'hsl(210, 9%, 13%, 1)',
          '--p-text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--p-text-subdued-on-dark': 'hsl(210, 9%, 90%, 1)',
          '--p-text-subdued-on-inverse': 'hsl(210, 9%, 90%, 1)',
          '--p-text-subdued-on-light': 'hsl(210, 9%, 38%, 1)',
          '--p-text-subdued-on-surface': 'hsl(210, 9%, 38%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', onSurface: '#000000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-action-disabled-on-dark': 'hsl(0, 0%, 66%, 1)',
          '--p-action-disabled-on-inverse': 'hsl(0, 0%, 66%, 1)',
          '--p-action-disabled-on-light': 'hsl(0, 0%, 46%, 1)',
          '--p-action-disabled-on-surface': 'hsl(0, 0%, 46%, 1)',
          '--p-action-hovered-on-dark': 'hsl(0, 0%, 86%, 1)',
          '--p-action-hovered-on-inverse': 'hsl(0, 0%, 86%, 1)',
          '--p-action-hovered-on-light': 'hsl(0, 0%, 26%, 1)',
          '--p-action-hovered-on-surface': 'hsl(0, 0%, 26%, 1)',
          '--p-action-on-dark': 'hsl(0, 0%, 76%, 1)',
          '--p-action-on-inverse': 'hsl(0, 0%, 76%, 1)',
          '--p-action-on-light': 'hsl(0, 0%, 36%, 1)',
          '--p-action-on-surface': 'hsl(0, 0%, 36%, 1)',
          '--p-action-pressed-on-dark': 'hsl(0, 0%, 96%, 1)',
          '--p-action-pressed-on-inverse': 'hsl(0, 0%, 96%, 1)',
          '--p-action-pressed-on-light': 'hsl(0, 0%, 16%, 1)',
          '--p-action-pressed-on-surface': 'hsl(0, 0%, 16%, 1)',
          '--p-divider-disabled-on-dark': 'hsl(0, 0%, 70%, 1)',
          '--p-divider-disabled-on-inverse': 'hsl(0, 0%, 70%, 1)',
          '--p-divider-disabled-on-light': 'hsl(0, 0%, 95%, 1)',
          '--p-divider-disabled-on-surface': 'hsl(0, 0%, 95%, 1)',
          '--p-divider-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--p-divider-on-inverse': 'hsl(0, 0%, 80%, 1)',
          '--p-divider-on-light': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-subdued-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-subdued-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-subdued-on-light': 'hsl(0, 0%, 85%, 1)',
          '--p-divider-subdued-on-surface': 'hsl(0, 0%, 85%, 1)',
          '--p-icon-disabled-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--p-icon-disabled-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--p-icon-disabled-on-light': 'hsl(0, 0%, 68%, 1)',
          '--p-icon-disabled-on-surface': 'hsl(0, 0%, 68%, 1)',
          '--p-icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--p-icon-on-dark': 'hsl(0, 0%, 98%, 1)',
          '--p-icon-on-inverse': 'hsl(0, 0%, 98%, 1)',
          '--p-icon-on-light': 'hsl(0, 0%, 18%, 1)',
          '--p-icon-on-surface': 'hsl(0, 0%, 18%, 1)',
          '--p-icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--p-icon-subdued-on-dark': 'hsl(0, 0%, 88%, 1)',
          '--p-icon-subdued-on-inverse': 'hsl(0, 0%, 88%, 1)',
          '--p-icon-subdued-on-light': 'hsl(0, 0%, 43%, 1)',
          '--p-icon-subdued-on-surface': 'hsl(0, 0%, 43%, 1)',
          '--p-on-surface': 'hsl(0, 0%, 0%, 1)',
          '--p-text-disabled-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--p-text-disabled-on-inverse': 'hsl(0, 0%, 80%, 1)',
          '--p-text-disabled-on-light': 'hsl(0, 0%, 63%, 1)',
          '--p-text-disabled-on-surface': 'hsl(0, 0%, 63%, 1)',
          '--p-text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--p-text-on-dark': 'hsl(0, 0%, 100%, 1)',
          '--p-text-on-inverse': 'hsl(0, 0%, 100%, 1)',
          '--p-text-on-light': 'hsl(0, 0%, 13%, 1)',
          '--p-text-on-surface': 'hsl(0, 0%, 13%, 1)',
          '--p-text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--p-text-subdued-on-dark': 'hsl(0, 0%, 90%, 1)',
          '--p-text-subdued-on-inverse': 'hsl(0, 0%, 90%, 1)',
          '--p-text-subdued-on-light': 'hsl(0, 0%, 38%, 1)',
          '--p-text-subdued-on-surface': 'hsl(0, 0%, 38%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', onSurface: '#ffffff'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-action-disabled-on-dark': 'hsl(0, 0%, 66%, 1)',
          '--p-action-disabled-on-inverse': 'hsl(0, 0%, 46%, 1)',
          '--p-action-disabled-on-light': 'hsl(0, 0%, 46%, 1)',
          '--p-action-disabled-on-surface': 'hsl(0, 0%, 66%, 1)',
          '--p-action-hovered-on-dark': 'hsl(0, 0%, 86%, 1)',
          '--p-action-hovered-on-inverse': 'hsl(0, 0%, 26%, 1)',
          '--p-action-hovered-on-light': 'hsl(0, 0%, 26%, 1)',
          '--p-action-hovered-on-surface': 'hsl(0, 0%, 86%, 1)',
          '--p-action-on-dark': 'hsl(0, 0%, 76%, 1)',
          '--p-action-on-inverse': 'hsl(0, 0%, 36%, 1)',
          '--p-action-on-light': 'hsl(0, 0%, 36%, 1)',
          '--p-action-on-surface': 'hsl(0, 0%, 76%, 1)',
          '--p-action-pressed-on-dark': 'hsl(0, 0%, 96%, 1)',
          '--p-action-pressed-on-inverse': 'hsl(0, 0%, 16%, 1)',
          '--p-action-pressed-on-light': 'hsl(0, 0%, 16%, 1)',
          '--p-action-pressed-on-surface': 'hsl(0, 0%, 96%, 1)',
          '--p-divider-disabled-on-dark': 'hsl(0, 0%, 70%, 1)',
          '--p-divider-disabled-on-inverse': 'hsl(0, 0%, 95%, 1)',
          '--p-divider-disabled-on-light': 'hsl(0, 0%, 95%, 1)',
          '--p-divider-disabled-on-surface': 'hsl(0, 0%, 70%, 1)',
          '--p-divider-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--p-divider-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-on-light': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-on-surface': 'hsl(0, 0%, 80%, 1)',
          '--p-divider-subdued-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--p-divider-subdued-on-inverse': 'hsl(0, 0%, 85%, 1)',
          '--p-divider-subdued-on-light': 'hsl(0, 0%, 85%, 1)',
          '--p-divider-subdued-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--p-icon-disabled-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--p-icon-disabled-on-inverse': 'hsl(0, 0%, 68%, 1)',
          '--p-icon-disabled-on-light': 'hsl(0, 0%, 68%, 1)',
          '--p-icon-disabled-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--p-icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--p-icon-on-dark': 'hsl(0, 0%, 98%, 1)',
          '--p-icon-on-inverse': 'hsl(0, 0%, 18%, 1)',
          '--p-icon-on-light': 'hsl(0, 0%, 18%, 1)',
          '--p-icon-on-surface': 'hsl(0, 0%, 98%, 1)',
          '--p-icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--p-icon-subdued-on-dark': 'hsl(0, 0%, 88%, 1)',
          '--p-icon-subdued-on-inverse': 'hsl(0, 0%, 43%, 1)',
          '--p-icon-subdued-on-light': 'hsl(0, 0%, 43%, 1)',
          '--p-icon-subdued-on-surface': 'hsl(0, 0%, 88%, 1)',
          '--p-on-surface': 'hsl(0, 0%, 100%, 1)',
          '--p-text-disabled-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--p-text-disabled-on-inverse': 'hsl(0, 0%, 63%, 1)',
          '--p-text-disabled-on-light': 'hsl(0, 0%, 63%, 1)',
          '--p-text-disabled-on-surface': 'hsl(0, 0%, 80%, 1)',
          '--p-text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--p-text-on-dark': 'hsl(0, 0%, 100%, 1)',
          '--p-text-on-inverse': 'hsl(0, 0%, 13%, 1)',
          '--p-text-on-light': 'hsl(0, 0%, 13%, 1)',
          '--p-text-on-surface': 'hsl(0, 0%, 100%, 1)',
          '--p-text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--p-text-subdued-on-dark': 'hsl(0, 0%, 90%, 1)',
          '--p-text-subdued-on-inverse': 'hsl(0, 0%, 38%, 1)',
          '--p-text-subdued-on-light': 'hsl(0, 0%, 38%, 1)',
          '--p-text-subdued-on-surface': 'hsl(0, 0%, 90%, 1)',
        }),
      );
    });
  });

  describe('interactive', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-interactive': 'hsl(210, 93%, 44%, 1)',
          '--p-interactive-action': 'hsl(210, 93%, 44%, 1)',
          '--p-interactive-action-disabled': 'hsl(210, 93%, 58%, 1)',
          '--p-interactive-action-hovered': 'hsl(210, 93%, 37%, 1)',
          '--p-interactive-action-pressed': 'hsl(210, 93%, 31%, 1)',
          '--p-interactive-action-subdued': 'hsl(210, 93%, 51%, 1)',
          '--p-interactive-focus': 'hsl(210, 93%, 58%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', interactive: '#0000FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-interactive': 'hsl(240, 100%, 50%, 1)',
          '--p-interactive-action': 'hsl(240, 100%, 44%, 1)',
          '--p-interactive-action-disabled': 'hsl(240, 100%, 58%, 1)',
          '--p-interactive-action-hovered': 'hsl(240, 100%, 37%, 1)',
          '--p-interactive-action-pressed': 'hsl(240, 100%, 31%, 1)',
          '--p-interactive-action-subdued': 'hsl(240, 100%, 51%, 1)',
          '--p-interactive-focus': 'hsl(240, 100%, 58%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', interactive: '#0000FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-interactive': 'hsl(240, 100%, 50%, 1)',
          '--p-interactive-action': 'hsl(240, 100%, 56%, 1)',
          '--p-interactive-action-disabled': 'hsl(240, 100%, 42%, 1)',
          '--p-interactive-action-hovered': 'hsl(240, 100%, 63%, 1)',
          '--p-interactive-action-pressed': 'hsl(240, 100%, 69%, 1)',
          '--p-interactive-action-subdued': 'hsl(240, 100%, 49%, 1)',
          '--p-interactive-focus': 'hsl(240, 100%, 42%, 1)',
        }),
      );
    });
  });

  describe('neutral', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-neutral': 'hsl(240, 2%, 92%, 1)',
          '--p-neutral-action-disabled': 'hsl(240, 2%, 94%, 1)',
          '--p-neutral-action': 'hsl(240, 2%, 92%, 1)',
          '--p-neutral-action-hovered': 'hsl(240, 2%, 86%, 1)',
          '--p-neutral-action-pressed': 'hsl(240, 2%, 76%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', neutral: '#778899'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-neutral': 'hsl(210, 14.000000000000002%, 53%, 1)',

          '--p-neutral-action-disabled':
            'hsl(210, 14.000000000000002%, 94%, 1)',
          '--p-neutral-action': 'hsl(210, 14.000000000000002%, 92%, 1)',
          '--p-neutral-action-hovered': 'hsl(210, 14.000000000000002%, 86%, 1)',
          '--p-neutral-action-pressed': 'hsl(210, 14.000000000000002%, 76%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', neutral: '#778899'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-neutral': 'hsl(210, 14.000000000000002%, 53%, 1)',
          '--p-neutral-action-disabled':
            'hsl(210, 14.000000000000002%, 13%, 1)',
          '--p-neutral-action': 'hsl(210, 14.000000000000002%, 22%, 1)',
          '--p-neutral-action-hovered': 'hsl(210, 14.000000000000002%, 29%, 1)',
          '--p-neutral-action-pressed': 'hsl(210, 14.000000000000002%, 39%, 1)',
        }),
      );
    });
  });

  describe('branded', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-branded': 'hsl(165, 100%, 25%, 1)',
          '--p-branded-action': 'hsl(165, 100%, 25%, 1)',
          '--p-branded-action-disabled': 'hsl(165, 100%, 32%, 1)',
          '--p-branded-action-hovered': 'hsl(165, 100%, 22%, 1)',
          '--p-branded-action-pressed': 'hsl(165, 100%, 15%, 1)',
          '--p-branded-selected': 'hsl(165, 30%, 95%, 1)',
          '--p-branded-selected-hovered': 'hsl(165, 22%, 81%, 1)',
          '--p-branded-selected-pressed': 'hsl(165, 22%, 74%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', branded: '#FF00FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-branded': 'hsl(300, 100%, 50%, 1)',
          '--p-branded-action': 'hsl(300, 100%, 25%, 1)',
          '--p-branded-action-disabled': 'hsl(300, 100%, 32%, 1)',
          '--p-branded-action-hovered': 'hsl(300, 100%, 22%, 1)',
          '--p-branded-action-pressed': 'hsl(300, 100%, 15%, 1)',
          '--p-branded-selected': 'hsl(300, 30%, 95%, 1)',
          '--p-branded-selected-hovered': 'hsl(300, 22%, 81%, 1)',
          '--p-branded-selected-pressed': 'hsl(300, 22%, 74%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', branded: '#FF00FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-branded': 'hsl(300, 100%, 50%, 1)',
          '--p-branded-action': 'hsl(300, 100%, 25%, 1)',
          '--p-branded-action-disabled': 'hsl(300, 100%, 32%, 1)',
          '--p-branded-action-hovered': 'hsl(300, 100%, 22%, 1)',
          '--p-branded-action-pressed': 'hsl(300, 100%, 15%, 1)',
          '--p-branded-selected': 'hsl(300, 30%, 5%, 1)',
          '--p-branded-selected-hovered': 'hsl(300, 22%, 19%, 1)',
          '--p-branded-selected-pressed': 'hsl(300, 22%, 26%, 1)',
        }),
      );
    });
  });

  describe('critical', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-critical': 'hsl(0, 77%, 52%, 1)',
          '--p-critical-divider': 'hsl(0, 77%, 52%, 1)',
          '--p-critical-icon': 'hsl(0, 77%, 52%, 1)',
          '--p-critical-surface': 'hsl(0, 77%, 88%, 1)',
          '--p-critical-surface-subdued': 'hsl(0, 77%, 98%, 1)',
          '--p-critical-text': 'hsl(0, 77%, 30%, 1)',
          '--p-critical-action-disabled': 'hsl(0, 77%, 59%, 1)',
          '--p-critical-action': 'hsl(0, 77%, 52%, 1)',
          '--p-critical-action-hovered': 'hsl(0, 77%, 45%, 1)',
          '--p-critical-action-subdued': 'hsl(0, 77%, 38%, 1)',
          '--p-critical-action-pressed': 'hsl(0, 77%, 31%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', critical: '#DC143C'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-critical': 'hsl(348, 83%, 47%, 1)',
          '--p-critical-divider': 'hsl(348, 83%, 52%, 1)',
          '--p-critical-icon': 'hsl(348, 83%, 52%, 1)',
          '--p-critical-surface': 'hsl(348, 83%, 88%, 1)',
          '--p-critical-surface-subdued': 'hsl(348, 83%, 98%, 1)',
          '--p-critical-text': 'hsl(348, 83%, 30%, 1)',
          '--p-critical-action-disabled': 'hsl(348, 83%, 59%, 1)',
          '--p-critical-action': 'hsl(348, 83%, 52%, 1)',
          '--p-critical-action-hovered': 'hsl(348, 83%, 45%, 1)',
          '--p-critical-action-pressed': 'hsl(348, 83%, 31%, 1)',
          '--p-critical-action-subdued': 'hsl(348, 83%, 38%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', critical: '#DC143C'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-critical': 'hsl(348, 83%, 47%, 1)',
          '--p-critical-divider': 'hsl(348, 83%, 48%, 1)',
          '--p-critical-icon': 'hsl(348, 83%, 48%, 1)',
          '--p-critical-surface': 'hsl(348, 83%, 12%, 1)',
          '--p-critical-surface-subdued': 'hsl(348, 83%, 12%, 1)',
          '--p-critical-text': 'hsl(348, 83%, 70%, 1)',
          '--p-critical-action': 'hsl(348, 83%, 48%, 1)',
          '--p-critical-action-disabled': 'hsl(348, 83%, 41%, 1)',
          '--p-critical-action-hovered': 'hsl(348, 83%, 55%, 1)',
          '--p-critical-action-pressed': 'hsl(348, 83%, 69%, 1)',
          '--p-critical-action-subdued': 'hsl(348, 83%, 62%, 1)',
        }),
      );
    });
  });

  describe('warning', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-warning': 'hsl(39, 100%, 66%, 1)',
          '--p-warning-divider': 'hsl(39, 100%, 66%, 1)',
          '--p-warning-icon': 'hsl(39, 100%, 66%, 1)',
          '--p-warning-surface': 'hsl(39, 100%, 88%, 1)',
          '--p-warning-surface-subdued': 'hsl(39, 100%, 98%, 1)',
          '--p-warning-text': 'hsl(39, 100%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', warning: '#FF8C00'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-warning': 'hsl(33, 100%, 50%, 1)',
          '--p-warning-divider': 'hsl(33, 100%, 66%, 1)',
          '--p-warning-icon': 'hsl(33, 100%, 66%, 1)',
          '--p-warning-surface': 'hsl(33, 100%, 88%, 1)',
          '--p-warning-surface-subdued': 'hsl(33, 100%, 98%, 1)',
          '--p-warning-text': 'hsl(33, 100%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', warning: '#FF8C00'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-warning': 'hsl(33, 100%, 50%, 1)',
          '--p-warning-divider': 'hsl(33, 100%, 34%, 1)',
          '--p-warning-icon': 'hsl(33, 100%, 34%, 1)',
          '--p-warning-surface': 'hsl(33, 100%, 12%, 1)',
          '--p-warning-surface-subdued': 'hsl(33, 100%, 12%, 1)',
          '--p-warning-text': 'hsl(33, 100%, 70%, 1)',
        }),
      );
    });
  });

  describe('highlight', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-highlight':
            'hsl(173, 56.00000000000001%, 57.99999999999999%, 1)',
          '--p-highlight-divider': 'hsl(173, 56.00000000000001%, 58%, 1)',
          '--p-highlight-icon': 'hsl(173, 56.00000000000001%, 58%, 1)',
          '--p-highlight-surface': 'hsl(173, 56.00000000000001%, 88%, 1)',
          '--p-highlight-surface-subdued':
            'hsl(173, 56.00000000000001%, 98%, 1)',
          '--p-highlight-text': 'hsl(173, 56.00000000000001%, 98%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', highlight: '#00FFFF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-highlight': 'hsl(180, 100%, 50%, 1)',
          '--p-highlight-divider': 'hsl(180, 100%, 58%, 1)',
          '--p-highlight-icon': 'hsl(180, 100%, 58%, 1)',
          '--p-highlight-surface': 'hsl(180, 100%, 88%, 1)',
          '--p-highlight-surface-subdued': 'hsl(180, 100%, 98%, 1)',
          '--p-highlight-text': 'hsl(180, 100%, 98%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', highlight: '#00FFFF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-highlight': 'hsl(180, 100%, 50%, 1)',
          '--p-highlight-divider': 'hsl(180, 100%, 42%, 1)',
          '--p-highlight-icon': 'hsl(180, 100%, 42%, 1)',
          '--p-highlight-surface': 'hsl(180, 100%, 12%, 1)',
          '--p-highlight-surface-subdued': 'hsl(180, 100%, 12%, 1)',
          '--p-highlight-text': 'hsl(180, 100%, 2%, 1)',
        }),
      );
    });
  });

  describe('success', () => {
    it('has a default value', () => {
      expect(buildColors({UNSTABLE_colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--p-success': 'hsl(165, 100%, 25%, 1)',
          '--p-success-divider': 'hsl(165, 100%, 25%, 1)',
          '--p-success-icon': 'hsl(165, 100%, 25%, 1)',
          '--p-success-surface': 'hsl(165, 100%, 88%, 1)',
          '--p-success-surface-subdued': 'hsl(165, 100%, 98%, 1)',
          '--p-success-text': 'hsl(165, 100%, 15%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#ffffff', success: '#008000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-success': 'hsl(120, 100%, 25%, 1)',
          '--p-success-divider': 'hsl(120, 100%, 25%, 1)',
          '--p-success-icon': 'hsl(120, 100%, 25%, 1)',
          '--p-success-surface': 'hsl(120, 100%, 88%, 1)',
          '--p-success-surface-subdued': 'hsl(120, 100%, 98%, 1)',
          '--p-success-text': 'hsl(120, 100%, 15%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        buildColors({
          UNSTABLE_colors: {surface: '#000000', success: '#008000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--p-success': 'hsl(120, 100%, 25%, 1)',
          '--p-success-divider': 'hsl(120, 100%, 35%, 1)',
          '--p-success-icon': 'hsl(120, 100%, 35%, 1)',
          '--p-success-surface': 'hsl(120, 100%, 12%, 1)',
          '--p-success-surface-subdued': 'hsl(120, 100%, 12%, 1)',
          '--p-success-text': 'hsl(120, 100%, 85%, 1)',
        }),
      );
    });
  });
});

describe('buildThemeContext', () => {
  it('reduces theme config down to a theme', () => {
    expect(
      buildThemeContext({colors: {}, logo: {}}, {foo: 'bar'}),
    ).toStrictEqual({logo: {}, UNSTABLE_cssCustomProperties: 'foo:bar'});
  });
});
/* eslint-enable babel/camelcase */
