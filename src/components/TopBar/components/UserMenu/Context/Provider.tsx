import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {UserMenuProps} from '../components';
import UserMenuContext, {UserMenuContextTypes} from './context';

interface Props {
  mobileView: boolean;
  children: React.ReactNode;
}

class Provider extends React.Component<Props, UserMenuContextTypes> {
  static getDerivedStateFromProps(
    {mobileView: nextMobileView}: Props,
    {mobileView}: UserMenuContextTypes,
  ) {
    if (nextMobileView !== mobileView) {
      return {mobileView: nextMobileView};
    }
    return null;
  }

  state = {
    /* eslint-disable react/no-unused-state */
    mobileView: this.props.mobileView,
    mobileUserMenuProps: undefined,
    setMobileUserMenuProps: this.setMobileUserMenuProps,
    /* eslint-enable react/no-unused-state */
  };

  render() {
    const {state} = this;
    const {children} = this.props;
    return (
      <UserMenuContext.Provider value={state}>
        {children}
      </UserMenuContext.Provider>
    );
  }

  @autobind
  private setMobileUserMenuProps(mobileUserMenuProps: UserMenuProps) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({mobileUserMenuProps});
  }
}

export default Provider;
