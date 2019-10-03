import tokens from '@shopify/polaris-tokens';
import {needsVariantList} from '../config';
import {
  needsVariant,
  setTextColor,
  setTheme,
  buildThemeContext,
  buildCustomProperties,
  Colors,
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

describe('buildCustomProperties', () => {
  it('creates legacy custom properties but ignores new custom properties when global theming is disabled', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}, surface: '#ffffff'},
    };

    const colors = buildCustomProperties(theme, false);
    expect(colors).toStrictEqual({
      '--top-bar-background': '#eeeeee',
      '--top-bar-background-lighter': 'hsl(0, 10%, 100%, 1)',
      '--top-bar-color': 'rgb(33, 43, 54)',
    });
  });

  it('creates legacy custom properties with new custom properties when global theming is enabled', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}, surface: '#ffffff'},
    };

    const colors = buildCustomProperties(theme, true);
    expect(colors).toStrictEqual(
      expect.objectContaining({
        '--surface': 'hsl(0, 0%, 100%, 1)',
        '--surface-background': 'hsl(0, 0%, 98%, 1)',
        '--surface-foreground': 'hsl(0, 0%, 100%, 1)',
        '--surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
        '--surface-inverse': 'hsl(0, 0%, 0%, 1)',
        '--top-bar-background': '#eeeeee',
        '--top-bar-background-lighter': 'hsl(0, 10%, 100%, 1)',
        '--top-bar-color': 'rgb(33, 43, 54)',
      }),
    );
  });
});

describe('Colors', () => {
  describe('surface', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--surface': 'hsl(0, 0%, 98%, 1)',
          '--surface-background': 'hsl(0, 0%, 98%, 1)',
          '--surface-foreground': 'hsl(0, 0%, 100%, 1)',
          '--surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
          '--surface-inverse': 'hsl(0, 0%, 0%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(Colors({colors: {surface: '#ffffff'}})).toStrictEqual(
        expect.objectContaining({
          '--surface': 'hsl(0, 0%, 100%, 1)',
          '--surface-background': 'hsl(0, 0%, 98%, 1)',
          '--surface-foreground': 'hsl(0, 0%, 100%, 1)',
          '--surface-foreground-subdued': 'hsl(0, 0%, 90%, 1)',
          '--surface-inverse': 'hsl(0, 0%, 0%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(Colors({colors: {surface: '#000000'}})).toStrictEqual(
        expect.objectContaining({
          '--surface': 'hsl(0, 0%, 0%, 1)',
          '--surface-background': 'hsl(0, 0%, 7%, 1)',
          '--surface-foreground': 'hsl(0, 0%, 13%, 1)',
          '--surface-foreground-subdued': 'hsl(0, 0%, 10%, 1)',
          '--surface-inverse': 'hsl(0, 0%, 100%, 1)',
        }),
      );
    });
  });

  describe('onSurface', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--action-disabled-on-dark': 'hsl(210, 9%, 66%, 1)',
          '--action-disabled-on-inverse': 'hsl(210, 9%, 66%, 1)',
          '--action-disabled-on-light': 'hsl(210, 9%, 46%, 1)',
          '--action-disabled-on-surface': 'hsl(210, 9%, 46%, 1)',
          '--action-hovered-on-dark': 'hsl(210, 9%, 86%, 1)',
          '--action-hovered-on-inverse': 'hsl(210, 9%, 86%, 1)',
          '--action-hovered-on-light': 'hsl(210, 9%, 26%, 1)',
          '--action-hovered-on-surface': 'hsl(210, 9%, 26%, 1)',
          '--action-on-dark': 'hsl(210, 9%, 76%, 1)',
          '--action-on-inverse': 'hsl(210, 9%, 76%, 1)',
          '--action-on-light': 'hsl(210, 9%, 36%, 1)',
          '--action-on-surface': 'hsl(210, 9%, 36%, 1)',
          '--action-pressed-on-dark': 'hsl(210, 9%, 96%, 1)',
          '--action-pressed-on-inverse': 'hsl(210, 9%, 96%, 1)',
          '--action-pressed-on-light': 'hsl(210, 9%, 16%, 1)',
          '--action-pressed-on-surface': 'hsl(210, 9%, 16%, 1)',
          '--divider-disabled-on-dark': 'hsl(210, 9%, 70%, 1)',
          '--divider-disabled-on-inverse': 'hsl(210, 9%, 70%, 1)',
          '--divider-disabled-on-light': 'hsl(210, 9%, 95%, 1)',
          '--divider-disabled-on-surface': 'hsl(210, 9%, 95%, 1)',
          '--divider-on-dark': 'hsl(210, 9%, 80%, 1)',
          '--divider-on-inverse': 'hsl(210, 9%, 80%, 1)',
          '--divider-on-light': 'hsl(210, 9%, 75%, 1)',
          '--divider-on-surface': 'hsl(210, 9%, 75%, 1)',
          '--divider-subdued-on-dark': 'hsl(210, 9%, 75%, 1)',
          '--divider-subdued-on-inverse': 'hsl(210, 9%, 75%, 1)',
          '--divider-subdued-on-light': 'hsl(210, 9%, 85%, 1)',
          '--divider-subdued-on-surface': 'hsl(210, 9%, 85%, 1)',
          '--icon-disabled-on-dark': 'hsl(210, 9%, 75%, 1)',
          '--icon-disabled-on-inverse': 'hsl(210, 9%, 75%, 1)',
          '--icon-disabled-on-light': 'hsl(210, 9%, 68%, 1)',
          '--icon-disabled-on-surface': 'hsl(210, 9%, 68%, 1)',
          '--icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--icon-on-dark': 'hsl(210, 9%, 98%, 1)',
          '--icon-on-inverse': 'hsl(210, 9%, 98%, 1)',
          '--icon-on-light': 'hsl(210, 9%, 18%, 1)',
          '--icon-on-surface': 'hsl(210, 9%, 18%, 1)',
          '--icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--icon-subdued-on-dark': 'hsl(210, 9%, 88%, 1)',
          '--icon-subdued-on-inverse': 'hsl(210, 9%, 88%, 1)',
          '--icon-subdued-on-light': 'hsl(210, 9%, 43%, 1)',
          '--icon-subdued-on-surface': 'hsl(210, 9%, 43%, 1)',
          '--on-surface': 'hsl(210, 9%, 13%, 1)',
          '--text-disabled-on-dark': 'hsl(210, 9%, 80%, 1)',
          '--text-disabled-on-inverse': 'hsl(210, 9%, 80%, 1)',
          '--text-disabled-on-light': 'hsl(210, 9%, 63%, 1)',
          '--text-disabled-on-surface': 'hsl(210, 9%, 63%, 1)',
          '--text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--text-on-dark': 'hsl(210, 9%, 100%, 1)',
          '--text-on-inverse': 'hsl(210, 9%, 100%, 1)',
          '--text-on-light': 'hsl(210, 9%, 13%, 1)',
          '--text-on-surface': 'hsl(210, 9%, 13%, 1)',
          '--text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--text-subdued-on-dark': 'hsl(210, 9%, 90%, 1)',
          '--text-subdued-on-inverse': 'hsl(210, 9%, 90%, 1)',
          '--text-subdued-on-light': 'hsl(210, 9%, 38%, 1)',
          '--text-subdued-on-surface': 'hsl(210, 9%, 38%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', onSurface: '#000000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--action-disabled-on-dark': 'hsl(0, 0%, 66%, 1)',
          '--action-disabled-on-inverse': 'hsl(0, 0%, 66%, 1)',
          '--action-disabled-on-light': 'hsl(0, 0%, 46%, 1)',
          '--action-disabled-on-surface': 'hsl(0, 0%, 46%, 1)',
          '--action-hovered-on-dark': 'hsl(0, 0%, 86%, 1)',
          '--action-hovered-on-inverse': 'hsl(0, 0%, 86%, 1)',
          '--action-hovered-on-light': 'hsl(0, 0%, 26%, 1)',
          '--action-hovered-on-surface': 'hsl(0, 0%, 26%, 1)',
          '--action-on-dark': 'hsl(0, 0%, 76%, 1)',
          '--action-on-inverse': 'hsl(0, 0%, 76%, 1)',
          '--action-on-light': 'hsl(0, 0%, 36%, 1)',
          '--action-on-surface': 'hsl(0, 0%, 36%, 1)',
          '--action-pressed-on-dark': 'hsl(0, 0%, 96%, 1)',
          '--action-pressed-on-inverse': 'hsl(0, 0%, 96%, 1)',
          '--action-pressed-on-light': 'hsl(0, 0%, 16%, 1)',
          '--action-pressed-on-surface': 'hsl(0, 0%, 16%, 1)',
          '--divider-disabled-on-dark': 'hsl(0, 0%, 70%, 1)',
          '--divider-disabled-on-inverse': 'hsl(0, 0%, 70%, 1)',
          '--divider-disabled-on-light': 'hsl(0, 0%, 95%, 1)',
          '--divider-disabled-on-surface': 'hsl(0, 0%, 95%, 1)',
          '--divider-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--divider-on-inverse': 'hsl(0, 0%, 80%, 1)',
          '--divider-on-light': 'hsl(0, 0%, 75%, 1)',
          '--divider-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--divider-subdued-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--divider-subdued-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--divider-subdued-on-light': 'hsl(0, 0%, 85%, 1)',
          '--divider-subdued-on-surface': 'hsl(0, 0%, 85%, 1)',
          '--icon-disabled-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--icon-disabled-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--icon-disabled-on-light': 'hsl(0, 0%, 68%, 1)',
          '--icon-disabled-on-surface': 'hsl(0, 0%, 68%, 1)',
          '--icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--icon-on-dark': 'hsl(0, 0%, 98%, 1)',
          '--icon-on-inverse': 'hsl(0, 0%, 98%, 1)',
          '--icon-on-light': 'hsl(0, 0%, 18%, 1)',
          '--icon-on-surface': 'hsl(0, 0%, 18%, 1)',
          '--icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--icon-subdued-on-dark': 'hsl(0, 0%, 88%, 1)',
          '--icon-subdued-on-inverse': 'hsl(0, 0%, 88%, 1)',
          '--icon-subdued-on-light': 'hsl(0, 0%, 43%, 1)',
          '--icon-subdued-on-surface': 'hsl(0, 0%, 43%, 1)',
          '--on-surface': 'hsl(0, 0%, 0%, 1)',
          '--text-disabled-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--text-disabled-on-inverse': 'hsl(0, 0%, 80%, 1)',
          '--text-disabled-on-light': 'hsl(0, 0%, 63%, 1)',
          '--text-disabled-on-surface': 'hsl(0, 0%, 63%, 1)',
          '--text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--text-on-dark': 'hsl(0, 0%, 100%, 1)',
          '--text-on-inverse': 'hsl(0, 0%, 100%, 1)',
          '--text-on-light': 'hsl(0, 0%, 13%, 1)',
          '--text-on-surface': 'hsl(0, 0%, 13%, 1)',
          '--text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--text-subdued-on-dark': 'hsl(0, 0%, 90%, 1)',
          '--text-subdued-on-inverse': 'hsl(0, 0%, 90%, 1)',
          '--text-subdued-on-light': 'hsl(0, 0%, 38%, 1)',
          '--text-subdued-on-surface': 'hsl(0, 0%, 38%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', onSurface: '#ffffff'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--action-disabled-on-dark': 'hsl(0, 0%, 66%, 1)',
          '--action-disabled-on-inverse': 'hsl(0, 0%, 46%, 1)',
          '--action-disabled-on-light': 'hsl(0, 0%, 46%, 1)',
          '--action-disabled-on-surface': 'hsl(0, 0%, 66%, 1)',
          '--action-hovered-on-dark': 'hsl(0, 0%, 86%, 1)',
          '--action-hovered-on-inverse': 'hsl(0, 0%, 26%, 1)',
          '--action-hovered-on-light': 'hsl(0, 0%, 26%, 1)',
          '--action-hovered-on-surface': 'hsl(0, 0%, 86%, 1)',
          '--action-on-dark': 'hsl(0, 0%, 76%, 1)',
          '--action-on-inverse': 'hsl(0, 0%, 36%, 1)',
          '--action-on-light': 'hsl(0, 0%, 36%, 1)',
          '--action-on-surface': 'hsl(0, 0%, 76%, 1)',
          '--action-pressed-on-dark': 'hsl(0, 0%, 96%, 1)',
          '--action-pressed-on-inverse': 'hsl(0, 0%, 16%, 1)',
          '--action-pressed-on-light': 'hsl(0, 0%, 16%, 1)',
          '--action-pressed-on-surface': 'hsl(0, 0%, 96%, 1)',
          '--divider-disabled-on-dark': 'hsl(0, 0%, 70%, 1)',
          '--divider-disabled-on-inverse': 'hsl(0, 0%, 95%, 1)',
          '--divider-disabled-on-light': 'hsl(0, 0%, 95%, 1)',
          '--divider-disabled-on-surface': 'hsl(0, 0%, 70%, 1)',
          '--divider-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--divider-on-inverse': 'hsl(0, 0%, 75%, 1)',
          '--divider-on-light': 'hsl(0, 0%, 75%, 1)',
          '--divider-on-surface': 'hsl(0, 0%, 80%, 1)',
          '--divider-subdued-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--divider-subdued-on-inverse': 'hsl(0, 0%, 85%, 1)',
          '--divider-subdued-on-light': 'hsl(0, 0%, 85%, 1)',
          '--divider-subdued-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--icon-disabled-on-dark': 'hsl(0, 0%, 75%, 1)',
          '--icon-disabled-on-inverse': 'hsl(0, 0%, 68%, 1)',
          '--icon-disabled-on-light': 'hsl(0, 0%, 68%, 1)',
          '--icon-disabled-on-surface': 'hsl(0, 0%, 75%, 1)',
          '--icon-on-branded': 'hsl(165, 100%, 98%, 1)',
          '--icon-on-dark': 'hsl(0, 0%, 98%, 1)',
          '--icon-on-inverse': 'hsl(0, 0%, 18%, 1)',
          '--icon-on-light': 'hsl(0, 0%, 18%, 1)',
          '--icon-on-surface': 'hsl(0, 0%, 98%, 1)',
          '--icon-subdued-on-branded': 'hsl(165, 100%, 88%, 1)',
          '--icon-subdued-on-dark': 'hsl(0, 0%, 88%, 1)',
          '--icon-subdued-on-inverse': 'hsl(0, 0%, 43%, 1)',
          '--icon-subdued-on-light': 'hsl(0, 0%, 43%, 1)',
          '--icon-subdued-on-surface': 'hsl(0, 0%, 88%, 1)',
          '--on-surface': 'hsl(0, 0%, 100%, 1)',
          '--text-disabled-on-dark': 'hsl(0, 0%, 80%, 1)',
          '--text-disabled-on-inverse': 'hsl(0, 0%, 63%, 1)',
          '--text-disabled-on-light': 'hsl(0, 0%, 63%, 1)',
          '--text-disabled-on-surface': 'hsl(0, 0%, 80%, 1)',
          '--text-on-branded': 'hsl(165, 100%, 100%, 1)',
          '--text-on-dark': 'hsl(0, 0%, 100%, 1)',
          '--text-on-inverse': 'hsl(0, 0%, 13%, 1)',
          '--text-on-light': 'hsl(0, 0%, 13%, 1)',
          '--text-on-surface': 'hsl(0, 0%, 100%, 1)',
          '--text-subdued-on-branded': 'hsl(165, 100%, 90%, 1)',
          '--text-subdued-on-dark': 'hsl(0, 0%, 90%, 1)',
          '--text-subdued-on-inverse': 'hsl(0, 0%, 38%, 1)',
          '--text-subdued-on-light': 'hsl(0, 0%, 38%, 1)',
          '--text-subdued-on-surface': 'hsl(0, 0%, 90%, 1)',
        }),
      );
    });
  });

  describe('interactive', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--interactive': 'hsl(210, 93%, 44%, 1)',
          '--interactive-action': 'hsl(210, 93%, 44%, 1)',
          '--interactive-action-disabled': 'hsl(210, 93%, 58%, 1)',
          '--interactive-action-hovered': 'hsl(210, 93%, 37%, 1)',
          '--interactive-action-pressed': 'hsl(210, 93%, 31%, 1)',
          '--interactive-action-subdued': 'hsl(210, 93%, 51%, 1)',
          '--interactive-focus': 'hsl(210, 93%, 58%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', interactive: '#0000FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--interactive': 'hsl(240, 100%, 50%, 1)',
          '--interactive-action': 'hsl(240, 100%, 44%, 1)',
          '--interactive-action-disabled': 'hsl(240, 100%, 58%, 1)',
          '--interactive-action-hovered': 'hsl(240, 100%, 37%, 1)',
          '--interactive-action-pressed': 'hsl(240, 100%, 31%, 1)',
          '--interactive-action-subdued': 'hsl(240, 100%, 51%, 1)',
          '--interactive-focus': 'hsl(240, 100%, 58%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', interactive: '#0000FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--interactive': 'hsl(240, 100%, 50%, 1)',
          '--interactive-action': 'hsl(240, 100%, 56%, 1)',
          '--interactive-action-disabled': 'hsl(240, 100%, 42%, 1)',
          '--interactive-action-hovered': 'hsl(240, 100%, 63%, 1)',
          '--interactive-action-pressed': 'hsl(240, 100%, 69%, 1)',
          '--interactive-action-subdued': 'hsl(240, 100%, 49%, 1)',
          '--interactive-focus': 'hsl(240, 100%, 42%, 1)',
        }),
      );
    });
  });

  describe('interactiveNeutral', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--interactive-neutral': 'hsl(240, 2%, 92%, 1)',
          '--interactive-neutral-elevation-0': 'hsl(240, 2%, 100%, 1)',
          '--interactive-neutral-elevation-1': 'hsl(240, 2%, 94%, 1)',
          '--interactive-neutral-elevation-2': 'hsl(240, 2%, 92%, 1)',
          '--interactive-neutral-elevation-3': 'hsl(240, 2%, 86%, 1)',
          '--interactive-neutral-elevation-4': 'hsl(240, 2%, 76%, 1)',
          '--interactive-neutral-elevation-5': 'hsl(240, 2%, 66%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', interactiveNeutral: '#778899'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--interactive-neutral': 'hsl(210, 14.000000000000002%, 53%, 1)',
          '--interactive-neutral-elevation-0':
            'hsl(210, 14.000000000000002%, 100%, 1)',
          '--interactive-neutral-elevation-1':
            'hsl(210, 14.000000000000002%, 94%, 1)',
          '--interactive-neutral-elevation-2':
            'hsl(210, 14.000000000000002%, 92%, 1)',
          '--interactive-neutral-elevation-3':
            'hsl(210, 14.000000000000002%, 86%, 1)',
          '--interactive-neutral-elevation-4':
            'hsl(210, 14.000000000000002%, 76%, 1)',
          '--interactive-neutral-elevation-5':
            'hsl(210, 14.000000000000002%, 66%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', interactiveNeutral: '#778899'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--interactive-neutral': 'hsl(210, 14.000000000000002%, 53%, 1)',
          '--interactive-neutral-elevation-0':
            'hsl(210, 14.000000000000002%, 7%, 1)',
          '--interactive-neutral-elevation-1':
            'hsl(210, 14.000000000000002%, 13%, 1)',
          '--interactive-neutral-elevation-2':
            'hsl(210, 14.000000000000002%, 22%, 1)',
          '--interactive-neutral-elevation-3':
            'hsl(210, 14.000000000000002%, 29%, 1)',
          '--interactive-neutral-elevation-4':
            'hsl(210, 14.000000000000002%, 39%, 1)',
          '--interactive-neutral-elevation-5':
            'hsl(210, 14.000000000000002%, 49%, 1)',
        }),
      );
    });
  });

  describe('branded', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--branded': 'hsl(165, 100%, 25%, 1)',
          '--branded-action': 'hsl(165, 100%, 25%, 1)',
          '--branded-action-disabled': 'hsl(165, 100%, 32%, 1)',
          '--branded-action-hovered': 'hsl(165, 100%, 22%, 1)',
          '--branded-action-pressed': 'hsl(165, 100%, 15%, 1)',
          '--branded-selected': 'hsl(165, 100%, 95%, 1)',
          '--branded-selected-hovered': 'hsl(165, 100%, 81%, 1)',
          '--branded-selected-pressed': 'hsl(165, 100%, 74%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', branded: '#FF00FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--branded': 'hsl(300, 100%, 50%, 1)',
          '--branded-action': 'hsl(300, 100%, 25%, 1)',
          '--branded-action-disabled': 'hsl(300, 100%, 32%, 1)',
          '--branded-action-hovered': 'hsl(300, 100%, 22%, 1)',
          '--branded-action-pressed': 'hsl(300, 100%, 15%, 1)',
          '--branded-selected': 'hsl(300, 100%, 95%, 1)',
          '--branded-selected-hovered': 'hsl(300, 100%, 81%, 1)',
          '--branded-selected-pressed': 'hsl(300, 100%, 74%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', branded: '#FF00FF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--branded': 'hsl(300, 100%, 50%, 1)',
          '--branded-action': 'hsl(300, 100%, 25%, 1)',
          '--branded-action-disabled': 'hsl(300, 100%, 32%, 1)',
          '--branded-action-hovered': 'hsl(300, 100%, 22%, 1)',
          '--branded-action-pressed': 'hsl(300, 100%, 15%, 1)',
          '--branded-selected': 'hsl(300, 100%, 5%, 1)',
          '--branded-selected-hovered': 'hsl(300, 100%, 19%, 1)',
          '--branded-selected-pressed': 'hsl(300, 100%, 26%, 1)',
        }),
      );
    });
  });

  describe('critical', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--critical': 'hsl(0, 77%, 52%, 1)',
          '--critical-divider': 'hsl(0, 77%, 52%, 1)',
          '--critical-icon': 'hsl(0, 77%, 52%, 1)',
          '--critical-surface': 'hsl(0, 77%, 88%, 1)',
          '--critical-surface-subdued': 'hsl(0, 77%, 98%, 1)',
          '--critical-text': 'hsl(0, 77%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', critical: '#DC143C'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--critical': 'hsl(348, 83%, 47%, 1)',
          '--critical-divider': 'hsl(348, 83%, 52%, 1)',
          '--critical-icon': 'hsl(348, 83%, 52%, 1)',
          '--critical-surface': 'hsl(348, 83%, 88%, 1)',
          '--critical-surface-subdued': 'hsl(348, 83%, 98%, 1)',
          '--critical-text': 'hsl(348, 83%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', critical: '#DC143C'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--critical': 'hsl(348, 83%, 47%, 1)',
          '--critical-divider': 'hsl(348, 83%, 48%, 1)',
          '--critical-icon': 'hsl(348, 83%, 48%, 1)',
          '--critical-surface': 'hsl(348, 83%, 12%, 1)',
          '--critical-surface-subdued': 'hsl(348, 83%, 12%, 1)',
          '--critical-text': 'hsl(348, 83%, 70%, 1)',
        }),
      );
    });
  });

  describe('warning', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--warning': 'hsl(39, 100%, 66%, 1)',
          '--warning-divider': 'hsl(39, 100%, 66%, 1)',
          '--warning-icon': 'hsl(39, 100%, 66%, 1)',
          '--warning-surface': 'hsl(39, 100%, 88%, 1)',
          '--warning-surface-subdued': 'hsl(39, 100%, 98%, 1)',
          '--warning-text': 'hsl(39, 100%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', warning: '#FF8C00'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--warning': 'hsl(33, 100%, 50%, 1)',
          '--warning-divider': 'hsl(33, 100%, 66%, 1)',
          '--warning-icon': 'hsl(33, 100%, 66%, 1)',
          '--warning-surface': 'hsl(33, 100%, 88%, 1)',
          '--warning-surface-subdued': 'hsl(33, 100%, 98%, 1)',
          '--warning-text': 'hsl(33, 100%, 30%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', warning: '#FF8C00'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--warning': 'hsl(33, 100%, 50%, 1)',
          '--warning-divider': 'hsl(33, 100%, 34%, 1)',
          '--warning-icon': 'hsl(33, 100%, 34%, 1)',
          '--warning-surface': 'hsl(33, 100%, 12%, 1)',
          '--warning-surface-subdued': 'hsl(33, 100%, 12%, 1)',
          '--warning-text': 'hsl(33, 100%, 70%, 1)',
        }),
      );
    });
  });

  describe('highlight', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--highlight': 'hsl(173, 56.00000000000001%, 57.99999999999999%, 1)',
          '--highlight-divider': 'hsl(173, 56.00000000000001%, 58%, 1)',
          '--highlight-icon': 'hsl(173, 56.00000000000001%, 58%, 1)',
          '--highlight-surface': 'hsl(173, 56.00000000000001%, 88%, 1)',
          '--highlight-surface-subdued': 'hsl(173, 56.00000000000001%, 98%, 1)',
          '--highlight-text': 'hsl(173, 56.00000000000001%, 98%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', highlight: '#00FFFF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--highlight': 'hsl(180, 100%, 50%, 1)',
          '--highlight-divider': 'hsl(180, 100%, 58%, 1)',
          '--highlight-icon': 'hsl(180, 100%, 58%, 1)',
          '--highlight-surface': 'hsl(180, 100%, 88%, 1)',
          '--highlight-surface-subdued': 'hsl(180, 100%, 98%, 1)',
          '--highlight-text': 'hsl(180, 100%, 98%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', highlight: '#00FFFF'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--highlight': 'hsl(180, 100%, 50%, 1)',
          '--highlight-divider': 'hsl(180, 100%, 42%, 1)',
          '--highlight-icon': 'hsl(180, 100%, 42%, 1)',
          '--highlight-surface': 'hsl(180, 100%, 12%, 1)',
          '--highlight-surface-subdued': 'hsl(180, 100%, 12%, 1)',
          '--highlight-text': 'hsl(180, 100%, 2%, 1)',
        }),
      );
    });
  });

  describe('success', () => {
    it('has a default value', () => {
      expect(Colors({colors: {}})).toStrictEqual(
        expect.objectContaining({
          '--success': 'hsl(165, 100%, 25%, 1)',
          '--success-divider': 'hsl(165, 100%, 25%, 1)',
          '--success-icon': 'hsl(165, 100%, 25%, 1)',
          '--success-surface': 'hsl(165, 100%, 88%, 1)',
          '--success-surface-subdued': 'hsl(165, 100%, 98%, 1)',
          '--success-text': 'hsl(165, 100%, 15%, 1)',
        }),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Colors({
          colors: {surface: '#ffffff', success: '#008000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--success': 'hsl(120, 100%, 25%, 1)',
          '--success-divider': 'hsl(120, 100%, 25%, 1)',
          '--success-icon': 'hsl(120, 100%, 25%, 1)',
          '--success-surface': 'hsl(120, 100%, 88%, 1)',
          '--success-surface-subdued': 'hsl(120, 100%, 98%, 1)',
          '--success-text': 'hsl(120, 100%, 15%, 1)',
        }),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Colors({
          colors: {surface: '#000000', success: '#008000'},
        }),
      ).toStrictEqual(
        expect.objectContaining({
          '--success': 'hsl(120, 100%, 25%, 1)',
          '--success-divider': 'hsl(120, 100%, 35%, 1)',
          '--success-icon': 'hsl(120, 100%, 35%, 1)',
          '--success-surface': 'hsl(120, 100%, 12%, 1)',
          '--success-surface-subdued': 'hsl(120, 100%, 12%, 1)',
          '--success-text': 'hsl(120, 100%, 85%, 1)',
        }),
      );
    });
  });
});

describe('buildThemeContext', () => {
  it('reduces theme config down to a theme', () => {
    expect(buildThemeContext({colors: {}, logo: {}})).toStrictEqual({logo: {}});
  });
});
