import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext, useTheme} from '../../../utilities/theme';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{logo: {}}}>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC = (_props) => {
      return (
        <ThemeContext.Consumer>
          {(polarisTheme) => {
            return polarisTheme && polarisTheme.logo ? <div /> : null;
          }}
        </ThemeContext.Consumer>
      );
    };

    const wrapper = mountWithAppProvider(
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

    const div = wrapper.find(Child).find('div');

    expect(div.exists()).toBe(true);
  });

  it('has a default theme', () => {
    const wrapper = mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <p />
      </ThemeProvider>,
    );

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#00848e',
        '--top-bar-background-lighter': '#1d9ba4',
        '--top-bar-color': '#f9fafb',
      }),
    );
  });

  it('sets a provided theme', () => {
    const wrapper = mountWithAppProvider(
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

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#108043',
        '--top-bar-background-lighter': 'hsla(147, 63%, 43%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
      }),
    );
  });

  it('updates themes', () => {
    const wrapper = mountWithAppProvider(
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

    wrapper.setProps({
      theme: {
        colors: {
          topBar: {
            background: '#021123',
          },
        },
      },
    });
    wrapper.update();

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#021123',
        '--top-bar-background-lighter': 'hsla(213, 74%, 22%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
      }),
    );
  });

  it('sets color system properties when global theming is enabled', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{UNSTABLE_colors: {surface: '#ffffff'}}}>
        <p>Hello</p>
      </ThemeProvider>,
      {features: {unstableGlobalTheming: true}},
    );

    const styleKeys = Object.keys(
      themeProvider.find('div').props().style || {},
    );

    expect(styleKeys).toContain('--p-surface-background');
  });

  it('sets color system properties in context when global theming is enabled', () => {
    mountWithAppProvider(
      <ThemeProvider theme={{UNSTABLE_colors: {surface: '#ffffff'}}}>
        <Child />
      </ThemeProvider>,
      {features: {unstableGlobalTheming: true}},
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeTruthy();
      return null;
    }
  });

  it('does not set color system properties in context by default', () => {
    mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeUndefined();
      return null;
    }
  });

  // since we mount each `ThemeProvider` withApp, each mounted `ThemeProvider` is a nested one
  // we may need some sort of escape hatch to rendering a theme provider by default
  it.todo('does set overrides');

  describe('when nested', () => {
    it('does not set a default theme', () => {
      const themeProvider = mountWithAppProvider(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {features: {unstableGlobalTheming: true}},
      );

      expect(
        themeProvider
          .find('div')
          .last()
          .props().style,
      ).toStrictEqual({});
    });

    it('does not set overrides', () => {
      const themeProvider = mountWithAppProvider(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {features: {unstableGlobalTheming: true}},
      );

      const styleKeys = Object.keys(
        themeProvider
          .find('div')
          .last()
          .props().style || {},
      );

      expect(styleKeys).not.toContain('--p-override-zero');
    });
    it('adds css custom properties for color roles provided', () => {
      const themeProvider = mountWithAppProvider(
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
        {features: {unstableGlobalTheming: true}},
      );

      expect(
        themeProvider
          .find('div')
          .last()
          .props().style,
      ).toStrictEqual(
        expect.objectContaining({'--p-surface': 'hsla(0, 0%, 0%, 1)'}),
      );
    });

    it('inherits isLight from parent <ThemeProvider>', () => {
      const themeProvider = mountWithAppProvider(
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {surface: '#000000'},
          }}
        >
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {critical: '#FFFEEE'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {features: {unstableGlobalTheming: true}},
      );

      const {style} = themeProvider
        .find('div')
        .last()
        .props();
      expect(style).toStrictEqual(
        expect.objectContaining({
          '--p-critical-surface-subdued':
            'hsla(58, 100%, 7.000000000000001%, 1)',
        }),
      );
      expect(style).not.toStrictEqual(
        expect.objectContaining({
          '--p-critical-surface-subdued': 'hsla(57, 100%, 89%, 1)',
        }),
      );
    });

    it('overrides isLight from parent <ThemeProvider> when provided a surface value', () => {
      const themeProvider = mountWithAppProvider(
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {surface: '#000000'},
          }}
        >
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {surface: '#FFFFFF', critical: '#FFFEEE'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {features: {unstableGlobalTheming: true}},
      );

      const {style} = themeProvider
        .find('div')
        .last()
        .props();
      expect(style).toStrictEqual(
        expect.objectContaining({
          '--p-critical-surface-subdued': 'hsla(57, 100%, 89%, 1)',
        }),
      );
      expect(style).not.toStrictEqual(
        expect.objectContaining({
          '--p-critical-surface-subdued':
            'hsla(58, 100%, 7.000000000000001%, 1)',
        }),
      );
    });
  });
});
