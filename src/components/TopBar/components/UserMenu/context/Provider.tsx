import * as React from 'react';
import isEqual from 'lodash/isEqual';
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

  constructor(props: Props) {
    super(props);
    this.setMobileUserMenuProps = this.setMobileUserMenuProps.bind(this);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      mobileView: props.mobileView,
      mobileUserMenuProps: undefined,
      // eslint-disable-next-line react/no-unused-state
      setMobileUserMenuProps: this.setMobileUserMenuProps,
    };
  }

  render() {
    const {state} = this;
    const {children} = this.props;
    return (
      <UserMenuContext.Provider value={state}>
        {children}
      </UserMenuContext.Provider>
    );
  }

  private setMobileUserMenuProps(mobileUserMenuProps: UserMenuProps) {
    const {mobileUserMenuProps: prevMobileUserMenuProps} = this.state;
    if (isEqual(mobileUserMenuProps, prevMobileUserMenuProps)) {
      return;
    }
    this.setState({mobileUserMenuProps});
  }
}

export default Provider;
