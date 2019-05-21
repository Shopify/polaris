import * as React from 'react';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';
import {mountWithAppProvider} from 'test-utilities';
import Toast from '../Toast';
import {FrameContext, createFrameContext} from '../../Frame';

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the toast with a unique ID on mount', () => {
    const mockFrameContext = createFrameContext({
      showToast: jest.fn(),
    });

    const props = {content: 'Image uploaded', onDismiss: noop};
    mountWithAppProvider(
      <FrameContext.Provider value={mockFrameContext}>
        <Toast {...props} />
      </FrameContext.Provider>,
    );

    expect(mockFrameContext.showToast).toHaveBeenCalledWith(
      expect.objectContaining({id: expect.any(String), ...props}),
    );
  });

  it('hides the toast based on ID on unmount', () => {
    const mockFrameContext = createFrameContext({
      hideToast: jest.fn(),
    });

    const frame = mountWithAppProvider(
      <FrameContext.Provider value={mockFrameContext}>
        <Toast content="Message sent" onDismiss={noop} />
      </FrameContext.Provider>,
    );

    expect(mockFrameContext.hideToast).not.toHaveBeenCalled();
    frame.unmount();

    const mockHideToast = mockFrameContext.hideToast as jest.Mock;
    const {id} = mockHideToast.mock.calls[0][0];
    expect(mockFrameContext.hideToast).toHaveBeenCalledWith({id});
  });

  describe('with app bridge', () => {
    const appBridgeToastMock = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };
    jest.spyOn(AppBridgeToast, 'create').mockReturnValue(appBridgeToastMock);

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

function noop() {}

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const toast = mountWithAppProvider(element, {
    context: {frame: {}, polaris},
  });

  return {toast, polaris};
}
