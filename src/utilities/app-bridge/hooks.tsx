import {useContext} from 'react';

import {AppBridgeContext} from './context';

export function useAppBridge() {
  return useContext(AppBridgeContext);
}
