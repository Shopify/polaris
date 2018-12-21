import * as React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'test-utilities';
import {Provider, createFrameContext} from '../../Frame';

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
      <Provider value={mockFrameContext}>
        <Loading />
      </Provider>,
    );
    expect(mockFrameContext.frame.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const mockFrameContext = createFrameContext({
      stopLoading: jest.fn(),
    });
    const frame = mountWithAppProvider(
      <Provider value={mockFrameContext}>
        <Loading />
      </Provider>,
    );
    expect(mockFrameContext.frame.stopLoading).not.toHaveBeenCalled();

    frame.unmount();
    expect(mockFrameContext.frame.stopLoading).toHaveBeenCalled();
  });

  describe('with app bridge', () => {
    const dispatch = jest.fn();
    AppBridgeLoading.create = jest.fn().mockReturnValue({dispatch});

    it('starts loading on mount', () => {
      const {polaris} = mountWithAppBridge(<Loading />);

      expect(AppBridgeLoading.create).toHaveBeenCalledTimes(1);
      expect(AppBridgeLoading.create).toHaveBeenCalledWith(polaris.appBridge);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(AppBridgeLoading.Action.START);
    });

    it('stops loading on unmount', () => {
      const {loading} = mountWithAppBridge(<Loading />);

      loading.unmount();
      expect(dispatch).toHaveBeenCalledWith(AppBridgeLoading.Action.STOP);
    });
  });
});

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const loading = mountWithAppProvider(element, {
    context: {frame: {}, polaris},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, polaris};
}
