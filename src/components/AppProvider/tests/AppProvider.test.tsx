import * as React from 'react';
import {mount} from 'enzyme';
import {polarisAppProviderContextTypes} from '../types';
import AppProvider from '../AppProvider';

describe('<AppProvider />', () => {
  it('updates polaris context when props change', () => {
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };

    // eslint-disable-next-line react/prefer-stateless-function
    class Child extends React.Component {
      static contextTypes = polarisAppProviderContextTypes;

      render() {
        return <div />;
      }
    }

    const wrapper = mount(
      <AppProvider>
        <Child />
      </AppProvider>,
    );

    wrapper.setProps({linkComponent: CustomLinkComponent});

    expect(
      wrapper.find(Child).instance().context.polaris.link.linkComponent,
    ).toBe(CustomLinkComponent);
  });
});
