import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';
import {CheckIcon} from '@shopify/polaris-icons';

import {Button} from '../../../../Button';
import {Toast} from '../Toast';
import type {ToastProps} from '../Toast';
import {Key} from '../../../../../types';
import {Icon} from '../../../../Icon';

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

  it('renders its content', () => {
    const message = mountWithApp(<Toast {...mockProps} />);
    expect(message).toContainReactText('Image uploaded');
  });

  it('renders an error Toast when error is true', () => {
    const message = mountWithApp(<Toast {...mockProps} error />);

    expect(message).toContainReactComponent('div', {
      className: 'Toast error',
    });
  });

  it('renders a Toast with the magic tone when tone is "magic"', () => {
    const message = mountWithApp(<Toast {...mockProps} tone="magic" />);
    expect(message).toContainReactComponent('div', {
      className: 'Toast toneMagic',
    });
  });

  describe('dismiss button', () => {
    it('renders by default', () => {
      const message = mountWithApp(<Toast {...mockProps} />);
      expect(message).toContainReactComponent('button');
    });
  });

  it('renders a leading icon if an icon is provided', () => {
    const message = mountWithApp(<Toast icon={CheckIcon} {...mockProps} />);
    expect(message).toContainReactComponent(Icon, {source: CheckIcon});
  });

  describe('action', () => {
    const mockAction = {
      content: 'Do something',
      onAction: noop,
    };

    it('does not render when not defined', () => {
      const message = mountWithApp(<Toast {...mockProps} />);
      expect(message).not.toContainReactComponent(Button);
    });

    it('passes content as button text', () => {
      const message = mountWithApp(
        <Toast {...mockProps} action={mockAction} />,
      );

      expect(message).toContainReactComponent(Button, {
        children: mockAction.content,
      });
    });

    it('triggers onAction when button is clicked', () => {
      const spy = jest.fn();
      const mockActionWithSpy = {...mockAction, onAction: spy};
      const message = mountWithApp(
        <Toast {...mockProps} action={mockActionWithSpy} />,
      );

      message.find(Button)?.trigger('onClick');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('defaults to a duration of 10000ms if no duration is provided and action is provided', () => {
      const spy = jest.fn();
      const mockActionWithSpy = {...mockAction, onAction: spy};

      mountWithApp(
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
      mountWithApp(
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
      const message = mountWithApp(
        <Toast content="Image uploaded" onDismiss={spy} />,
      );

      message.find('button')!.trigger('onClick');
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
        mountWithApp(<Toast content="Image uploaded" onDismiss={spy} />);

        listenerMap.keyup({keyCode: Key.Escape});

        expect(spy).toHaveBeenCalled();
      });
    });

    it('is called after the duration is reached', () => {
      const spy = jest.fn();
      const duration = 1000;

      mountWithApp(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      expect(spy).not.toHaveBeenCalled();

      timer.runTimersToTime(duration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is called after the default duration is reached and no duration was provided', () => {
      const spy = jest.fn();

      mountWithApp(<Toast content="Image uploaded" onDismiss={spy} />);
      expect(spy).not.toHaveBeenCalled();

      const defaultDuration = 5000;

      timer.runTimersToTime(defaultDuration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is not called if the component unmounts before the duration is reached', () => {
      const spy = jest.fn();
      const duration = 1000;
      const toast = mountWithApp(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );
      toast.unmount();
      timer.runAllTimers();

      expect(spy).not.toHaveBeenCalled();
    });

    it('is not called if the isHovered prop is true', () => {
      const spy = jest.fn();
      const duration = 1000;
      const toast = mountWithApp(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );

      toast.setProps({isHovered: true});
      timer.runTimersToTime(duration);

      expect(spy).not.toHaveBeenCalled();
    });

    it('is called if the isHovered prop is true and then false', () => {
      const spy = jest.fn();
      const duration = 1000;
      const toast = mountWithApp(
        <Toast content="Image uploaded" onDismiss={spy} duration={duration} />,
      );

      toast.setProps({isHovered: true});
      timer.runTimersToTime(duration);

      expect(spy).not.toHaveBeenCalled();

      toast.setProps({isHovered: false});
      timer.runTimersToTime(duration);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('wraps the toast in a button when provided', () => {
      const spy = jest.fn();
      const message = mountWithApp(<Toast {...mockProps} onClick={spy} />);

      expect(message.find('button')).toContainReactText(mockProps.content);
    });

    it('fires the callback when the toast is clicked', () => {
      const spy = jest.fn();
      const message = mountWithApp(<Toast {...mockProps} onClick={spy} />);

      message.find('button')?.trigger('onClick');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

function noop() {}
