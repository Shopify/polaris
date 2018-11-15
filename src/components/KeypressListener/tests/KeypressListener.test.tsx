import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import {Key} from '../../../types';
import KeypressListener from '../KeypressListener';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;
const listenerMap: HandlerMap = {};

describe('<KeypressListener />', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn((event, cb) => {
      listenerMap[event] = cb;
    });

    document.removeEventListener = jest.fn((event) => {
      listenerMap[event] = noop;
    });
  });

  afterEach(() => {
    document.addEventListener = originalAddEventListener;
    document.removeEventListener = originalRemoveEventListener;
  });

  it('attaches a listener for the given key on mount', () => {
    const spy = jest.fn();

    mountWithAppProvider(
      <KeypressListener handler={spy} keyCode={Key.Escape} />,
    );

    listenerMap.keyup({keyCode: Key.Escape});
    listenerMap.keyup({keyCode: Key.Enter});
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('removes listener for the given key on unmount', () => {
    const spy = jest.fn();

    mountWithAppProvider(
      <KeypressListener handler={spy} keyCode={Key.Escape} />,
    ).unmount();

    listenerMap.keyup({keyCode: Key.Escape});
    expect(spy).not.toBeCalled();
  });
});
