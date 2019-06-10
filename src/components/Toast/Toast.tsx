import React, {useContext, useRef} from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';

import {DEFAULT_TOAST_DURATION, FrameContext, ToastProps} from '../Frame';
import {useDeepCompare} from '../../utilities/use-deep-compare';
import {useAppBridge} from '../../utilities/app-bridge';

const createId = createUniqueIDFactory('Toast');

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ComposedProps = ToastProps & WithAppProviderProps`
interface Props extends ToastProps {}

function Toast(props: Props) {
  const id = useRef(createId());
  const appBridgeToast = useRef<AppBridgeToast.Toast>();
  const frame = useContext(FrameContext);
  const appBridge = useAppBridge();

  useDeepCompare(
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
        // eslint-disable-next-line no-console
        console.warn(
          "Deprecation: Using `Toast` in an embedded app is deprecated and will be removed in v5.0. Use `Toast` from `@shopify/app-bridge-react` instead. For example, `import {Toast} from '@shopify/app-bridge-react';`",
        );

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
    [appBridge, props],
  );

  return null;
}

export default React.memo(Toast);
