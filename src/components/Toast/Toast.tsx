import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Flash as AppBridgeToast} from '@shopify/app-bridge/actions';

import {
  DEFAULT_TOAST_DURATION,
  FrameContext,
  frameContextTypes,
  ToastProps as Props,
} from '../Frame';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

const createId = createUniqueIDFactory('Toast');

export type ComposedProps = Props & WithAppProviderProps;

export class Toast extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  private id = createId();
  private appBridgeToast: AppBridgeToast.Flash | undefined;

  componentDidMount() {
    const {context, id, props} = this;
    const {
      error,
      content,
      duration = DEFAULT_TOAST_DURATION,
      onDismiss,
    } = props;
    const {appBridge} = props.polaris;

    if (appBridge == null) {
      context.frame.showToast({
        id,
        ...(props as Props),
      });
    } else {
      this.appBridgeToast = AppBridgeToast.create(appBridge, {
        message: content,
        duration,
        isError: error,
        isDismissible: true,
      });

      this.appBridgeToast.subscribe(AppBridgeToast.Action.CLEAR, onDismiss);
      this.appBridgeToast.dispatch(AppBridgeToast.Action.SHOW);
    }
  }

  componentWillUnmount() {
    const {appBridge} = this.props.polaris;

    if (appBridge == null) {
      this.context.frame.hideToast({id: this.id});
    } else if (this.appBridgeToast != null) {
      this.appBridgeToast.unsubscribe();
    }
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(Toast);
