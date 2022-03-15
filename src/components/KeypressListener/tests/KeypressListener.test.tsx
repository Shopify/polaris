import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Key} from '../../../types';
import {KeypressListener} from '../KeypressListener';

interface HandlerMap {
  [eventName: string]: any;
}

const listenerMap: HandlerMap = {};
const listenerOptionsMap: HandlerMap = {};

describe('<KeypressListener />', () => {
  beforeEach(() => {
    jest
      .spyOn(document, 'addEventListener')
      .mockImplementation((event, cb, options) => {
        listenerMap[event] = cb;
        listenerOptionsMap[event] = options;
      });

    jest.spyOn(document, 'removeEventListener').mockImplementation((event) => {
      listenerMap[event] = noop;

      delete listenerOptionsMap[event];
    });
  });

  afterEach(() => {
    (document.addEventListener as jest.Mock).mockRestore();
    (document.removeEventListener as jest.Mock).mockRestore();
  });

  it('attaches a listener for the given key on mount', () => {
    const spy = jest.fn();

    mountWithApp(<KeypressListener handler={spy} keyCode={Key.Escape} />);

    listenerMap.keyup({keyCode: Key.Escape});
    listenerMap.keyup({keyCode: Key.Enter});
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('removes listener for the given key on unmount', () => {
    const spy = jest.fn();

    mountWithApp(
      <KeypressListener handler={spy} keyCode={Key.Escape} />,
    ).unmount();

    listenerMap.keyup({keyCode: Key.Escape});
    expect(spy).not.toHaveBeenCalled();
  });

  it('allows registering an event in the capture phase using useCapture', () => {
    const spy = jest.fn();

    mountWithApp(
      <KeypressListener handler={spy} keyCode={Key.Escape} useCapture />,
    );

    expect(listenerOptionsMap.keyup).toBe(true);
  });

  it('passes additional options to the event', () => {
    const spy = jest.fn();

    const eventOptions = {
      capture: true,
      once: true,
      passive: true,
      signal: new AbortController().signal,
    };

    mountWithApp(
      <KeypressListener
        handler={spy}
        keyCode={Key.Escape}
        options={eventOptions}
      />,
    );

    expect(listenerOptionsMap.keyup).toStrictEqual(eventOptions);
  });
});

function noop() {}
