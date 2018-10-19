import * as React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'tests/utilities';

import Loading from '../Loading';

describe('<Loading />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts loading on mount', () => {
    const {frame} = mountWithFrame(<Loading />);
    expect(frame.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const {loading, frame} = mountWithFrame(<Loading />);
    expect(frame.stopLoading).not.toHaveBeenCalled();

    loading.unmount();
    expect(frame.stopLoading).toHaveBeenCalled();
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

function mountWithFrame(element: React.ReactElement<any>) {
  const frame = {startLoading: jest.fn(), stopLoading: jest.fn()};
  const loading = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, frame};
}

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const loading = mountWithAppProvider(element, {
    context: {frame: {}, polaris},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, polaris};
}
