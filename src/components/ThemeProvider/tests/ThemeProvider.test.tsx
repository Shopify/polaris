import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mount} from 'test-utilities';
import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext, useTheme} from '../../../utilities/theme';
import {FeaturesContext} from '../../../utilities/features';

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
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{UNSTABLE_colors: {surface: '#ffffff'}}}>
        <p>Hello</p>
      </ThemeProvider>,
      true,
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-surface-background');
  });

  it('sets color system properties in context when global theming is enabled', () => {
    mountWithGlobalTheming(
      <ThemeProvider theme={{UNSTABLE_colors: {surface: '#ffffff'}}}>
        <Child />
      </ThemeProvider>,
      true,
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeTruthy();
      return null;
    }
  });

  it('does not set color system properties in context by default', () => {
    mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      false,
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeUndefined();
      return null;
    }
  });

  it('sets overrides', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      true,
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-override-zero');
  });

  describe('when nested', () => {
    it('does not set a default theme', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        true,
      );

      expect(wrapper.findAll('div')![1].props.style).toStrictEqual({
        color: '',
      });
    });

    it('does not set overrides', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        true,
      );

      const styleKeys = Object.keys(
        wrapper.findAll('div')![1].props.style || {},
      );

      expect(styleKeys).not.toContain('--p-override-zero');
    });
    it('adds css custom properties for color roles provided', () => {
      const wrapper = mountWithGlobalTheming(
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
        true,
      );

      expect(wrapper.findAll('div')![1].props.style).toStrictEqual(
        expect.objectContaining({'--p-surface': 'hsla(0, 0%, 0%, 1)'}),
      );
    });

    it('inherits colorScheme from parent <ThemeProvider>', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}} colorScheme="dark">
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {critical: '#FFFEEE'},
            }}
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        true,
      );

      const {style} = wrapper.findAll('div')![1].props;
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

    it('overrides colorScheme from parent <ThemeProvider> when provided a colorScheme', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}} colorScheme="dark">
          <ThemeProvider
            theme={{
              UNSTABLE_colors: {critical: '#FFFEEE'},
            }}
            colorScheme="light"
          >
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        true,
      );

      const {style} = wrapper.findAll('div')![1].props;
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

    it('inherits colors from parent <ThemeProvider> when their colorSchemes differ', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}} colorScheme="dark">
          <ThemeProvider theme={{}} colorScheme="light">
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        true,
      );

      const {style} = wrapper.findAll('div')![1].props;
      expect(style).toStrictEqual(
        expect.objectContaining({
          '--p-surface-background': 'hsla(0, 0%, 98%, 1)',
        }),
      );
    });
  });

  it('overrides inherited colors from parent <ThemeProvider> with provided colors when their colorSchemes differ', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
        }}
        colorScheme="dark"
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
          }}
          colorScheme="light"
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      true,
    );

    const {style} = wrapper.findAll('div')![1].props;
    expect(style).toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    );
    expect(style).not.toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(0, 0%, 98%, 1)',
      }),
    );
  });

  it('inverts the parent colorScheme from dark to light when given an inverse colorScheme', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
        }}
        colorScheme="dark"
      >
        <ThemeProvider
          theme={{
            UNSTABLE_colors: {critical: '#FFFEEE'},
          }}
          colorScheme="inverse"
        >
          <p>Hello</p>
        </ThemeProvider>
      </ThemeProvider>,
      true,
    );

    const {style} = wrapper.findAll('div')![1].props;
    expect(style).toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    );
    expect(style).not.toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(0, 0%, 98%, 1)',
      }),
    );
  });
});

function mountWithGlobalTheming(
  children: React.ReactNode,
  globalThemingEnabled: boolean,
) {
  return mount(
    <FeaturesContext.Provider
      value={{unstableGlobalTheming: globalThemingEnabled}}
    >
      {children}
    </FeaturesContext.Provider>,
  );
}
