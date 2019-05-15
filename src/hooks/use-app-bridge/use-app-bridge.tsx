import * as React from 'react';
import {AppProviderContext} from '../../components';

function useAppBridge() {
  const {appBridge} = React.useContext(AppProviderContext);

  return appBridge;
}

export default useAppBridge;
