import React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {FrameContext, createFrameContext} from '../../Frame';

import Loading from '../Loading';

describe('<Loading />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts loading on mount', () => {
    const mockFrameContext = createFrameContext({
      startLoading: jest.fn(),
    });

    mountWithAppProvider(
      <FrameContext.Provider value={mockFrameContext}>
        <Loading />
      </FrameContext.Provider>,
    );
    expect(mockFrameContext.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const mockFrameContext = createFrameContext({
      stopLoading: jest.fn(),
    });
    const frame = mountWithAppProvider(
      <FrameContext.Provider value={mockFrameContext}>
        <Loading />
      </FrameContext.Provider>,
    );
    expect(mockFrameContext.stopLoading).not.toHaveBeenCalled();

    frame.unmount();
    expect(mockFrameContext.stopLoading).toHaveBeenCalled();
  });

  describe('with app bridge', () => {
    const dispatch = jest.fn();
    jest.spyOn(AppBridgeLoading, 'create').mockReturnValue({dispatch} as any);

    afterEach(() => {
      dispatch.mockReset();
    });

    it('starts loading on mount', () => {
      const {appBridge} = mountWithAppBridge(<Loading />);

      expect(AppBridgeLoading.create).toHaveBeenCalledTimes(1);
      expect(AppBridgeLoading.create).toHaveBeenCalledWith(appBridge);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(AppBridgeLoading.Action.START);
    });

    it('stops loading on unmount', () => {
      const {loading} = mountWithAppBridge(<Loading />);

      loading.unmount();
      expect(dispatch).toHaveBeenCalledWith(AppBridgeLoading.Action.STOP);
    });
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const {loading} = mountWithAppBridge(<Loading />);

      expect(() => {
        loading.unmount();
      }).not.toThrow();
    });
  });
});

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const loading = mountWithAppProvider(element, {
    context: {frame: {}, appBridge},
  });

  return {loading, appBridge};
}
