import * as React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider, trigger, findByTestID} from 'test-utilities';
import {noop} from 'utilities/other';
import Button from '../../../../Button';
import {ToastProps as Props} from '../../../types';
import Toast from '../Toast';
import {Key} from '../../../../../types';

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

  describe('action', () => {
    const mockAction = {
      content: 'Do something',
      onAction: noop,
    };

    it('does not render when not defined', () => {
      const message = mountWithAppProvider(<Toast {...mockProps} />);
      expect(message.find(Button)).toHaveLength(0);
    });

    it('passes content as button text', () => {
      const message = mountWithAppProvider(
        <Toast {...mockProps} action={mockAction} />,
      );

      expect(message.find(Button).text()).toContain(mockAction.content);
    });

    it('triggers onAction when button is clicked', () => {
      const spy = jest.fn();
      const mockActionWithSpy = {...mockAction, onAction: spy};
      const message = mountWithAppProvider(
        <Toast {...mockProps} action={mockActionWithSpy} />,
      );

      trigger(message.find(Button), 'onClick');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('defaults to a duration of 10000ms if no duration is provided and action is provided', () => {
      const spy = jest.fn();
      const mockActionWithSpy = {...mockAction, onAction: spy};

      mountWithAppProvider(
        <Toast
          content="Image uploaded"
          onDismiss={spy}
          action={mockActionWithSpy}
        />,
      );
      expect(spy).not.toHaveBeenCalled();

      const defaultDuration = 10000;

      timer.runTimersToTime(defaultDuration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('warns that a duration of 10000ms is recommended with action if duration is lower than 10000', () => {
      const warnSpy = jest.spyOn(console, 'log');
      mountWithAppProvider(
        <Toast {...mockProps} action={mockAction} duration={9000} />,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      );
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is pressed', () => {
      const spy = jest.fn();
      const message = mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} />,
      );

      findByTestID(message, 'closeButton').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('is called when the escape key is pressed', () => {
      const listenerMap: HandlerMap = {};
      document.addEventListener = jest.fn((event, cb) => {
        listenerMap[event] = cb;
      });

      const spy = jest.fn();
      mountWithAppProvider(<Toast content="Image uploaded" onDismiss={spy} />);

      listenerMap.keyup({keyCode: Key.Escape});

      document.removeEventListener = jest.fn((event) => {
        listenerMap[event] = noop;
      });

      expect(spy).toHaveBeenCalled();
    });

    it('is called after the duration is reached', () => {
      const spy = jest.fn();
      const duration = 1000;

      mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      expect(spy).not.toHaveBeenCalled();

      timer.runTimersToTime(duration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is called after the default duration is reached and no duration was provided', () => {
      const spy = jest.fn();

      mountWithAppProvider(<Toast content="Image uploaded" onDismiss={spy} />);
      expect(spy).not.toHaveBeenCalled();

      const defaultDuration = 5000;

      timer.runTimersToTime(defaultDuration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is not called if the component unmounts before the duration is reached', () => {
      const spy = jest.fn();
      const duration = 1000;
      const toast = mountWithAppProvider(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      toast.unmount();
      timer.runAllTimers();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
