import React, {useContext} from 'react';
import {createMount} from 'test-utilities';

import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext, useTheme} from '../../../utilities/theme';
import {FeaturesContext} from '../../../utilities/features';
import {colorToHsla} from '../../../utilities/color-transformers';

const mountWithNewDesignLanguage = createMount<
  {newDesignLanguage?: boolean},
  {features: React.ContextType<typeof FeaturesContext>}
>({
  context({newDesignLanguage = false}) {
    return {features: {newDesignLanguage}};
  },
  render(element, context) {
    return (
      <FeaturesContext.Provider value={context.features}>
        {element}
      </FeaturesContext.Provider>
    );
  },
});

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mountWithNewDesignLanguage(
      <ThemeProvider theme={{logo: {}}}>
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

    const themeProvider = mountWithNewDesignLanguage(
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
    const themeProvider = mountWithNewDesignLanguage(
      <ThemeProvider theme={{}}>
        <p />
      </ThemeProvider>,
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--top-bar-background': '#00848e',
        '--top-bar-background-lighter': '#1d9ba4',
        '--top-bar-color': '#f9fafb',
      }),
    });
  });

  it('sets a provided theme', () => {
    const themeProvider = mountWithNewDesignLanguage(
      <ThemeProvider
        theme={{
          colors: {
            topBar: {
              background: '#108043',
            },
          },
        }}
      >
        <p />
      </ThemeProvider>,
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--top-bar-background': '#108043',
        '--top-bar-background-lighter': 'hsla(147, 63%, 43%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
        '--top-bar-border': 'rgb(196, 205, 213)',
      }),
    });
  });

  it('updates themes', () => {
    const themeProvider = mountWithNewDesignLanguage(
      <ThemeProvider
        theme={{
          colors: {
            topBar: {
              background: '#108043',
            },
          },
        }}
      >
        <p />
      </ThemeProvider>,
    );

    themeProvider.setProps({
      theme: {
        colors: {
          topBar: {
            background: '#021123',
          },
        },
      },
    });

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--top-bar-background': '#021123',
        '--top-bar-background-lighter': 'hsla(213, 74%, 22%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
        '--top-bar-border': 'rgb(196, 205, 213)',
      }),
    });
  });

  it('sets color system properties in context when newDesignLanguage is enabled', () => {
    mountWithNewDesignLanguage(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      {newDesignLanguage: true},
    );

    function Child() {
      const {cssCustomProperties} = useTheme();
      expect(cssCustomProperties).toBeTruthy();
      return null;
    }
  });

  it('does not set color system properties in context when newDesignLanguage is disabled', () => {
    mountWithNewDesignLanguage(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      {newDesignLanguage: false},
    );

    function Child() {
      const {cssCustomProperties} = useTheme();
      expect(cssCustomProperties).toBeUndefined();
      return null;
    }
  });

  it('sets defaults with newDesignLanguage enabled', () => {
    const themeProvider = mountWithNewDesignLanguage(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {newDesignLanguage: true},
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--p-override-zero': expect.any(String),
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
      const themeProvider = mountWithNewDesignLanguage(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {newDesignLanguage: true},
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

    it('renders custom properties if themes are identical but rendersOutsideOfAppFrame is true', () => {
      const themeProvider = mountWithNewDesignLanguage(
        <ThemeProvider theme={{colorScheme: 'dark'}}>
          <ThemeProvider theme={{colorScheme: 'dark'}} rendersOutsideOfAppFrame>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {newDesignLanguage: true},
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
      const themeProvider = mountWithNewDesignLanguage(
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
        {newDesignLanguage: true},
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
        const themeProvider = mountWithNewDesignLanguage(
          <ThemeProvider theme={topLevelTheme}>
            <ThemeProvider theme={childTheme}>
              <p>Hello</p>
            </ThemeProvider>
          </ThemeProvider>,
          {newDesignLanguage: true},
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
