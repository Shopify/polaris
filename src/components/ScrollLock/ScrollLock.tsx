import React from 'react';
import './ScrollLock.scss';
import {
  WithAppProviderProps,
  withAppProvider,
} from '../../utilities/with-app-provider';

export interface Props {}

type CombinedProps = Props & WithAppProviderProps;
class ScrollLock extends React.Component<CombinedProps, never> {
  componentDidMount() {
    const {scrollLockManager} = this.props.polaris;
    if (!scrollLockManager) return;
    scrollLockManager.registerScrollLock();
  }

  componentWillUnmount() {
    const {scrollLockManager} = this.props.polaris;
    if (!scrollLockManager) return;
    scrollLockManager.unregisterScrollLock();
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(ScrollLock);
