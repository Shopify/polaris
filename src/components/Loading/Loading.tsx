import React, {useContext, useEffect, useRef} from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {FrameContext} from '../Frame';
import {useAppBridge} from '../../utilities/app-bridge';

export interface Props {}

function Loading() {
  const appBridgeLoading = useRef<AppBridgeLoading.Loading>();
  const appBridge = useAppBridge();
  const frame = useContext(FrameContext);

  useEffect(
    () => {
      if (appBridge == null && frame) {
        frame.startLoading();
      } else if (appBridge != null) {
        // eslint-disable-next-line no-console
        console.warn(
          "Deprecation: Using `Loading` in an embedded app is deprecated and will be removed in v5.0. Use `Loading` from `@shopify/app-bridge-react` instead. For example, `import {Loading} from '@shopify/app-bridge-react';`",
        );

        appBridgeLoading.current = AppBridgeLoading.create(appBridge);
        appBridgeLoading.current.dispatch(AppBridgeLoading.Action.START);
      }

      return () => {
        if (appBridge == null && frame) {
          frame.stopLoading();
        } else if (appBridgeLoading.current != null) {
          appBridgeLoading.current.dispatch(AppBridgeLoading.Action.STOP);
        }
      };
    },
    [appBridge, frame],
  );

  return null;
}

export default React.memo(Loading);
