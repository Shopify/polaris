import type {FunctionComponent} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Scrollable} from '../Scrollable';
import {ScrollableContext} from '../context';

describe('<Scrollable />', () => {
  it('mounts', () => {
    const scrollable = mountWithApp(<Scrollable />);
    expect(scrollable).toBeDefined();
  });

  it('unmounts', () => {
    const scrollable = mountWithApp(<Scrollable />);
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
    const scrollable = mountWithApp(<Scrollable>{children}</Scrollable>);
    expect(scrollable).toContainReactComponent('div', {children});
  });

  it('provides scrollToPosition callback to children', () => {
    const Child: FunctionComponent = (_) => (
      <ScrollableContext.Consumer>
        {(scrollToPosition) => {
          return scrollToPosition ? <div /> : null;
        }}
      </ScrollableContext.Consumer>
    );

    const scrollableContainer = mountWithApp(
      <ScrollableContext.Provider value={() => {}}>
        <Scrollable>
          <Child />
        </Scrollable>
      </ScrollableContext.Provider>,
    );

    const scrollChild = scrollableContainer.find(Child)!;
    expect(scrollChild).toContainReactComponent('div');
  });

  it('allows children to receive scroll events', () => {
    const spy = jest.fn();
    const scrollArea = mountWithApp(
      <Scrollable>
        <div onScroll={spy} />
      </Scrollable>,
    );
    scrollArea.find('div', {onScroll: spy})!.trigger('onScroll');
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
