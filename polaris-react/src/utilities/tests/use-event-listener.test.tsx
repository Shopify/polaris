import React, {useRef} from 'react';
import {mount} from 'tests/utilities';

import {useEventListener} from '../use-event-listener';

describe('useEventListener', () => {
  it('calls handler when the resize event is fired', () => {
    function MockComponent() {
      useEventListener('resize', spy);
      return null;
    }

    const spy = jest.fn();
    mount(<MockComponent />);

    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('does not call handler when a different event is fired', () => {
    function MockComponent() {
      useEventListener('click', spy);
      return null;
    }

    const spy = jest.fn();
    mount(<MockComponent />);

    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when event changes', () => {
    function MockComponent({event}: {event: keyof WindowEventMap}) {
      useEventListener(event, spy);
      return null;
    }

    const spy = jest.fn();
    const eventListener = mount(<MockComponent event="resize" />);

    eventListener.setProps({event: 'scroll', handler: noop});

    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when unmounted', () => {
    function MockComponent() {
      useEventListener('resize', spy);
      return null;
    }

    const spy = jest.fn();
    mount(<MockComponent />).unmount();

    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('adds a listener to a custom element', () => {
    function MockComponent() {
      useEventListener('click', spy, document);
      return null;
    }

    const spy = jest.fn();
    mount(<MockComponent />);

    window.dispatchEvent(new Event('click'));
    expect(spy).not.toHaveBeenCalled();

    document.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('adds a listener to a React ref', () => {
    function MockComponent() {
      const ref = useRef<HTMLParagraphElement>(null);

      useEventListener('click', spy, ref);

      return <p ref={ref} />;
    }

    const spy = jest.fn();
    const eventListener = mount(<MockComponent />);

    eventListener.find('p')!.domNode!.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});

function noop() {}
