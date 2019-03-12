import * as React from 'react';
import {UserMenuProps} from '../components';

export interface UserMenuContextTypes {
  mobileView?: boolean;
  mobileUserMenuProps?: UserMenuProps;
  setMobileUserMenuProps?(props: UserMenuProps): void;
}

export default React.createContext<UserMenuContextTypes>({});
