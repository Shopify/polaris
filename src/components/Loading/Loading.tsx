import * as React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {FrameContext, frameContextTypes} from '../Frame';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

export interface Props {}
export type ComposedProps = Props & WithAppProviderProps;

export class Loading extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;
  private appBridgeLoading: AppBridgeLoading.Loading | undefined;

  componentDidMount() {
    const {appBridge} = this.props.polaris;

    if (appBridge == null) {
      this.context.frame.startLoading();
    } else {
      this.appBridgeLoading = AppBridgeLoading.create(appBridge);
      this.appBridgeLoading.dispatch(AppBridgeLoading.Action.START);
    }
  }

  componentWillUnmount() {
    const {appBridge} = this.props.polaris;

    if (appBridge == null) {
      this.context.frame.stopLoading();
    } else if (this.appBridgeLoading != null) {
      this.appBridgeLoading.dispatch(AppBridgeLoading.Action.STOP);
    }
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(Loading);
