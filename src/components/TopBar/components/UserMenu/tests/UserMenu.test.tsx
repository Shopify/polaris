import React from 'react';
import {ViewMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {UserMenu} from '../UserMenu';
import {Menu} from '../../Menu';

describe('<UserMenu />', () => {
  const userMenuProps = {
    actions: [{items: [{icon: ViewMinor}]}],
    name: '',
    initials: '',
    open: false,
    onToggle: noop,
  };

  it('renders with the given props', () => {
    const userMenu = mountWithAppProvider(<UserMenu {...userMenuProps} />);
    expect(userMenu.find(UserMenu).props()).toStrictEqual(userMenuProps);
  });

  it('renders with the given props when in mobile view but no mobile props are available', () => {
    const userMenu = mountWithAppProvider(<UserMenu {...userMenuProps} />);
    expect(userMenu.find(UserMenu).props()).toStrictEqual(userMenuProps);
  });

  it('passes accessibilityLabel to the menu component', () => {
    const userMenu = mountWithApp(
      <UserMenu {...userMenuProps} accessibilityLabel="User menu" />,
    );

    expect(userMenu).toContainReactComponent(Menu, {
      accessibilityLabel: 'User menu',
    });
  });
});

function noop() {}
