import React from 'react';
import {createMount} from 'test-utilities';
import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext, useTheme} from '../../../utilities/theme';
import {FeaturesContext} from '../../../utilities/features';

const mountWithGlobalTheming = createMount<
  {globalTheming?: boolean},
  {features: React.ContextType<typeof FeaturesContext>}
>({
  context({globalTheming = false}) {
    return {features: {unstableGlobalTheming: globalTheming}};
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
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider theme={{logo: {}}}>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider).not.toBeNull();
  });

  it('passes context', () => {
    const Child: React.SFC = () => {
      const polarisTheme = React.useContext(ThemeContext);
      return polarisTheme && polarisTheme.logo ? <div /> : null;
    };

    const themeProvider = mountWithGlobalTheming(
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
    const themeProvider = mountWithGlobalTheming(
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
    const themeProvider = mountWithGlobalTheming(
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
      }),
    });
  });

  it('updates themes', () => {
    const themeProvider = mountWithGlobalTheming(
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
      }),
    });
  });

  it('sets color system properties in context when global theming is enabled', () => {
    mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      {globalTheming: true},
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeTruthy();
      return null;
    }
  });

  it('does not set color system properties in context when global theming is disabled', () => {
    mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      {globalTheming: false},
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeUndefined();
      return null;
    }
  });

  it('sets defaults with global theming enabled', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--p-override-zero': expect.any(String),
        '--p-background': expect.any(String),
        '--p-text': expect.any(String),
        '--p-action-interactive': expect.any(String),
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
    it('does not set a default theme', () => {
      const themeProvider = mountWithGlobalTheming(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
      );

      expect(themeProvider.findAll('div')[1]).not.toHaveReactProps({
        style: expect.objectContaining({
          '--p-background': expect.any(String),
          '--p-text': expect.any(String),
          '--p-action-interactive': expect.any(String),
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
      const themeProvider = mountWithGlobalTheming(
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {surface: '#FFFFFF'},
          }}
        >
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {surface: '#000000'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
      );

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: expect.objectContaining({
          '--p-surface': 'rgba(255, 255, 255, 1)',
        }),
      });
    });

    it.each([
      [
        'Dark parent, undefined child, child has colors',
        {colorScheme: 'dark'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Light parent, undefined child, child has colors',
        {colorScheme: 'light'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}},
        'rgba(255, 252, 198, 1)',
      ],
      [
        'Dark parent, light child, child has colors',
        {colorScheme: 'dark'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'light'},
        'rgba(255, 252, 198, 1)',
      ],
      [
        'Light parent, dark child, child has colors',
        {colorScheme: 'light'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'dark'},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Dark parent, undefined child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'dark'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Light parent, undefined child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'light'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}},
        'rgba(255, 252, 198, 1)',
      ],
      [
        'Dark parent, light child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'dark'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'light'},
        'rgba(255, 252, 198, 1)',
      ],
      [
        'Light parent, dark child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'light'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'dark'},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Dark parent, inverse child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'dark'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        'rgba(255, 252, 198, 1)',
      ],
      [
        'Light parent, inverse child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}, colorScheme: 'light'},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Undefined parent, inverse child, both have colors',
        {UNSTABLE_colors: {critical: '#000000'}},
        {UNSTABLE_colors: {critical: '#FFFEEE'}, colorScheme: 'inverse'},
        'rgba(34, 33, 0, 1)',
      ],
      [
        'Dark parent, light child with no colors',
        {colorScheme: 'dark'},
        {colorScheme: 'light'},
        expect.any(String),
      ],
      [
        'Light parent, dark child with no colors',
        {colorScheme: 'light'},
        {colorScheme: 'dark'},
        expect.any(String),
      ],
    ])(
      'Inherits color scheme from parent where: %s',
      (
        _: any,
        topLevelTheme: any,
        childTheme: any,
        expectedCritialSurfaceSubdued: any,
      ) => {
        const themeProvider = mountWithGlobalTheming(
          <ThemeProvider theme={topLevelTheme}>
            <ThemeProvider theme={childTheme}>
              <p>Hello</p>
            </ThemeProvider>
          </ThemeProvider>,
          {globalTheming: true},
        );

        expect(themeProvider.findAll('div')[1]).toHaveReactProps({
          style: expect.objectContaining({
            '--p-surface-critical-subdued': expectedCritialSurfaceSubdued,
          }),
        });
      },
    );
  });
});
