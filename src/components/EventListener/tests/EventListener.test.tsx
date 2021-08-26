import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {EventListener} from '../EventListener';

describe('<EventListener />', () => {
  it('calls handler when the resize event is fired', () => {
    const spy = jest.fn();
    mountWithAppProvider(<EventListener event="resize" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('does not call handler when a different event is fired', () => {
    const spy = jest.fn();
    mountWithAppProvider(<EventListener event="click" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener on update', () => {
    const spy = jest.fn();
    const eventListener = mountWithAppProvider(
      <EventListener event="resize" handler={spy} />,
    );
    eventListener.setProps({event: 'scroll', handler: noop});
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when unmounted', () => {
    const spy = jest.fn();
    mountWithAppProvider(
      <EventListener event="resize" handler={spy} />,
    ).unmount();
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });
});

function noop() {}
