import * as React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mountWithAppProvider} from 'test-utilities';
import ThemeProvider from '../ThemeProvider';
import {THEME_CONTEXT_TYPES} from '../types';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{logo: null}}>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider.exists()).toBe(true);
  });

  it('passes theme into context', () => {
    const context = {
      polarisTheme: {
        logo: {
          width: 104,
          topBarSource:
            'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-white.svg',
          contextualSaveBarSource:
            'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-black.svg',
        },
        subscribe: () => {},
        unsubscribe: () => {},
      },
    };

    // eslint-disable-next-line react/prefer-stateless-function
    class Child extends React.Component {
      static contextTypes = THEME_CONTEXT_TYPES;

      render() {
        return <div />;
      }
    }

    const wrapper = TestUtils.renderIntoDocument(
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

    const child = TestUtils.findRenderedComponentWithType(
      wrapper as React.Component,
      Child,
    );

    const {logo, subscribe, unsubscribe} = child.context.polarisTheme;
    expect(logo).toEqual(context.polarisTheme.logo);
    expect(typeof subscribe === 'function').toBe(true);
    expect(typeof unsubscribe === 'function').toBe(true);
  });

  it('has a default theme', () => {
    const wrapper = mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <p />
      </ThemeProvider>,
    );

    expect(wrapper.find('div').props().style).toBeDefined();
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

    expect(wrapper.find('div').props().style).toEqual({
      '--top-bar-background': '#108043',
      '--top-bar-background-lighter': 'hsl(147, 63%, 43%, 1)',
      '--top-bar-color': 'rgb(255, 255, 255)',
    });
  });
});
