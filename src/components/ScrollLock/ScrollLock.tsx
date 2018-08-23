import * as React from 'react';
import './ScrollLock.scss';
import {polarisAppProviderContextTypes} from '../AppProvider';

export default class ScrollLock extends React.Component<{}, never> {
  static contextTypes = polarisAppProviderContextTypes;

  componentDidMount() {
    const {scrollLockManager} = this.context.polaris;
    scrollLockManager.registerScrollLock();
  }

  componentWillUnmount() {
    const {scrollLockManager} = this.context.polaris;
    scrollLockManager.unregisterScrollLock();
  }

  render() {
    return null;
  }
}
