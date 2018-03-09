import * as React from 'react';
import {withEASDK, WithEASDKProps} from '../easdk';

export interface Props {
  /** Whether the alert is open or not */
  open: boolean,
  /** The content to display inside the alert */
  children?: string,
  /** The alert title */
  title?: string,
  /** For confirming a destructive or dangerous action */
  destructive?: boolean,
  /** The content of the confirmation button */
  confirmContent: string,
  /** The content of the cancel button */
  cancelContent?: string,
  /** Callback when the confirmation button is clicked */
  onCancel?(): void,
  /** Callback when the alert is closed, or when the cancel button is clicked */
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
