import React from 'react';
import {mount} from 'tests/utilities';

import {useEventListener, Props} from '../hooks';

describe('useEventListener', () => {
  it('calls handler when the resize event is fired', () => {
    const spy = jest.fn();
    mount(<MockComponent event="resize" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('does not call handler when a different event is fired', () => {
    const spy = jest.fn();
    mount(<MockComponent event="click" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when event changes', () => {
    const spy = jest.fn();
    const eventListener = mount(<MockComponent event="resize" handler={spy} />);
    eventListener.setProps({event: 'scroll', handler: noop});
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when unmounted', () => {
    const spy = jest.fn();
    mount(<MockComponent event="resize" handler={spy} />).unmount();
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });
});

function noop() {}

function MockComponent({event, handler}: Props) {
  useEventListener({event, handler});
  return null;
}
