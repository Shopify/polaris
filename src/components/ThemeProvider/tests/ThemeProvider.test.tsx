import * as React from 'react';
import TestUtils from 'react-dom/test-utils';
import {
  mountWithAppProvider,
  documentHasStyle,
} from '../../../../tests/utilities';
import ThemeProvider from '../ThemeProvider';
import {THEME_CONTEXT_TYPES} from '../types';

describe('<ThemeProvider />', () => {
  it('onRemove gets called when remove button is clicked', () => {
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

  it('sets the child node correctly', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider
        theme={{
          colors: {
            topBar: {
              background: '#051',
            },
          },
        }}
      >
        <div>Hello</div>
      </ThemeProvider>,
    );
    const child = themeProvider.find('div').getDOMNode();
    const style =
      child instanceof HTMLElement && (child.style as any).TopBarBackground;
    expect(style).toBe('#051');
  });

  it('sets the root node correctly with the useRoot prop', () => {
    mountWithAppProvider(
      <ThemeProvider
        useRoot
        theme={{
          colors: {
            topBar: {
              background: '#051',
            },
          },
        }}
      >
        <div>Hello</div>
      </ThemeProvider>,
    );
    expect(documentHasStyle('TopBarBackground', '#051')).toBe(true);
  });
});
