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

  it('does not set color system properties in context by default', () => {
    mountWithGlobalTheming(
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
});
