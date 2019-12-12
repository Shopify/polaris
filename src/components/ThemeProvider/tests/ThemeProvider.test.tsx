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

  it('sets color system properties when global theming is enabled', () => {
    const themeProvider = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    expect(themeProvider.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        '--p-surface-background': 'hsla(0, 0%, 98%, 1)',
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

  it('sets overrides', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-override-zero');
  });

  it('sets surface', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-surface-background');
  });

  it('sets onSurface', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-text-on-surface');
  });

  it('sets interactive', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-interactive-action');
  });

  it('sets neutral', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-neutral-action');
  });

  it('sets primary', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-primary-action');
  });

  it('sets critical', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-critical-action');
  });

  it('sets warning', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-warning-surface');
  });

  it('sets highlight', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-highlight-surface');
  });

  it('sets success', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-success-surface');
  });

  it('sets decorative', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {globalTheming: true},
    );

    const styleKeys = Object.keys(wrapper.find('div')!.props.style || {});

    expect(styleKeys).toContain('--p-decorative-one-text');
  });

  describe('when nested', () => {
    it('does not set a default theme', () => {
      const wrapper = mountWithGlobalTheming(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {globalTheming: true},
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
        {globalTheming: true},
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
        {globalTheming: true},
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
        {globalTheming: true},
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
        {globalTheming: true},
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
        {globalTheming: true},
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
      {globalTheming: true},
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
      {globalTheming: true},
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

  it('inverts the parent colorScheme from light to dark when given an inverse colorScheme', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
        }}
        colorScheme="light"
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
      {globalTheming: true},
    );

    const {style} = wrapper.findAll('div')![1].props;
    expect(style).toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(58, 100%, 7.000000000000001%, 1)',
      }),
    );
    expect(style).not.toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    );
  });

  it('sets the color scheme to light when the child color scheme is inverse and the parent has none', () => {
    const wrapper = mountWithGlobalTheming(
      <ThemeProvider
        theme={{
          UNSTABLE_colors: {critical: '#000000'},
        }}
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
      {globalTheming: true},
    );

    const {style} = wrapper.findAll('div')![1].props;
    expect(style).toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(58, 100%, 7.000000000000001%, 1)',
      }),
    );
    expect(style).not.toStrictEqual(
      expect.objectContaining({
        '--p-critical-surface': 'hsla(57, 100%, 93%, 1)',
      }),
    );
  });
});
