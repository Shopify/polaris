import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext} from '../../../utilities/theme';

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
    const Child: React.SFC<{}> = (_props) => {
      return (
        <ThemeContext.Consumer>
          {(polarisTheme) => {
            // eslint-disable-next-line shopify/jest/no-if
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

    expect(wrapper.find('div').props().style).toStrictEqual({
      '--top-bar-background': '#00848e',
      '--top-bar-background-lighter': '#f9fafb',
      '--top-bar-color': '#1d9ba4',
    });
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

    expect(wrapper.find('div').props().style).toStrictEqual({
      '--top-bar-background': '#108043',
      '--top-bar-background-lighter': 'hsl(147, 63%, 43%, 1)',
      '--top-bar-color': 'rgb(255, 255, 255)',
    });
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

    expect(wrapper.find('div').props().style).toStrictEqual({
      '--top-bar-background': '#021123',
      '--top-bar-background-lighter': 'hsl(213, 74%, 22%, 1)',
      '--top-bar-color': 'rgb(255, 255, 255)',
    });
  });
});
