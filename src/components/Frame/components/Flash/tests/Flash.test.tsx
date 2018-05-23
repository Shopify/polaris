import * as React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {noop} from '../../../../../utilities/other';
import Flash, {Props} from '../Flash';

describe('<Flash />', () => {
  const mockProps: Props = {onDismiss: noop};

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  describe('dismiss button', () => {
    it('renders by default', () => {
      const message = mountWithAppProvider(<Flash {...mockProps} />);
      expect(message.find('button')).toHaveLength(1);
    });

    it('renders when dismissible is true', () => {
      const message = mountWithAppProvider(
        <Flash {...mockProps} duration={1000} dismissible />,
      );
      expect(message.find('button')).toHaveLength(1);
    });

    it('does not render when dismissible is falsy and a duration is provided', () => {
      const message = mountWithAppProvider(
        <Flash {...mockProps} duration={1000} />,
      );
      expect(message.find('button')).toHaveLength(0);
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is pressed', () => {
      const spy = jest.fn();

      const message = mountWithAppProvider(
        <Flash {...mockProps} dismissible onDismiss={spy} />,
      );

      message.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('is called after the duration is reached', () => {
      const spy = jest.fn();
      const duration = 3000;

      mountWithAppProvider(
        <Flash {...mockProps} onDismiss={spy} duration={duration} />,
      );
      expect(spy).not.toHaveBeenCalled();

      timer.runTimersToTime(duration);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('is not called if the component unmountWithAppProviders before the duration is reached', () => {
      const spy = jest.fn();

      const flash = mountWithAppProvider(
        <Flash {...mockProps} onDismiss={spy} duration={3000} />,
      );
      flash.unmount();
      timer.runAllTimers();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
