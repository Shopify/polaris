import React from 'react';

import {ToastProps, useFrame} from '../../utilities/frame';
import {useUniqueId} from '../../utilities/unique-id';
import {useDeepEffect} from '../../utilities/use-deep-effect';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ComposedProps = ToastProps & WithAppProviderProps`
export interface ToastProps extends ToastProps {}

// This does have a display name, but the linting has a bug in it
// https://github.com/yannickcr/eslint-plugin-react/issues/2324
// eslint-disable-next-line react/display-name
export const Toast = React.memo(function Toast(props: ToastProps) {
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
