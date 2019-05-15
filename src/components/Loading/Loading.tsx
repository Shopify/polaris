import * as React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {FrameContext} from '../Frame';
import {usePolaris} from '../../hooks';

export interface Props {}

export default React.memo(function Loading() {
  const appBridgeLoading = React.useRef<AppBridgeLoading.Loading>();
  const {appBridge} = usePolaris();
  const frame = React.useContext(FrameContext);

  React.useEffect(() => {
    if (appBridge == null) {
      frame.startLoading();
    } else {
      appBridgeLoading.current = AppBridgeLoading.create(appBridge);
      appBridgeLoading.current.dispatch(AppBridgeLoading.Action.START);
    }

    return () => {
      if (appBridge == null) {
        frame.stopLoading();
      } else if (appBridgeLoading.current != null) {
        appBridgeLoading.current.dispatch(AppBridgeLoading.Action.STOP);
      }
    };
  }, []);

  return null;
});
