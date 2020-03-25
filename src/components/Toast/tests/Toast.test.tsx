import React from 'react';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Toast} from '../Toast';

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the toast with a unique ID on mount', () => {
    const mockFrameContext = {
      showToast: jest.fn(),
    };

    const props = {content: 'Image uploaded', onDismiss: noop};
    mountWithAppProvider(<Toast {...props} />, {
      frame: mockFrameContext,
    });

    expect(mockFrameContext.showToast).toHaveBeenCalledWith(
      expect.objectContaining({id: expect.any(String), ...props}),
    );
  });

  it('hides the toast based on ID on unmount', () => {
    const mockFrameContext = {
      hideToast: jest.fn(),
    };

    const frame = mountWithAppProvider(
      <Toast content="Message sent" onDismiss={noop} />,
      {frame: mockFrameContext},
    );

    expect(mockFrameContext.hideToast).not.toHaveBeenCalled();
    frame.unmount();

    const mockHideToast = mockFrameContext.hideToast as jest.Mock;
    const {id} = mockHideToast.mock.calls[0][0];
    expect(mockFrameContext.hideToast).toHaveBeenCalledWith({id});
  });

  describe('with app bridge', () => {
    const appBridgeToastMock: any = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };
    jest.spyOn(AppBridgeToast, 'create').mockReturnValue(appBridgeToastMock);

    it('shows app bridge toast notice content on mount and unmounts safely', () => {
      const content = 'Message sent';
      const {toast, appBridge} = mountWithAppBridge(
        <Toast content={content} duration={1000} onDismiss={noop} />,
      );
      toast.unmount();

      expect(AppBridgeToast.create).toHaveBeenCalledWith(appBridge, {
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
      const {appBridge} = mountWithAppBridge(
        <Toast content={content} duration={1000} onDismiss={noop} error />,
      );

      expect(AppBridgeToast.create).toHaveBeenCalledWith(appBridge, {
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

function noop() {}

function mountWithAppBridge(element: React.ReactElement) {
  const appBridge = {};
  const toast = mountWithAppProvider(element, {appBridge});

  return {toast, appBridge};
}
