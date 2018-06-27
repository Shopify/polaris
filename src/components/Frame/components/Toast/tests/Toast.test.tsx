import * as React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {noop} from '../../../../../utilities/other';
import Toast, {Props} from '../Toast';
import TextContainer from '../../../../TextContainer';
import {Keys} from '../../../../../types';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

describe('<Toast />', () => {
  const mockProps: Props = {onDismiss: noop};

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  const message = mountWithAppProvider(<Toast {...mockProps} />);

  it('renders its children', () => {
    const message = mountWithAppProvider(
      <Toast {...mockProps}>
        <TextContainer>
          <p>Toast message</p>
        </TextContainer>
      </Toast>,
    );
    expect(message.find(TextContainer).exists()).toBe(true);
  });

  it('renders multiple toasts', () => {
    const message1 = mountWithAppProvider(
      <Toast {...mockProps}>
        <TextContainer>
          <p>Toast 1</p>
        </TextContainer>
      </Toast>,
    );
    const message2 = mountWithAppProvider(
      <Toast {...mockProps}>
        <TextContainer>
          <span>Toast 2</span>
        </TextContainer>
      </Toast>,
    );

    expect(
      message1
        .find(TextContainer)
        .find('p')
        .exists(),
    ).toBe(true);

    expect(
      message2
        .find(TextContainer)
        .find('span')
        .exists(),
    ).toBe(true);
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
        <Toast {...mockProps} onDismiss={spy} />,
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
      mountWithAppProvider(<Toast {...mockProps} onDismiss={spy} />);

      listenerMap.keyup({keyCode: Keys.ESCAPE});

      document.removeEventListener = jest.fn((event) => {
        listenerMap[event] = noop;
      });

      expect(spy).toHaveBeenCalled();
    });

    it('is called after the duration is reached', () => {
      const spy = jest.fn();
      const duration = 5000;

      mountWithAppProvider(
        <Toast {...mockProps} onDismiss={spy} duration={duration} />,
      );
      expect(spy).not.toHaveBeenCalled();

      timer.runTimersToTime(duration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is not called if the component unmounts before the duration is reached', () => {
      const spy = jest.fn();
      const duration = 5000;
      const toast = mountWithAppProvider(
        <Toast {...mockProps} onDismiss={spy} duration={duration} />,
      );
      toast.unmount();
      timer.runAllTimers();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
