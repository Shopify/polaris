import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Key} from '../../../types';
import {KeypressListener} from '../KeypressListener';

interface HandlerMap {
  [eventName: string]: any;
}

const listenerMap: HandlerMap = {};

describe('<KeypressListener />', () => {
  beforeEach(() => {
    jest.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
      listenerMap[event] = cb;
    });

    jest.spyOn(document, 'removeEventListener').mockImplementation((event) => {
      listenerMap[event] = noop;
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
});

function noop() {}
