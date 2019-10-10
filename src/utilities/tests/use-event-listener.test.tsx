import React, {useRef, useEffect} from 'react';
import {mount} from 'test-utilities';
import {useEventListener} from '../use-event-listener';

describe('useComponentDidMount', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('adds event to react refs', () => {
    const spy = jest.fn();
    function Component() {
      const div = useRef<HTMLDivElement>(null);

      useEventListener(div, 'blur', spy);

      useEffect(() => {
        div.current!.dispatchEvent(new Event('blur'));
      });

      return <div ref={div} />;
    }

    mount(<Component />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('invokes the provided handler when the type of event is triggered', () => {
    const spy = jest.fn();
    function Component() {
      useEventListener(document, 'reset', spy);

      return null;
    }

    mount(<Component />);
    document.dispatchEvent(new Event('reset'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('passes type, handler and options to the listener', () => {
    const options = {passive: true};
    const noop = () => {};
    function Component() {
      useEventListener(document, 'reset', noop, options);

      return null;
    }

    mount(<Component />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('reset', noop, options);
  });

  it('removes the event listener when unmounting', () => {
    function Component() {
      useEventListener(document, 'reset', () => {});

      return null;
    }

    const component = mount(<Component />);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);
    component.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
