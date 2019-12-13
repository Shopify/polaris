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
        '--p-surface-background': expect.any(String),
        '--p-text-on-surface': expect.any(String),
        '--p-interactive-action': expect.any(String),
        '--p-neutral-action': expect.any(String),
        '--p-primary-action': expect.any(String),
        '--p-critical-action': expect.any(String),
        '--p-warning-surface': expect.any(String),
        '--p-highlight-surface': expect.any(String),
        '--p-success-surface': expect.any(String),
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

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: {color: expect.any(String)},
      });
    });

    it('does not set overrides', () => {
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
          '--p-override-zero': expect.any(String),
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
          '--p-surface': 'hsla(0, 0%, 0%, 1)',
        }),
      });
    });

    it('inherits colorScheme from parent <ThemeProvider>', () => {
      const themeProvider = mountWithGlobalTheming(
        <ThemeProvider theme={{colorScheme: 'dark'}}>
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {critical: '#FFFEEE'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
      );

      const element = themeProvider.findAll('div')[1];
      expect(element).toHaveReactProps({
        style: expect.objectContaining({
          '--p-critical-surface-subdued':
            'hsla(58, 100%, 7.000000000000001%, 1)',
        }),
      });
      expect(element).not.toHaveReactProps({
        style: expect.objectContaining({
          '--p-critical-surface-subdued': 'hsla(57, 100%, 89%, 1)',
        }),
      });
    });

    it('overrides colorScheme from parent <ThemeProvider> when provided a colorScheme', () => {
      const themeProvider = mountWithGlobalTheming(
        <ThemeProvider theme={{colorScheme: 'dark'}}>
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {critical: '#FFFEEE'},
              colorScheme: 'light',
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
      );

      const element = themeProvider.findAll('div')[1];
      expect(element).toHaveReactProps({
        style: expect.objectContaining({
          '--p-critical-surface-subdued': 'hsla(57, 100%, 89%, 1)',
        }),
      });
      expect(element).not.toHaveReactProps({
        style: expect.objectContaining({
          '--p-critical-surface-subdued':
            'hsla(58, 100%, 7.000000000000001%, 1)',
        }),
      });
    });

    it('inherits colors from parent <ThemeProvider> when their colorSchemes differ', () => {
      const themeProvider = mountWithGlobalTheming(
        <ThemeProvider theme={{colorScheme: 'dark'}}>
          <ThemeProvider theme={{colorScheme: 'light'}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
      );

      expect(themeProvider.findAll('div')[1]).toHaveReactProps({
        style: expect.objectContaining({
          '--p-surface-background': expect.any(String),
        }),
      });
    });
  });

  it('overrides inherited colors from parent <ThemeProvider> with provided colors when their colorSchemes differ', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
          colorScheme: 'dark',
        }}
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
            colorScheme: 'light',
          }}
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const element = themeProvider.findAll('div')[1];
    expect(element).toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    });
    expect(element).not.toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(0, 0%, 98%, 1)',
      }),
    });
  });

  it('inverts the parent colorScheme from dark to light when given an inverse colorScheme', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
          colorScheme: 'dark',
        }}
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
            colorScheme: 'inverse',
          }}
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const element = themeProvider.findAll('div')[1];
    expect(element).toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    });
    expect(element).not.toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(0, 0%, 98%, 1)',
      }),
    });
  });

  it('inverts the parent colorScheme from light to dark when given an inverse colorScheme', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
          colorScheme: 'light',
        }}
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
            colorScheme: 'inverse',
          }}
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const element = themeProvider.findAll('div')[1];
    expect(element).toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(58, 100%, 7.000000000000001%, 1)',
      }),
    });
    expect(element).not.toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    });
  });

  it('sets the color scheme to light when the child color scheme is inverse and the parent has none', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
        }}
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
            colorScheme: 'inverse',
          }}
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const element = themeProvider.findAll('div')[1];
    expect(element).toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(58, 100%, 7.000000000000001%, 1)',
      }),
    });
    expect(element).not.toHaveReactProps({
      style: expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    });
  });
});
