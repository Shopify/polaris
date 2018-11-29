import * as React from 'react';
import {Consumer as UserMenuConsumer} from './context';
import {UserMenu as UserMenuComponent, UserMenuProps} from './components';

export default function UserMenu(props: UserMenuProps) {
  return (
    <UserMenuConsumer>
      {({mobileUserMenuProps, mobileView}) => {
        if (mobileUserMenuProps && mobileView) {
          return <UserMenuComponent {...mobileUserMenuProps} />;
        }
        return <UserMenuComponent {...props} />;
      }}
    </UserMenuConsumer>
  );
}
