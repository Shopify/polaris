import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Scrollable from '../Scrollable';
import {Provider, Consumer} from '../components';

describe('<Scrollable />', () => {
  it('mounts', () => {
    const scrollable = mountWithAppProvider(<Scrollable />);
    expect(scrollable).toBeTruthy();
  });

  it('unmounts', () => {
    const scrollable = mountWithAppProvider(<Scrollable />);
    expect(() => {
      scrollable.unmount();
    }).not.toThrow();
  });

  it('renders its children', () => {
    const children = (
      <p>
        By signing up for the Shopify service (“Service”) or any of the services
        of Shopify Inc.
      </p>
    );
    const scrollable = mountWithAppProvider(
      <Scrollable>{children}</Scrollable>,
    );
    expect(scrollable.contains(children)).toBe(true);
  });

  it('provides scrollToPosition callback to children', () => {
    const Child: React.SFC<{}> = (_) => (
      <Consumer>
        {({scrollToPosition}) => (scrollToPosition ? <div /> : null)}
      </Consumer>
    );

    const scrollableContainer = mountWithAppProvider(
      <Provider value={{scrollToPosition: () => {}}}>
        <Scrollable>
          <Child />
        </Scrollable>
      </Provider>,
    );

    const div = scrollableContainer
      .find(Child)
      .find('div')
      .first();
    expect(div.exists()).toBe(true);
  });

  it('allows children to receive scroll events', () => {
    const spy = jest.fn();
    const scrollArea = mountWithAppProvider(
      <Scrollable>
        <div id="scrollContents" onScroll={spy} />
      </Scrollable>,
    );
    scrollArea.find('#scrollContents').simulate('scroll');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
