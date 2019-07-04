import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import AppProviderContext from '../context';
import AppProvider from '../AppProvider';

describe('<AppProvider />', () => {
  it('updates polaris context when props change', () => {
    const Child: React.SFC<{}> = (_props) => (
      <AppProviderContext.Consumer>
        {({link}) => {
          // eslint-disable-next-line shopify/jest/no-if
          return link.getLinkComponent() ? <div id="child" /> : null;
        }}
      </AppProviderContext.Consumer>
    );
    const LinkComponent = () => <div />;

    const wrapper = mountWithAppProvider(
      <AppProvider i18n={{}}>
        <Child />
      </AppProvider>,
    );

    expect(wrapper.find('#child')).toHaveLength(0);
    wrapper.setProps({linkComponent: LinkComponent});
    wrapper.update();
    expect(wrapper.find('#child')).toHaveLength(1);
  });
});
