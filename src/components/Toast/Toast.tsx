import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {FrameContext, frameContextTypes, ToastDescriptor} from '../types';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';

const createId = createUniqueIDFactory('Toast');

export type Props = ToastDescriptor;
export type ComposedProps = Props & WithAppProviderProps;

export class Toast extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  private id = createId();

  componentDidMount() {
    if (this.props.polaris.easdk == null) {
      this.context.frame.showToast({
        id: this.id,
        ...(this.props as Props),
      });
    } else {
      this.handleEASDKMessaging();
    }
  }

  componentWillUnmount() {
    this.context.frame.hideToast({id: this.id});
  }

  render() {
    return null;
  }

  private handleEASDKMessaging() {
    const {easdk} = this.props.polaris;

    if (!easdk) {
      return;
    }
    easdk.showFlashNotice('this.props');
  }
}

export default withAppProvider<Props>()(Toast);
