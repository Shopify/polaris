import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  osColorSchemes,
  ColorScheme,
  ColorSchemes,
  Tokens,
  TokenGroup,
} from '../../../tokens';
import {
  CustomProperties,
  DEFAULT_COLOR_SCHEME,
  STYLE_SHEET_ID,
} from '../CustomProperties';
import {
  getColorSchemeDeclarations,
  getColorSchemeRules,
  getCustomProperties,
  getStaticCustomProperties,
} from '../styles';

interface ColorSchemeAttribute {
  'p-color-scheme': ColorScheme;
}

const mockTokenGroup: TokenGroup = {
  'design-token-1': 'valueA',
  'design-token-2': 'valueB',
};

const mockColorSchemes: ColorSchemes = {
  light: mockTokenGroup,
  dark: mockTokenGroup,
};

const mockTokens: Tokens = {
  colorSchemes: mockColorSchemes,
  motion: mockTokenGroup,
  // Note: We don't need to assign mock values to the remaining static tokens.
  depth: {},
  legacyTokens: {},
  shape: {},
  spacing: {},
  typography: {},
  zIndex: {},
};

const expectedCustomProperties =
  '--p-design-token-1:valueA;--p-design-token-2:valueB;';

const expectedColorSchemeDeclarations = (colorScheme: ColorScheme) =>
  `color-scheme:${osColorSchemes[colorScheme]};${expectedCustomProperties}`;

const expectedColorSchemeRules = (colorScheme: ColorScheme) =>
  `${expectedColorSchemeDeclarations(colorScheme)}${expectedCustomProperties}`;

describe('<CustomProperties />', () => {
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('renders its children', () => {
    const customProperties = mountWithApp(
      <CustomProperties>Hello world</CustomProperties>,
    );
    expect(customProperties.text()).toBe('Hello world');
  });

  it('forwards className prop', () => {
    const customProperties = mountWithApp(
      <CustomProperties className="forwarded" />,
    );

    expect(customProperties).toContainReactComponent('div', {
      className: 'forwarded',
    });
  });

  describe('as', () => {
    it('renders div tag by default', () => {
      const customProperties = mountWithApp(<CustomProperties />);

      expect(customProperties).toContainReactComponent('div');
    });

    it('renders section tag if provided', () => {
      const customProperties = mountWithApp(<CustomProperties as="section" />);

      expect(customProperties).toContainReactComponent('section');
    });
  });

  describe('color-scheme', () => {
    it('renders default color-scheme', () => {
      const customProperties = mountWithApp(<CustomProperties />);

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe(DEFAULT_COLOR_SCHEME);
    });

    it('renders light color-scheme', () => {
      const customProperties = mountWithApp(
        <CustomProperties colorScheme="light" />,
      );

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe('light');
    });

    it('renders dark color-scheme', () => {
      const customProperties = mountWithApp(
        <CustomProperties colorScheme="dark" />,
      );

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe('dark');
    });
  });

  describe('side effects', () => {
    it('injects styles in the head tag', () => {
      mountWithApp(<CustomProperties />);

      expect(document.head.innerHTML).toMatch(
        new RegExp(`<style id="${STYLE_SHEET_ID}">`),
      );
    });

    it('injects styles in the head tag one time', () => {
      mountWithApp(
        <CustomProperties>
          <CustomProperties>
            <CustomProperties />
          </CustomProperties>
        </CustomProperties>,
      );

      const styleSheets = document.head.innerHTML.match(
        new RegExp(`<style id="${STYLE_SHEET_ID}">`, 'g'),
      );

      expect(styleSheets).toHaveLength(1);
    });
  });

  describe('getCustomProperties', () => {
    it('creates a string of CSS custom properties', () => {
      const customProperties = getCustomProperties(mockTokenGroup);

      expect(customProperties).toBe(expectedCustomProperties);
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
              colorScheme as ColorScheme,
            )}}`,
        )
        .join('');

      expect(rules).toBe(expectedRules);
    });
  });

  describe('getStaticCustomProperties', () => {
    it('creates a string of static CSS custom properties', () => {
      const staticCustomProperties = getStaticCustomProperties(mockTokens);

      expect(staticCustomProperties).toBe(expectedCustomProperties);
    });
  });
});
