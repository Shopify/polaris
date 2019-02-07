import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';
import {mountWithAppProvider, createPolarisProps} from 'test-utilities';
import {noop} from '../../../utilities/other';
import Toast from '../Toast';

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the toast with a unique ID on mount', () => {
    const props = {content: 'Image uploaded', onDismiss: noop};
    const composedProps = {
      ...props,
      ...createPolarisProps(),
    };
    const {frame} = mountWithContext(<Toast {...props} />);
    expect(frame.showToast).toHaveBeenCalledWith({
      id: expect.any(String),
      ...composedProps,
    });
  });

  it('hides the toast based on ID on unmount', () => {
    const {toast, frame} = mountWithContext(
      <Toast content="Message sent" onDismiss={noop} />,
    );
    expect(frame.hideToast).not.toHaveBeenCalled();
    toast.unmount();

    const {id} = frame.showToast.mock.calls[0][0];
    expect(frame.hideToast).toHaveBeenCalledWith({id});
  });

  describe('with app bridge', () => {
    const appBridgeToastMock = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };
    AppBridgeToast.create = jest.fn().mockReturnValue(appBridgeToastMock);

    it('shows app bridge toast notice content on mount and unmounts safely', () => {
      const content = 'Message sent';
      const {toast, polaris} = mountWithAppBridge(
        <Toast content={content} duration={1000} onDismiss={noop} />,
      );
      toast.unmount();

      expect(AppBridgeToast.create).toHaveBeenCalledWith(polaris.appBridge, {
        duration: 1000,
        isError: undefined,
        message: 'Message sent',
      });
      expect(AppBridgeToast.create).toHaveBeenCalledTimes(1);
      expect(appBridgeToastMock.dispatch).toHaveBeenCalledWith(
        AppBridgeToast.Action.SHOW,
      );
      expect(appBridgeToastMock.dispatch).toHaveBeenCalledTimes(1);
    });

    it('shows app bridge toast error content on mount', () => {
      const content = 'Message sent';
      const {polaris} = mountWithAppBridge(
        <Toast content={content} duration={1000} onDismiss={noop} error />,
      );

      expect(AppBridgeToast.create).toHaveBeenCalledWith(polaris.appBridge, {
        duration: 1000,
        isError: true,
        message: 'Message sent',
      });
      expect(AppBridgeToast.create).toHaveBeenCalledTimes(1);
      expect(appBridgeToastMock.dispatch).toHaveBeenCalledWith(
        AppBridgeToast.Action.SHOW,
      );
      expect(appBridgeToastMock.dispatch).toHaveBeenCalledTimes(1);
    });

    it('subscribes the dismiss callback', () => {
      mountWithAppBridge(<Toast content="Message sent" onDismiss={noop} />);

      expect(appBridgeToastMock.subscribe).toHaveBeenCalledTimes(1);
      expect(appBridgeToastMock.subscribe).toHaveBeenCalledWith(
        AppBridgeToast.Action.CLEAR,
        noop,
      );
    });

    it('unsubscribes on unmount', () => {
      const {toast} = mountWithAppBridge(
        <Toast content="Message sent" onDismiss={noop} />,
      );

      toast.unmount();
      expect(appBridgeToastMock.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {showToast: jest.fn(), hideToast: jest.fn()};
  const toast = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {toast, frame};
}

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const toast = mountWithAppProvider(element, {
    context: {frame: {}, polaris},
    childContextTypes: {frame: PropTypes.any},
  });

  return {toast, polaris};
}
