import React from 'react';
import './ScrollLock.scss';
import {
  WithAppProviderProps,
  withAppProvider,
} from '../../utilities/with-app-provider';

export interface ScrollLockProps {}

type CombinedProps = ScrollLockProps & WithAppProviderProps;
class ScrollLock extends React.Component<CombinedProps, never> {
  componentDidMount() {
    const {scrollLockManager} = this.props.polaris;
    scrollLockManager.registerScrollLock();
  }

  componentWillUnmount() {
    const {scrollLockManager} = this.props.polaris;
    scrollLockManager.unregisterScrollLock();
  }

  render() {
    return null;
  }
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<ScrollLockProps>()(ScrollLock);
