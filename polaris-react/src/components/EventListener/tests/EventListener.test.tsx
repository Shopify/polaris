import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';

describe('<EventListener />', () => {
  it('calls handler when the resize event is fired', () => {
    const spy = jest.fn();
    mountWithApp(<EventListener event="resize" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('does not call handler when a different event is fired', () => {
    const spy = jest.fn();
    mountWithApp(<EventListener event="click" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener on update', () => {
    const spy = jest.fn();
    const eventListener = mountWithApp(
      <EventListener event="resize" handler={spy} />,
    );
    eventListener.setProps({event: 'scroll', handler: noop});
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when unmounted', () => {
    const spy = jest.fn();
    mountWithApp(<EventListener event="resize" handler={spy} />).unmount();
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });
});

function noop() {}
