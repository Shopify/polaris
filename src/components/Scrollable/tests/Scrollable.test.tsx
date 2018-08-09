import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Scrollable from '../Scrollable';
import {contextTypes} from '../types';

describe('<Scrollable />', () => {
  it('mounts', () => {
    const mounted = mountWithAppProvider(<Scrollable />);
    expect(mounted).toBeTruthy();
  });

  it('provides scrollToPosition callback to children', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.scrollToPosition ? <div /> : null;
    Child.contextTypes = contextTypes;

    const scrollableContainer = mountWithAppProvider(
      <Scrollable>
        <Child />
      </Scrollable>,
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
