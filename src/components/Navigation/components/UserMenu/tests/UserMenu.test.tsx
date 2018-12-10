import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Modifier as UserMenuModifier} from '../../../../TopBar/components/UserMenu/context';
import UserMenu, {Props as UserMenuProps} from '../UserMenu';

describe('<UserMenu />', () => {
  const mockProps = {
    avatarInitials: '',
    avatarSource: '',
  };

  describe('avatarInitials', () => {
    it('gets passed into the modifier', () => {
      const avatarInitials = 'JD';
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} avatarInitials={avatarInitials} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({initials: avatarInitials}),
      );
    });
  });

  describe('avatarSource', () => {
    it('gets passed into the modifier', () => {
      const avatarSource = '';
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} avatarSource={avatarSource} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({avatar: avatarSource}),
      );
    });
  });

  describe('message', () => {
    it('gets passed into the modifier', () => {
      const message = {} as UserMenuProps['message'];
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} message={message} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({message}),
      );
    });
  });

  describe('actions', () => {
    it('gets passed into the modifier', () => {
      const actions = [] as UserMenuProps['actions'];
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} actions={actions} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({actions}),
      );
    });
  });

  describe('detail', () => {
    it('gets passed into the modifier', () => {
      const detail = 'Little Victories CA';
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} detail={detail} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({detail}),
      );
    });
  });

  describe('name', () => {
    it('gets passed into the modifier', () => {
      const name = 'John Doe';
      const userMenu = mountWithAppProvider(
        <UserMenu {...mockProps} name={name} />,
      );
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({name}),
      );
    });
  });

  describe('<UserMenuModifier />', () => {
    it('passes in an open prop which is false by default', () => {
      const userMenu = mountWithAppProvider(<UserMenu {...mockProps} />);
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({open: false}),
      );
    });

    it('toggles the open prop when the user menu is toggled', () => {
      const userMenu = mountWithAppProvider(<UserMenu {...mockProps} />);
      trigger(userMenu.find(UserMenuModifier), 'userMenuProps.onToggle');
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({open: true}),
      );
      trigger(userMenu.find(UserMenuModifier), 'userMenuProps.onToggle');
      expect(userMenu.find(UserMenuModifier).prop('userMenuProps')).toEqual(
        expect.objectContaining({open: false}),
      );
    });
  });
});
