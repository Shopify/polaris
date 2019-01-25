import * as React from 'react';
import TestUtils from 'react-dom/test-utils';
import {createThemeContext} from '../../ThemeProvider';
import {StickyManager, createAppProviderContext} from '../utilities';
import {polarisAppProviderContextTypes} from '../types';
import AppProvider from '../AppProvider';

describe('<AppProvider />', () => {
  it('passes i18n and withComponent properties to context', () => {
    const i18n = {
      Polaris: {
        Common: {
          undo: 'Custom Undo',
        },
      },
    };
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };
    const stickyManager = new StickyManager(document);
    const context = {
      ...createAppProviderContext({
        i18n,
        linkComponent: CustomLinkComponent,
        stickyManager,
      }),
      ...createThemeContext(),
    };

    // eslint-disable-next-line react/prefer-stateless-function
    class Child extends React.PureComponent {
      static contextTypes = polarisAppProviderContextTypes;

      render() {
        return <div />;
      }
    }

    const wrapper = TestUtils.renderIntoDocument(
      <AppProvider i18n={i18n} linkComponent={CustomLinkComponent}>
        <Child />
      </AppProvider>,
    );

    const child = TestUtils.findRenderedComponentWithType(
      wrapper as React.Component,
      Child,
    );

    // https://github.com/facebook/jest/issues/1772
    expect(JSON.stringify(child.context)).toBe(JSON.stringify(context));
  });
});
