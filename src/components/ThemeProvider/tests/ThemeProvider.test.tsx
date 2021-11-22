import React, {useContext} from 'react';
import {mount} from 'tests/utilities';

import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext} from '../../../utilities/theme';
import {colorToHsla} from '../../../utilities/color-transformers';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mount(
      <ThemeProvider>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider).not.toBeNull();
  });

  it('passes context', () => {
    const Child: React.SFC = () => {
      const polarisTheme = useContext(ThemeContext);
      // eslint-disable-next-line jest/no-if
      return polarisTheme && polarisTheme.logo ? <div /> : null;
    };

    const themeProvider = mount(
      <ThemeProvider
        theme={{
          logo: {
            width: 104,
            topBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-white.svg',
            contextualSaveBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-black.svg',
          },
        }}
      >
        <Child />
      </ThemeProvider>,
    );

    expect(themeProvider.find(Child)).toContainReactComponent('div');
  });

  it('has a default theme', () => {
    const themeProvider = mount(
      <ThemeProvider>
        <p>Hello</p>
      </ThemeProvider>,
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--p-background': expect.any(String),
        '--p-text': expect.any(String),
        '--p-interactive': expect.any(String),
        '--p-action-secondary': expect.any(String),
        '--p-action-primary': expect.any(String),
        '--p-action-critical': expect.any(String),
        '--p-surface-warning': expect.any(String),
        '--p-surface-highlight': expect.any(String),
        '--p-surface-success': expect.any(String),
        '--p-decorative-one-text': expect.any(String),
      }),
    });
  });

  describe('when nested', () => {
    it('does not render custom properties if themes are identical', () => {
      const themeProvider = mount(
        <ThemeProvider>
          <ThemeProvider>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
      );

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: expect.not.objectContaining({
          '--p-background': expect.any(String),
          '--p-text': expect.any(String),
          '--p-interactive': expect.any(String),
          '--p-action-secondary': expect.any(String),
          '--p-action-primary': expect.any(String),
          '--p-action-critical': expect.any(String),
          '--p-surface-warning': expect.any(String),
          '--p-surface-highlight': expect.any(String),
          '--p-surface-success': expect.any(String),
          '--p-decorative-one-text': expect.any(String),
        }),
      });
    });

    it('renders custom properties if themes are identical but alwaysRenderCustomProperties is true', () => {
      const themeProvider = mount(
        <ThemeProvider theme={{colorScheme: 'dark'}}>
          <ThemeProvider
            theme={{colorScheme: 'dark'}}
            alwaysRenderCustomProperties
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
      );

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: expect.objectContaining({
          '--p-background': expect.any(String),
          '--p-text': expect.any(String),
          '--p-interactive': expect.any(String),
          '--p-action-secondary': expect.any(String),
          '--p-action-primary': expect.any(String),
          '--p-action-critical': expect.any(String),
          '--p-surface-warning': expect.any(String),
          '--p-surface-highlight': expect.any(String),
          '--p-surface-success': expect.any(String),
          '--p-decorative-one-text': expect.any(String),
        }),
      });
    });

    it('adds css custom properties for color roles provided', () => {
      const themeProvider = mount(
        <ThemeProvider
          theme={{
            colors: {surface: '#FFFFFF'},
          }}
        >
          <ThemeProvider
            theme={{
              colors: {surface: '#000000'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
      );

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: expect.not.objectContaining({
          '--p-surface': 'rgba(255, 255, 255, 1)',
        }),
      });
    });

    it.each([
      [
        'Dark parent, undefined child, child has colors',
        {colorScheme: 'dark'},
        {colors: {critical: '#FFFEEE'}},
        true,
      ],
      [
        'Light parent, undefined child, child has colors',
        {colorScheme: 'light'},
        {colors: {critical: '#FFFEEE'}},
        false,
      ],
      [
        'Dark parent, light child, child has colors',
        {colorScheme: 'dark'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'light'},
        false,
      ],
      [
        'Light parent, dark child, child has colors',
        {colorScheme: 'light'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'dark'},
        true,
      ],
      [
        'Dark parent, undefined child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'dark'},
        {colors: {critical: '#FFFEEE'}},
        true,
      ],
      [
        'Light parent, undefined child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'light'},
        {colors: {critical: '#FFFEEE'}},
        false,
      ],
      [
        'Dark parent, light child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'dark'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'light'},
        false,
      ],
      [
        'Light parent, dark child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'light'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'dark'},
        true,
      ],
      [
        'Dark parent, inverse child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'dark'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        false,
      ],
      [
        'Light parent, inverse child, both have colors',
        {colors: {critical: '#000000'}, colorScheme: 'light'},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        true,
      ],
      [
        'Undefined parent, inverse child, both have colors',
        {colors: {critical: '#000000'}},
        {colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        true,
      ],
      [
        'Dark parent, light child with no colors',
        {colorScheme: 'dark'},
        {colorScheme: 'light'},
        false,
      ],
      [
        'Light parent, dark child with no colors',
        {colorScheme: 'light'},
        {colorScheme: 'dark'},
        true,
      ],
    ])(
      'Inherits color scheme from parent where: %s',
      (_: any, topLevelTheme: any, childTheme: any, expectedIsDark: any) => {
        const themeProvider = mount(
          <ThemeProvider theme={topLevelTheme}>
            <ThemeProvider theme={childTheme}>
              <p>Hello</p>
            </ThemeProvider>
          </ThemeProvider>,
        );

        const div = themeProvider.findAll('div')[1];

        expect(div).toHaveReactProps({
          style: expect.objectContaining({
            '--p-surface-critical-subdued': expect.any(String),
          }),
        });

        expect(
          isDark(
            (div.props.style as {[key: string]: string})[
              '--p-surface-critical-subdued'
            ],
          ),
        ).toBe(expectedIsDark);
      },
    );
  });
});

function isDark(color: string) {
  const {lightness} = colorToHsla(color);
  return Boolean(lightness < 50);
}
