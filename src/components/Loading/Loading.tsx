import * as React from 'react';
import {Loading as AppBridgeLoading} from '@shopify/app-bridge/actions';
import {FrameContext, frameContextTypes} from '../Frame';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

export interface Props {}
type ComposedProps = Props & WithAppProviderProps;

class Loading extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;
  private appBridgeLoading: AppBridgeLoading.Loading | undefined;

  componentDidMount() {
    const {appBridge} = this.props.polaris;

    if (appBridge == null) {
      this.context.frame.startLoading();
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: Using `Loading` in an embedded app is deprecated and will be removed in v5.0. Use `Loading` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/loading',
      );
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
