import * as React from 'react';
import {Props as UserMenuProps} from '../UserMenu';

export interface UserMenuContextTypes {
  mobileView?: boolean;
  mobileUserMenuProps?: UserMenuProps;
  setMobileUserMenuProps?(props: UserMenuProps): void;
}

export default React.createContext<UserMenuContextTypes>({});
