import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';

import {DEFAULT_TOAST_DURATION, FrameContext, ToastProps} from '../Frame';
import {usePolaris} from '../../hooks';

const createId = createUniqueIDFactory('Toast');

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ComposedProps = ToastProps & WithAppProviderProps`
interface Props extends ToastProps {}

export default React.memo(function Toast(props: Props) {
  const id = React.useRef(createId());
  const appBridgeToast = React.useRef<AppBridgeToast.Toast>();
  const frame = React.useContext(FrameContext);
  const {appBridge} = usePolaris();

  React.useEffect(
    () => {
      const {
        error,
        content,
        duration = DEFAULT_TOAST_DURATION,
        onDismiss,
      } = props;
      const toastId = id.current;

      if (appBridge == null && frame) {
        frame.showToast({
          id: id.current,
          ...props,
        });
      } else if (appBridge != null) {
        appBridgeToast.current = AppBridgeToast.create(appBridge, {
          message: content,
          duration,
          isError: error,
        });

        appBridgeToast.current.subscribe(
          AppBridgeToast.Action.CLEAR,
          onDismiss,
        );
        appBridgeToast.current.dispatch(AppBridgeToast.Action.SHOW);
      }

      return () => {
        if (appBridge == null && frame) {
          frame.hideToast({id: toastId});
        } else if (appBridgeToast.current != null) {
          appBridgeToast.current.unsubscribe();
        }
      };
    },
    [appBridge, frame, props],
  );

  return null;
});
