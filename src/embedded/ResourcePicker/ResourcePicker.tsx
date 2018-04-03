import * as React from 'react';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import {OpenOptions} from '../easdk/components/ResourcePicker';

export interface Props extends OpenOptions {
  /** Whether the picker is open or not */
  open: boolean;
}

export class ResourcePicker extends React.PureComponent<
  Props & WithAppProviderProps,
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
      polaris.easdk.ResourcePicker.open(this.props);
    } else {
      polaris.easdk.ResourcePicker.close();
    }
  }
}

export default withAppProvider()(ResourcePicker);
