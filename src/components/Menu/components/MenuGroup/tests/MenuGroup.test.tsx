import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {SaveMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';

import {Popover, ActionList} from 'components';
import MenuAction from '../../MenuAction';
import MenuGroup, {Props} from '../MenuGroup';

describe('<MenuGroup />', () => {
  const mockProps: Props = {
    title: '',
    actions: [],
    active: false,
    onOpen: noop,
    onClose: noop,
  };

  describe('<MenuAction />', () => {
    it('passes `title` as the `content` for the <Popover /> activator', () => {
      const mockTitle = 'mock title';
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} />,
      );

      expect(wrapper.find(MenuAction).prop('content')).toBe(mockTitle);
    });

    it('passes `accessibilityLabel`', () => {
      const mockAccessibilityLabel = 'mock a11y';
      const wrapper = mountWithAppProvider(
        <MenuGroup
          {...mockProps}
          accessibilityLabel={mockAccessibilityLabel}
        />,
      );

      expect(wrapper.find(MenuAction).prop('accessibilityLabel')).toBe(
        mockAccessibilityLabel,
      );
    });

    it('passes `icon`', () => {
      const mockIcon = SaveMinor;
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} icon={mockIcon} />,
      );

      expect(wrapper.find(MenuAction).prop('icon')).toBe(mockIcon);
    });

    it('passes `title` when `onOpen` triggers after an action', () => {
      const mockTitle = 'mock title';
      const onOpenSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} onOpen={onOpenSpy} />,
      );

      trigger(wrapper.find(MenuAction), 'onAction');

      expect(onOpenSpy).toHaveBeenCalledWith(mockTitle);
    });
  });

  describe('<Popover />', () => {
    it('passes `details`', () => {
      const mockDetails = 'mock details';
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} details={mockDetails} />,
      );
      const popoverContents = getPopoverContents(wrapper);

      expect(popoverContents.text()).toContain(mockDetails);
    });

    it('passes `active`', () => {
      const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} active />);

      expect(wrapper.find(Popover).prop('active')).toBeTruthy();
    });

    it('passes `actions` into the <ActionList />', () => {
      const mockActions: Props['actions'] = [
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} actions={mockActions} />,
      );
      const popoverContents = getPopoverContents(wrapper);

      expect(popoverContents.find(ActionList).prop('items')).toStrictEqual(
        mockActions,
      );
    });

    it('triggers `onClose` after the <Popover /> closes', () => {
      const mockTitle = 'mock title';
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} onClose={onCloseSpy} />,
      );

      trigger(wrapper.find(Popover), 'onClose');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClose` after an action ', () => {
      const mockTitle = 'mock title';
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup
          {...mockProps}
          title={mockTitle}
          active
          onClose={onCloseSpy}
        />,
      );

      trigger(wrapper.find(ActionList), 'onActionAnyItem');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function noop() {}

function getPopoverContents(menuGroup: ReactWrapper) {
  return mountWithAppProvider(
    <div>{menuGroup.find(Popover).prop('children')}</div>,
  );
}
