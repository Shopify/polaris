import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Props as UserMenuProps} from './UserMenu';

export interface UserMenuContext {
  mobileView?: boolean;
  mobileUserMenuProps?: UserMenuProps;
  setMobileUserMenuProps?(props: UserMenuProps): void;
}

interface ProviderProps {
  mobileView: boolean;
  children: React.ReactNode;
}

const UserMenuContext = React.createContext<UserMenuContext>({});

export const Consumer = UserMenuContext.Consumer;

export class Provider extends React.Component<ProviderProps, UserMenuContext> {
  static getDerivedStateFromProps(
    {mobileView: nextMobileView}: ProviderProps,
    {mobileView}: UserMenuContext,
  ) {
    if (nextMobileView !== mobileView) {
      return {mobileView: nextMobileView};
    }
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
