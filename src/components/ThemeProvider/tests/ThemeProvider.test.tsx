import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import ThemeProvider from '../ThemeProvider';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{logo: null}}>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider.exists()).toBe(true);
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

    expect(wrapper.find('div').props().style).toEqual({
      '--top-bar-background': '#021123',
      '--top-bar-background-lighter': 'hsl(213, 74%, 22%, 1)',
      '--top-bar-color': 'rgb(255, 255, 255)',
    });
  });
});
