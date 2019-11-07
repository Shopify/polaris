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

    const colors = Object.keys(buildCustomProperties(theme, true));
    expect(colors).toStrictEqual(
      expect.arrayContaining([
        '--p-surface',
        '--p-surface-background',
        '--p-surface-foreground',
        '--p-surface-foreground-subdued',
        '--p-surface-hovered',
        '--p-surface-pressed',
        '--p-surface-background',
        '--p-surface-inverse-background',
        '--p-surface-dark-background',
        '--p-surface-light-background',
        '--p-surface-foreground',
        '--p-surface-inverse-foreground',
        '--p-surface-dark-foreground',
        '--p-surface-light-foreground',
        '--p-surface-foreground-subdued',
        '--p-surface-inverse-foreground-subdued',
        '--p-surface-dark-foreground-subdued',
        '--p-surface-light-foreground-subdued',
        '--p-surface-hovered',
        '--p-surface-inverse-hovered',
        '--p-surface-dark-hovered',
        '--p-surface-light-hovered',
        '--p-surface-pressed',
        '--p-surface-inverse-pressed',
        '--p-surface-dark-pressed',
        '--p-surface-light-pressed',
      ]),
    );
    expect(colors).not.toStrictEqual(
      expect.objectContaining(legacyCustomProperties),
    );
  });
});

describe('buildColors', () => {
  describe('surface', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-surface',
          '--p-surface-background',
          '--p-surface-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-pressed',
          '--p-surface-background',
          '--p-surface-inverse-background',
          '--p-surface-dark-background',
          '--p-surface-light-background',
          '--p-surface-foreground',
          '--p-surface-inverse-foreground',
          '--p-surface-dark-foreground',
          '--p-surface-light-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-inverse-foreground-subdued',
          '--p-surface-dark-foreground-subdued',
          '--p-surface-light-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-inverse-hovered',
          '--p-surface-dark-hovered',
          '--p-surface-light-hovered',
          '--p-surface-pressed',
          '--p-surface-inverse-pressed',
          '--p-surface-dark-pressed',
          '--p-surface-light-pressed',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(buildColors({UNSTABLE_colors: {surface: '#ffffff'}})),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-surface',
          '--p-surface-background',
          '--p-surface-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-pressed',
          '--p-surface-background',
          '--p-surface-inverse-background',
          '--p-surface-dark-background',
          '--p-surface-light-background',
          '--p-surface-foreground',
          '--p-surface-inverse-foreground',
          '--p-surface-dark-foreground',
          '--p-surface-light-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-inverse-foreground-subdued',
          '--p-surface-dark-foreground-subdued',
          '--p-surface-light-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-inverse-hovered',
          '--p-surface-dark-hovered',
          '--p-surface-light-hovered',
          '--p-surface-pressed',
          '--p-surface-inverse-pressed',
          '--p-surface-dark-pressed',
          '--p-surface-light-pressed',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(buildColors({UNSTABLE_colors: {surface: '#000000'}})),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-surface',
          '--p-surface-background',
          '--p-surface-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-pressed',
          '--p-surface-background',
          '--p-surface-inverse-background',
          '--p-surface-dark-background',
          '--p-surface-light-background',
          '--p-surface-foreground',
          '--p-surface-inverse-foreground',
          '--p-surface-dark-foreground',
          '--p-surface-light-foreground',
          '--p-surface-foreground-subdued',
          '--p-surface-inverse-foreground-subdued',
          '--p-surface-dark-foreground-subdued',
          '--p-surface-light-foreground-subdued',
          '--p-surface-hovered',
          '--p-surface-inverse-hovered',
          '--p-surface-dark-hovered',
          '--p-surface-light-hovered',
          '--p-surface-pressed',
          '--p-surface-inverse-pressed',
          '--p-surface-dark-pressed',
          '--p-surface-light-pressed',
        ]),
      );
    });
  });

  describe('onSurface', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-divider-disabled-on-dark',
          '--p-divider-disabled-on-inverse',
          '--p-divider-disabled-on-light',
          '--p-divider-disabled-on-surface',
          '--p-divider-on-dark',
          '--p-divider-on-inverse',
          '--p-divider-on-light',
          '--p-divider-on-surface',
          '--p-divider-subdued-on-dark',
          '--p-divider-subdued-on-inverse',
          '--p-divider-subdued-on-light',
          '--p-divider-subdued-on-surface',
          '--p-icon-disabled-on-dark',
          '--p-icon-disabled-on-inverse',
          '--p-icon-disabled-on-light',
          '--p-icon-disabled-on-surface',
          '--p-icon-on-branded',
          '--p-icon-on-dark',
          '--p-icon-on-inverse',
          '--p-icon-on-light',
          '--p-icon-on-surface',
          '--p-icon-subdued-on-branded',
          '--p-icon-subdued-on-dark',
          '--p-icon-subdued-on-inverse',
          '--p-icon-subdued-on-light',
          '--p-icon-subdued-on-surface',
          '--p-on-surface',
          '--p-text-disabled-on-dark',
          '--p-text-disabled-on-inverse',
          '--p-text-disabled-on-light',
          '--p-text-disabled-on-surface',
          '--p-text-on-branded',
          '--p-text-on-dark',
          '--p-text-on-inverse',
          '--p-text-on-light',
          '--p-text-on-surface',
          '--p-text-subdued-on-branded',
          '--p-text-subdued-on-dark',
          '--p-text-subdued-on-inverse',
          '--p-text-subdued-on-light',
          '--p-text-subdued-on-surface',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', onSurface: '#000000'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-divider-disabled-on-dark',
          '--p-divider-disabled-on-inverse',
          '--p-divider-disabled-on-light',
          '--p-divider-disabled-on-surface',
          '--p-divider-on-dark',
          '--p-divider-on-inverse',
          '--p-divider-on-light',
          '--p-divider-on-surface',
          '--p-divider-subdued-on-dark',
          '--p-divider-subdued-on-inverse',
          '--p-divider-subdued-on-light',
          '--p-divider-subdued-on-surface',
          '--p-icon-disabled-on-dark',
          '--p-icon-disabled-on-inverse',
          '--p-icon-disabled-on-light',
          '--p-icon-disabled-on-surface',
          '--p-icon-on-branded',
          '--p-icon-on-dark',
          '--p-icon-on-inverse',
          '--p-icon-on-light',
          '--p-icon-on-surface',
          '--p-icon-subdued-on-branded',
          '--p-icon-subdued-on-dark',
          '--p-icon-subdued-on-inverse',
          '--p-icon-subdued-on-light',
          '--p-icon-subdued-on-surface',
          '--p-on-surface',
          '--p-text-disabled-on-dark',
          '--p-text-disabled-on-inverse',
          '--p-text-disabled-on-light',
          '--p-text-disabled-on-surface',
          '--p-text-on-branded',
          '--p-text-on-dark',
          '--p-text-on-inverse',
          '--p-text-on-light',
          '--p-text-on-surface',
          '--p-text-subdued-on-branded',
          '--p-text-subdued-on-dark',
          '--p-text-subdued-on-inverse',
          '--p-text-subdued-on-light',
          '--p-text-subdued-on-surface',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', onSurface: '#ffffff'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-divider-disabled-on-dark',
          '--p-divider-disabled-on-inverse',
          '--p-divider-disabled-on-light',
          '--p-divider-disabled-on-surface',
          '--p-divider-on-dark',
          '--p-divider-on-inverse',
          '--p-divider-on-light',
          '--p-divider-on-surface',
          '--p-divider-subdued-on-dark',
          '--p-divider-subdued-on-inverse',
          '--p-divider-subdued-on-light',
          '--p-divider-subdued-on-surface',
          '--p-icon-disabled-on-dark',
          '--p-icon-disabled-on-inverse',
          '--p-icon-disabled-on-light',
          '--p-icon-disabled-on-surface',
          '--p-icon-on-branded',
          '--p-icon-on-dark',
          '--p-icon-on-inverse',
          '--p-icon-on-light',
          '--p-icon-on-surface',
          '--p-icon-subdued-on-branded',
          '--p-icon-subdued-on-dark',
          '--p-icon-subdued-on-inverse',
          '--p-icon-subdued-on-light',
          '--p-icon-subdued-on-surface',
          '--p-on-surface',
          '--p-text-disabled-on-dark',
          '--p-text-disabled-on-inverse',
          '--p-text-disabled-on-light',
          '--p-text-disabled-on-surface',
          '--p-text-on-branded',
          '--p-text-on-dark',
          '--p-text-on-inverse',
          '--p-text-on-light',
          '--p-text-on-surface',
          '--p-text-subdued-on-branded',
          '--p-text-subdued-on-dark',
          '--p-text-subdued-on-inverse',
          '--p-text-subdued-on-light',
          '--p-text-subdued-on-surface',
        ]),
      );
    });
  });

  describe('interactive', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-interactive',
          '--p-interactive-action',
          '--p-interactive-action-disabled',
          '--p-interactive-action-hovered',
          '--p-interactive-action-pressed',
          '--p-interactive-action-subdued',
          '--p-interactive-focus',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', interactive: '#0000FF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-interactive',
          '--p-interactive-action',
          '--p-interactive-action-disabled',
          '--p-interactive-action-hovered',
          '--p-interactive-action-pressed',
          '--p-interactive-action-subdued',
          '--p-interactive-focus',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', interactive: '#0000FF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-interactive',
          '--p-interactive-action',
          '--p-interactive-action-disabled',
          '--p-interactive-action-hovered',
          '--p-interactive-action-pressed',
          '--p-interactive-action-subdued',
          '--p-interactive-focus',
        ]),
      );
    });
  });

  describe('neutral', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-neutral',
          '--p-neutral-action-disabled',
          '--p-neutral-action',
          '--p-neutral-action-hovered',
          '--p-neutral-action-pressed',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', neutral: '#778899'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-neutral',

          '--p-neutral-action-disabled',
          '--p-neutral-action',
          '--p-neutral-action-hovered',
          '--p-neutral-action-pressed',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', neutral: '#778899'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-neutral',
          '--p-neutral-action-disabled',
          '--p-neutral-action',
          '--p-neutral-action-hovered',
          '--p-neutral-action-pressed',
        ]),
      );
    });
  });

  describe('branded', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-branded',
          '--p-branded-action',
          '--p-branded-action-disabled',
          '--p-branded-action-hovered',
          '--p-branded-action-pressed',
          '--p-branded-selected',
          '--p-branded-selected-hovered',
          '--p-branded-selected-pressed',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', branded: '#FF00FF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-branded',
          '--p-branded-action',
          '--p-branded-action-disabled',
          '--p-branded-action-hovered',
          '--p-branded-action-pressed',
          '--p-branded-selected',
          '--p-branded-selected-hovered',
          '--p-branded-selected-pressed',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', branded: '#FF00FF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-branded',
          '--p-branded-action',
          '--p-branded-action-disabled',
          '--p-branded-action-hovered',
          '--p-branded-action-pressed',
          '--p-branded-selected',
          '--p-branded-selected-hovered',
          '--p-branded-selected-pressed',
        ]),
      );
    });
  });

  describe('critical', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-critical',
          '--p-critical-action',
          '--p-critical-action-disabled',
          '--p-critical-action-hovered',
          '--p-critical-action-pressed',
          '--p-critical-divider',
          '--p-critical-divider-disabled',
          '--p-critical-icon',
          '--p-critical-link',
          '--p-critical-link-disabled',
          '--p-critical-link-hovered',
          '--p-critical-link-pressed',
          '--p-critical-surface',
          '--p-critical-surface-subdued',
          '--p-critical-surface-subdued-hovered',
          '--p-critical-surface-subdued-pressed',
          '--p-critical-text',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', critical: '#DC143C'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-critical',
          '--p-critical-action',
          '--p-critical-action-disabled',
          '--p-critical-action-hovered',
          '--p-critical-action-pressed',
          '--p-critical-divider',
          '--p-critical-divider-disabled',
          '--p-critical-icon',
          '--p-critical-link',
          '--p-critical-link-disabled',
          '--p-critical-link-hovered',
          '--p-critical-link-pressed',
          '--p-critical-surface',
          '--p-critical-surface-subdued',
          '--p-critical-surface-subdued-hovered',
          '--p-critical-surface-subdued-pressed',
          '--p-critical-text',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', critical: '#DC143C'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-critical',
          '--p-critical-action',
          '--p-critical-action-disabled',
          '--p-critical-action-hovered',
          '--p-critical-action-pressed',
          '--p-critical-divider',
          '--p-critical-divider-disabled',
          '--p-critical-icon',
          '--p-critical-link',
          '--p-critical-link-disabled',
          '--p-critical-link-hovered',
          '--p-critical-link-pressed',
          '--p-critical-surface',
          '--p-critical-surface-subdued',
          '--p-critical-surface-subdued-hovered',
          '--p-critical-surface-subdued-pressed',
          '--p-critical-text',
        ]),
      );
    });
  });

  describe('warning', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-warning',
          '--p-warning-divider',
          '--p-warning-icon',
          '--p-warning-surface',
          '--p-warning-surface-subdued',
          '--p-warning-text',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', warning: '#FF8C00'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-warning',
          '--p-warning-divider',
          '--p-warning-icon',
          '--p-warning-surface',
          '--p-warning-surface-subdued',
          '--p-warning-text',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', warning: '#FF8C00'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-warning',
          '--p-warning-divider',
          '--p-warning-icon',
          '--p-warning-surface',
          '--p-warning-surface-subdued',
          '--p-warning-text',
        ]),
      );
    });
  });

  describe('highlight', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-highlight',
          '--p-highlight-divider',
          '--p-highlight-icon',
          '--p-highlight-surface',
          '--p-highlight-surface-subdued',
          '--p-highlight-text',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', highlight: '#00FFFF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-highlight',
          '--p-highlight-divider',
          '--p-highlight-icon',
          '--p-highlight-surface',
          '--p-highlight-surface-subdued',
          '--p-highlight-text',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', highlight: '#00FFFF'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-highlight',
          '--p-highlight-divider',
          '--p-highlight-icon',
          '--p-highlight-surface',
          '--p-highlight-surface-subdued',
          '--p-highlight-text',
        ]),
      );
    });
  });

  describe('success', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-success',
          '--p-success-divider',
          '--p-success-icon',
          '--p-success-surface',
          '--p-success-surface-subdued',
          '--p-success-text',
        ]),
      );
    });

    it('creates variants when given a light surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#ffffff', success: '#008000'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-success',
          '--p-success-divider',
          '--p-success-icon',
          '--p-success-surface',
          '--p-success-surface-subdued',
          '--p-success-text',
        ]),
      );
    });

    it('creates variants when given a dark surface', () => {
      expect(
        Object.keys(
          buildColors({
            UNSTABLE_colors: {surface: '#000000', success: '#008000'},
          }),
        ),
      ).toStrictEqual(
        expect.arrayContaining([
          '--p-success',
          '--p-success-divider',
          '--p-success-icon',
          '--p-success-surface',
          '--p-success-surface-subdued',
          '--p-success-text',
        ]),
      );
    });
  });

  describe('translucent colors', () => {
    it('has a default value', () => {
      expect(Object.keys(buildColors({UNSTABLE_colors: {}}))).toStrictEqual(
        expect.arrayContaining([
          '--p-backdrop',
          '--p-shadow-from-direct-light',
          '--p-shadow-from-ambient-light',
        ]),
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
