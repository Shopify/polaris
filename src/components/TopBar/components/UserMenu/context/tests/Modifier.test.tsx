import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import {UserMenuProps} from '../../components';
import UserMenuContext from '../context';
import Modifier from '../Modifier';

describe('<Modifier />', () => {
  const userMenuProps: UserMenuProps = {
    actions: [{items: [{icon: 'view'}]}],
    name: '',
    initials: '',
    open: false,
    onToggle: noop,
  };

  describe('userMenuProps', () => {
    it('sets the mobile user menu props', () => {
      const setMobileUserMenuPropsSpy = jest.fn();
      mountWithAppProvider(
        <UserMenuContext.Provider
          value={{
            setMobileUserMenuProps: setMobileUserMenuPropsSpy,
          }}
        >
          <Modifier userMenuProps={userMenuProps} />
        </UserMenuContext.Provider>,
      );
      expect(setMobileUserMenuPropsSpy).toHaveBeenCalledWith(userMenuProps);
    });
  });
});
