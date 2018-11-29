import * as React from 'react';
import withContext from '../../../WithContext';
import {WithContextTypes} from '../../../../types';
import {Consumer as UserMenuConsumer, UserMenuContextTypes} from './context';
import {UserMenu as UserMenuComponent, UserMenuProps} from './components';

type ComposedProps = UserMenuProps & WithContextTypes<UserMenuContextTypes>;

function UserMenu({
  context: {mobileUserMenuProps, mobileView},
  ...userMenuProps
}: ComposedProps) {
  if (mobileUserMenuProps && mobileView) {
    return <UserMenuComponent {...mobileUserMenuProps} />;
  }
  return <UserMenuComponent {...userMenuProps} />;
}

export default withContext<UserMenuProps, {}, UserMenuContextTypes>(
  UserMenuConsumer,
)(UserMenu);
