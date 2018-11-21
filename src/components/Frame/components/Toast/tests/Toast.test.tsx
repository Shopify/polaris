import * as React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities';
import {noop} from 'utilities/other';
import {DEFAULT_TOAST_DURATION} from 'index';
import Toast, {Props} from '../Toast';
import {KeyValue} from '../../../../../types';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

describe('<Toast />', () => {
  const mockProps: Props = {
    content: 'Image uploaded',
    onDismiss: noop,
  };

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  const message = mountWithAppProvider(<Toast {...mockProps} />);

  it('renders its content', () => {
    const message = mountWithAppProvider(<Toast {...mockProps} />);
    expect(message.prop('content')).toEqual('Image uploaded');
  });

  describe('dismiss button', () => {
    it('renders by default', () => {
      expect(message.find('button')).toHaveLength(1);
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is pressed', () => {
      const spy = jest.fn();
      const message = mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} />,
      );

      message.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('is called when the escape key is pressed', () => {
      const listenerMap: HandlerMap = {};
      document.addEventListener = jest.fn((event, cb) => {
        listenerMap[event] = cb;
      });

      const spy = jest.fn();
      mountWithAppProvider(<Toast content="Image uploaded" onDismiss={spy} />);

      listenerMap.keyup({key: KeyValue.Escape});

      document.removeEventListener = jest.fn((event) => {
        listenerMap[event] = noop;
      });

      expect(spy).toHaveBeenCalled();
    });

    it('is called after the duration is reached', () => {
      const spy = jest.fn();
      const duration = DEFAULT_TOAST_DURATION;

      mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      expect(spy).not.toHaveBeenCalled();

      timer.runTimersToTime(duration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is not called if the component unmounts before the duration is reached', () => {
      const spy = jest.fn();
      const duration = DEFAULT_TOAST_DURATION;
      const toast = mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      toast.unmount();
      timer.runAllTimers();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
