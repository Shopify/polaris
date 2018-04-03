import * as React from 'react';
import {withProvider, WithProviderProps} from '../../components/Provider';
import {DisableableAction} from '../../types';

export type Width = 'large' | 'fullwidth';

export interface Props {
  /** The URL that will be loaded as the content of the modal */
  src: string;
  /** Whether the modal is open or not */
  open: boolean;
  /** The content for the title of the modal */
  title?: string;
  /** Controls the width of the modal (in pixels) */
  width?: Width;
  /** Controls the height of the modal (in pixels) */
  height?: number;
  /** Primary action for the modal */
  primaryAction?: DisableableAction;
  /** Collection of secondary action for the modal */
  secondaryActions?: DisableableAction[];
  /** Callback when the modal is closed */
  onClose(): void;
}

export class Modal extends React.PureComponent<
  Props & WithProviderProps,
  never
> {
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
    } else if (
      wasOpen &&
      !open &&
      this.focusReturnPoint != null &&
      document.contains(this.focusReturnPoint)
    ) {
      this.focusReturnPoint.focus();
      this.focusReturnPoint = null;
    }
  }

  render() {
    return null;
  }

  private handleEASDKMessaging() {
    const {open, polaris} = this.props;
    if (polaris.easdk == null) {
      return;
    }

    if (open) {
      polaris.easdk.Modal.open(this.props);
    } else {
      polaris.easdk.Modal.close();
    }
  }
}

export default withProvider()(Modal);
