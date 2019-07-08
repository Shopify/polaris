import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {LinkContext} from '../../../utilities/link';
import AppProvider from '../AppProvider';

describe('<AppProvider />', () => {
  it('updates context when props change', () => {
    const Child: React.SFC<{}> = (_props) => (
      <LinkContext.Consumer>
        {(link) => {
          // eslint-disable-next-line shopify/jest/no-if
          return link && link.getLinkComponent() ? <div id="child" /> : null;
        }}
      </LinkContext.Consumer>
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
