import * as React from 'react';
import {withEASDK, WithEASDKProps} from '../easdk';

export interface Props {
  open: boolean,
  children?: string,
  title?: string,
  destructive?: boolean,
  confirmContent: string,
  cancelContent?: string,
  onCancel?(): void,
  onConfirm(): void,
}

export class Alert extends React.PureComponent<Props & WithEASDKProps, never> {
  private focusReturnPoint: HTMLElement | null = null;

  componentDidMount() {
    const {open} = this.props;
    if (open) {
      this.handleEASDKMessaging();
      this.focusReturnPoint = document.activeElement as HTMLElement;
    }
  }

  componentDidUpdate({open: wasOpen}: Props) {
    const {open} = this.props;

    if (wasOpen !== open) {
      this.handleEASDKMessaging();
    }

    if (!wasOpen && open) {
      this.focusReturnPoint = document.activeElement as HTMLElement;
    } else if (wasOpen && !open && this.focusReturnPoint != null && document.contains(this.focusReturnPoint)) {
      this.focusReturnPoint.focus();
      this.focusReturnPoint = null;
    }
  }

  // tslint:disable-next-line prefer-function-over-method
  render() {
    return null;
  }

  private handleEASDKMessaging() {
    const {open, easdk} = this.props;
    if (easdk == null) { return; }

    if (open) {
      easdk.Modal.alert(this.props);
    } else {
      easdk.Modal.close();
    }
  }
}

export default withEASDK()(Alert);
