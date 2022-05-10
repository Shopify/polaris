import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  osColorSchemes,
  ColorScheme,
  ColorSchemes,
  Tokens,
  TokenGroup,
} from '../../../tokens';
import {CustomProperties, DEFAULT_COLOR_SCHEME} from '../CustomProperties';
import {
  getColorSchemeDeclarations,
  getColorSchemeRules,
  getCustomProperties,
  getKeyframes,
  getStaticCustomProperties,
} from '../styles';

interface ColorSchemeAttribute {
  'p-color-scheme': ColorScheme;
}

const mockTokenGroup: TokenGroup = {
  'design-token-1': 'valueA',
  'design-token-2': 'valueB',
};

const mockMotionTokenGroup: TokenGroup = {
  ...mockTokenGroup,
  'keyframes-token-1': 'valueA',
  'keyframes-token-2': 'valueB',
};

const mockColorSchemes: ColorSchemes = {
  light: mockTokenGroup,
  dark: mockTokenGroup,
};

const mockTokens: Tokens = {
  colorSchemes: mockColorSchemes,
  depth: mockTokenGroup,
  // Note: We don't need to assign mock values to the remaining static tokens.
  breakpoints: {},
  motion: {},
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

const expectedKeyframes =
  '@keyframes p-keyframes-token-1valueA@keyframes p-keyframes-token-2valueB';

const expectedKeyframesCustomProperties =
  '--p-keyframes-token-1:p-keyframes-token-1;--p-keyframes-token-2:p-keyframes-token-2;';

describe('<CustomProperties />', () => {
  it('renders its children', () => {
    const customProperties = mountWithApp(
      <CustomProperties>Hello world</CustomProperties>,
    );

    expect(customProperties.find('div')!.text()).toBe('Hello world');
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

  describe('style tag', () => {
    it('inlines a style tag above the root container', () => {
      const customProperties = mountWithApp(<CustomProperties />);

      const styleProps: any = {
        'data-polaris-custom-properties': '',
      };

      const styleTag = customProperties.find('style', styleProps)!;

      expect(styleTag.domNode?.nextSibling?.nodeName).toBe('DIV');
    });

    // Skipping until we can figure out how to optimally apply the style tag once.
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('inlines a style tag one time', () => {
      const customProperties = mountWithApp(
        <CustomProperties>
          <CustomProperties>
            <CustomProperties />
          </CustomProperties>
        </CustomProperties>,
      );

      const styleSheets = customProperties
        .html()
        .match(new RegExp(`<style data-polaris-custom-properties`, 'g'));

      expect(styleSheets).toHaveLength(1);
    });
  });

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
              colorScheme as ColorScheme,
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
});
