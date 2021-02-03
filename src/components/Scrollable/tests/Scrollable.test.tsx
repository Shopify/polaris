import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {Scrollable} from '../Scrollable';
import {ScrollableContext} from '../context';

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
    const Child: React.SFC = (_) => (
      <ScrollableContext.Consumer>
        {(scrollToPosition) => {
          return scrollToPosition ? <div /> : null;
        }}
      </ScrollableContext.Consumer>
    );

    const scrollableContainer = mountWithAppProvider(
      <ScrollableContext.Provider value={() => {}}>
        <Scrollable>
          <Child />
        </Scrollable>
      </ScrollableContext.Provider>,
    );

    const div = scrollableContainer.find(Child).find('div').first();
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

  it('has a tabIndex when focusable', () => {
    const scrollArea = mountWithApp(
      <Scrollable focusable>
        <p>Hello</p>
      </Scrollable>,
    );

    expect(scrollArea.find('div')).toHaveReactProps({
      tabIndex: 0,
    });
  });
});
