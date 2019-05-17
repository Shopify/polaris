import React from 'react';
import './ScrollLock.scss';
import {WithAppProviderProps, withAppProvider} from '../AppProvider';

export interface Props {}

type CombinedProps = Props & WithAppProviderProps;
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

export default withAppProvider<Props>()(ScrollLock);
