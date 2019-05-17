import {useContext} from 'react';
// eslint-disable-next-line shopify/strict-component-boundaries
import {AppProviderContext} from '../../components/AppProvider';

function useAppBridge() {
  const {appBridge} = useContext(AppProviderContext);

  return appBridge;
}

export default useAppBridge;
