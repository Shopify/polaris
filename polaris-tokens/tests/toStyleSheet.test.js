import {osColorSchemes} from '../src/tokens';
import {
  getColorSchemeDeclarations,
  getColorSchemeRules,
  getCustomProperties,
  getKeyframes,
  getStaticCustomProperties,
} from '../scripts/toStyleSheet';

const mockTokenGroup = {
  'design-token-1': {
    value: 'valueA',
  },
  'design-token-2': {
    value: 'valueB',
  },
};

const mockMotionTokenGroup = {
  ...mockTokenGroup,
  'keyframes-token-1': {
    value: 'valueA',
  },
  'keyframes-token-2': {
    value: 'valueB',
  },
};

const mockColorSchemes = {
  light: mockTokenGroup,
  dark: mockTokenGroup,
};

const mockTokens = {
  colorSchemes: mockColorSchemes,
  depth: mockTokenGroup,
  // Note: We don't need to assign mock values to the remaining static tokens.
  motion: {},
  legacyTokens: {},
  shape: {},
  spacing: {},
  typography: {},
  zIndex: {},
};

const expectedCustomProperties =
  '--p-design-token-1:valueA;--p-design-token-2:valueB;';

const expectedColorSchemeDeclarations = (colorScheme) =>
  `color-scheme:${osColorSchemes[colorScheme]};${expectedCustomProperties}`;

const expectedColorSchemeRules = (colorScheme) =>
  `${expectedColorSchemeDeclarations(colorScheme)}${expectedCustomProperties}`;

const expectedKeyframes =
  '@keyframes p-keyframes-token-1valueA@keyframes p-keyframes-token-2valueB';

const expectedKeyframesCustomProperties =
  '--p-keyframes-token-1:p-keyframes-token-1;--p-keyframes-token-2:p-keyframes-token-2;';

describe('getCustomProperties', () => {
  it('creates a string of CSS custom properties', () => {
    const customProperties = getCustomProperties(mockTokenGroup);

    expect(customProperties).toBe(expectedCustomProperties);
  });

  it('creates a string of CSS custom properties and keyframes at-rules from motion tokens', () => {
    const customProperties = getCustomProperties(mockMotionTokenGroup);

    expect(customProperties).toBe(
      `${expectedCustomProperties}${expectedKeyframesCustomProperties}`,
    );
  });
});

describe('getColorSchemeDeclarations', () => {
  it('creates a string of CSS declarations for a given color-scheme', () => {
    const declarations = getColorSchemeDeclarations(
      'dark',
      mockTokens,
      osColorSchemes,
    );

    expect(declarations).toBe(expectedColorSchemeDeclarations('dark'));
  });
});

describe('getColorSchemeRules', () => {
  it('creates a string of CSS rules for each color-scheme', () => {
    const rules = getColorSchemeRules(mockTokens, osColorSchemes);

    const expectedRules = Object.keys(mockColorSchemes)
      .map(
        (colorScheme) =>
          `[p-color-scheme="${colorScheme}"]{${expectedColorSchemeRules(
            colorScheme,
          )}}`,
      )
      .join('');

    expect(rules).toBe(expectedRules);
  });
});

describe('getKeyframes', () => {
  it('creates a string of keyframes at-rules', () => {
    const keyframes = getKeyframes(mockMotionTokenGroup);

    expect(keyframes).toBe(expectedKeyframes);
  });
});

describe('getStaticCustomProperties', () => {
  it('creates a string of static CSS custom properties', () => {
    const staticCustomProperties = getStaticCustomProperties(mockTokens);

    expect(staticCustomProperties).toBe(expectedCustomProperties);
  });
});
