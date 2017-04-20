import * as React from 'react';
import {withEASDK, WithEASDKProps} from '../easdk';
import {DisableableAction} from '../../types';

export type Width = 'large' | 'fullwidth';

export interface Props {
  src: string,
  open: boolean,
  title?: string,
  width?: Width,
  height?: number,
  primaryAction?: DisableableAction,
  secondaryActions?: DisableableAction[],
  onClose(): void,
}

export class Modal extends React.PureComponent<Props & WithEASDKProps, never> {
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
      easdk.Modal.open(this.props);
    } else {
      easdk.Modal.close();
    }
  }
}

export default withEASDK()(Modal);
