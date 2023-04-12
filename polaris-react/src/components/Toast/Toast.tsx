import {memo} from 'react';

import {useFrame} from '../../utilities/frame';
import type {ToastProps as ToastProps1} from '../../utilities/frame';
import {useUniqueId} from '../../utilities/unique-id';
import {useDeepEffect} from '../../utilities/use-deep-effect';

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.
export interface ToastProps extends ToastProps1 {}

export const Toast = memo(function Toast(props: ToastProps) {
  const id = useUniqueId('Toast');
  const {showToast, hideToast} = useFrame();

  useDeepEffect(() => {
    showToast({id, ...props});

    return () => {
      hideToast({id});
    };
  }, [props]);

  return null;
});
