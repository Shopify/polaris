import * as React from 'react';
import TestUtils from 'react-dom/test-utils';

import {createPolarisContext} from '../utils';
import {polarisProviderContextTypes} from '../types';

import Provider from '../Provider';

describe('<Provider />', () => {
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
    const context = createPolarisContext({
      i18n,
      linkComponent: CustomLinkComponent,
    });

    // eslint-disable-next-line react/prefer-stateless-function
    class Child extends React.Component {
      static contextTypes = polarisProviderContextTypes;

      render() {
        return <div />;
      }
    }

    const wrapper = TestUtils.renderIntoDocument(
      <Provider i18n={i18n} linkComponent={CustomLinkComponent}>
        <Child />
      </Provider>,
    );

    const child = TestUtils.findRenderedComponentWithType(
      wrapper as React.Component,
      Child,
    );

    expect(child.context).toEqual(context);
  });
});
