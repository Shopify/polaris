import React from 'react';
import {ViewMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'test-utilities';
import {Avatar} from 'components/Avatar';

import {NotificationsMenu} from '../NotificationsMenu';
import {Menu} from '../../Menu';

describe('<NotificationsMenu />', () => {
  const notificationsMenuProps = {
    actions: [{items: [{icon: ViewMinor}]}],
    name: '',
    initials: '',
    open: false,
    onToggle: noop,
  };

  it('renders with the given props', () => {
    const userMenu = mountWithApp(
      <NotificationsMenu {...notificationsMenuProps} />,
    );

    expect(userMenu).toContainReactComponent(Menu, {
      actions: notificationsMenuProps.actions,
      open: notificationsMenuProps.open,
      onOpen: notificationsMenuProps.onToggle,
      onClose: notificationsMenuProps.onToggle,
    });
    expect(userMenu).toContainReactComponent('p', {
      children: notificationsMenuProps.name,
    });
    expect(userMenu).toContainReactComponent(Avatar, {
      initials: notificationsMenuProps.initials,
    });
  });

  it('renders with the given props when in mobile view but no mobile props are available', () => {
    const userMenu = mountWithApp(
      <NotificationsMenu {...notificationsMenuProps} />,
    );

    expect(userMenu).toContainReactComponent(Menu, {
      actions: notificationsMenuProps.actions,
      open: notificationsMenuProps.open,
      onOpen: notificationsMenuProps.onToggle,
      onClose: notificationsMenuProps.onToggle,
    });
    expect(userMenu).toContainReactComponent('p', {
      children: notificationsMenuProps.name,
    });
    expect(userMenu).toContainReactComponent(Avatar, {
      initials: notificationsMenuProps.initials,
    });
  });

  it('passes accessibilityLabel to the menu component', () => {
    const userMenu = mountWithApp(
      <NotificationsMenu
        {...notificationsMenuProps}
        accessibilityLabel="User menu"
      />,
    );

    expect(userMenu).toContainReactComponent(Menu, {
      accessibilityLabel: 'User menu',
    });
  });
});

function noop() {}
