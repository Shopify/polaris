import React, {useEffect, useRef} from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';

import {useFrame} from '../../utilities/frame';
import {useAppBridge} from '../../utilities/app-bridge';

export interface LoadingProps {}

export const Loading = React.memo(function Loading() {
  const appBridgeLoading = useRef<AppBridgeLoading.Loading>();
  const appBridge = useAppBridge();
  const {startLoading, stopLoading} = useFrame();

  useEffect(() => {
    if (appBridge == null) {
      startLoading();
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: Using `Loading` in an embedded app is deprecated and will be removed in v5.0. Use `Loading` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/loading',
      );

      appBridgeLoading.current = AppBridgeLoading.create(appBridge);
      appBridgeLoading.current.dispatch(AppBridgeLoading.Action.START);
    }

    return () => {
      if (appBridge == null) {
        stopLoading();
      } else {
        appBridgeLoading.current &&
          appBridgeLoading.current.dispatch(AppBridgeLoading.Action.STOP);
      }
    };
  }, [appBridge, startLoading, stopLoading]);

  return null;
});
