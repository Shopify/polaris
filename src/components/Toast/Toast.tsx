import * as React from 'react';
import compose from '@shopify/react-compose';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Toast as AppBridgeToast} from '@shopify/app-bridge/actions';
import withContext from '../WithContext';
import {WithContextTypes} from '../../types';

import {
  DEFAULT_TOAST_DURATION,
  FrameContext,
  Consumer,
  ToastProps,
} from '../Frame';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

const createId = createUniqueIDFactory('Toast');

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ComposedProps = ToastProps & WithAppProviderProps`
interface Props extends ToastProps {}

export type ComposedProps = Props &
  WithAppProviderProps &
  WithContextTypes<FrameContext>;

export class Toast extends React.PureComponent<ComposedProps, never> {
  context: FrameContext;

  private id = createId();
  private appBridgeToast: AppBridgeToast.Toast | undefined;

  componentDidMount() {
    const {id, props} = this;
    const {
      error,
      content,
      duration = DEFAULT_TOAST_DURATION,
      onDismiss,
    } = props;
    const {appBridge} = props.polaris;

    if (appBridge == null) {
      const {polaris, context, ...rest} = props;
      context.frame.showToast({
        id,
        ...(rest as Props),
      });
    } else {
      this.appBridgeToast = AppBridgeToast.create(appBridge, {
        message: content,
        duration,
        isError: error,
      });

      this.appBridgeToast.subscribe(AppBridgeToast.Action.CLEAR, onDismiss);
      this.appBridgeToast.dispatch(AppBridgeToast.Action.SHOW);
    }
  }

  componentWillUnmount() {
    const {polaris, context} = this.props;
    const {appBridge} = polaris;

    if (appBridge == null) {
      context.frame.hideToast({id: this.id});
    } else if (this.appBridgeToast != null) {
      this.appBridgeToast.unsubscribe();
    }
  }

  render() {
    return null;
  }
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, FrameContext>(Consumer),
  withAppProvider(),
)(Toast);
