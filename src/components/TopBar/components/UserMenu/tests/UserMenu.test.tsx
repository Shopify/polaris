import * as React from 'react';
import {ViewMinor} from '@shopify/polaris-icons';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import {UserMenuContext} from '../context';
import {UserMenu as UserMenuComponent, UserMenuProps} from '../components';
import UserMenu from '../UserMenu';

describe('<UserMenu />', () => {
  describe('<UserMenuConsumer />', () => {
    const userMenuProps: UserMenuProps = {
      actions: [{items: [{icon: ViewMinor}]}],
      name: '',
      initials: '',
      open: false,
      onToggle: noop,
    };

    it('renders with the given props', () => {
      const userMenu = mountWithAppProvider(
        <UserMenuContext.Provider
          value={{
            mobileView: false,
            mobileUserMenuProps: undefined,
          }}
        >
          <UserMenu {...userMenuProps} />
        </UserMenuContext.Provider>,
      );
      expect(userMenu.find(UserMenuComponent).props()).toEqual(userMenuProps);
    });

    it('renders with the given props when in mobile view but no mobile props are available', () => {
      const userMenu = mountWithAppProvider(
        <UserMenuContext.Provider
          value={{
            mobileView: true,
            mobileUserMenuProps: undefined,
          }}
        >
          <UserMenu {...userMenuProps} />
        </UserMenuContext.Provider>,
      );
      expect(userMenu.find(UserMenuComponent).props()).toEqual(userMenuProps);
    });

    it('renders with the given props when mobile props are available but not in mobile view', () => {
      const mobileUserMenuProps = {...userMenuProps, initials: 'JD'};
      const userMenu = mountWithAppProvider(
        <UserMenuContext.Provider
          value={{
            mobileView: false,
            mobileUserMenuProps,
          }}
        >
          <UserMenu {...userMenuProps} />
        </UserMenuContext.Provider>,
      );
      expect(userMenu.find(UserMenuComponent).props()).toEqual(userMenuProps);
    });

    it('renders with the mobile props when available and in mobile view', () => {
      const mobileUserMenuProps = {...userMenuProps, initials: 'JD'};
      const userMenu = mountWithAppProvider(
        <UserMenuContext.Provider
          value={{
            mobileView: true,
            mobileUserMenuProps,
          }}
        >
          <UserMenu {...userMenuProps} />
        </UserMenuContext.Provider>,
      );
      expect(userMenu.find(UserMenuComponent).props()).toEqual(
        mobileUserMenuProps,
      );
    });
  });
});
