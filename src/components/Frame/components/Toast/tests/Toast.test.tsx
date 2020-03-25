import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  findByTestID,
} from 'test-utilities/legacy';

import {Button} from '../../../../Button';
import {Toast, ToastProps} from '../Toast';
import {Key} from '../../../../../types';

interface HandlerMap {
  [eventName: string]: any;
}

describe('<Toast />', () => {
  const mockProps: ToastProps = {
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
    expect(message.text()).toStrictEqual('Image uploaded');
  });

  it('renders an error Toast when error is true', () => {
    const message = mountWithAppProvider(<Toast {...mockProps} error />);
    expect(message.find('.Toast').hasClass('error')).toBe(true);
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
      const logSpy = jest.spyOn(console, 'log');
      logSpy.mockImplementation(() => {});
      mountWithAppProvider(
        <Toast {...mockProps} action={mockAction} duration={9000} />,
      );

      expect(logSpy).toHaveBeenCalledWith(
        'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      );
      logSpy.mockRestore();
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

    describe('events', () => {
      const listenerMap: HandlerMap = {};

      beforeEach(() => {
        jest
          .spyOn(document, 'addEventListener')
          .mockImplementation((evt, cb) => {
            listenerMap[evt] = cb;
          });

        jest
          .spyOn(document, 'removeEventListener')
          .mockImplementation((event) => {
            listenerMap[event] = noop;
          });
      });

      afterEach(() => {
        (document.addEventListener as jest.Mock).mockRestore();
        (document.removeEventListener as jest.Mock).mockRestore();

        Object.keys(listenerMap).forEach((key) => delete listenerMap[key]);
      });

      it('is called when the escape key is pressed', () => {
        const spy = jest.fn();
        mountWithAppProvider(
          <Toast content="Image uploaded" onDismiss={spy} />,
        );

        listenerMap.keyup({keyCode: Key.Escape});

        expect(spy).toHaveBeenCalled();
      });
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

function noop() {}
