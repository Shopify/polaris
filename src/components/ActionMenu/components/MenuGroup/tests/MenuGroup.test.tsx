import React from 'react';
import {SaveMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  ReactWrapper,
} from 'test-utilities/legacy';
import {Popover, ActionList, Button} from 'components';

import {MenuAction} from '../../MenuAction';
import {MenuGroup} from '../MenuGroup';

describe('<MenuGroup />', () => {
  const mockProps = {
    title: 'title',
    actions: [{content: 'mock content 1'}],
    active: undefined,
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
      const mockActions = [
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
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} onClose={onCloseSpy} />,
      );

      trigger(wrapper.find(Popover), 'onClose');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClose` after an action', () => {
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

  describe('newDesignLanguage', () => {
    it('uses Button instead of MenuAction as subcomponents', () => {
      const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} />, {
        features: {newDesignLanguage: true},
      });

      expect(wrapper.find(Button)).toHaveLength(1);
      expect(wrapper.find(MenuAction)).toHaveLength(0);
    });

    it('uses MenuAction instead of Button as subcomponents when disabled', () => {
      const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} />, {
        features: {newDesignLanguage: false},
      });

      expect(wrapper.find(MenuAction)).toHaveLength(1);
      expect(wrapper.find(Button)).toHaveLength(0);
    });
  });
});

function noop() {}

function getPopoverContents(menuGroup: ReactWrapper) {
  return mountWithAppProvider(
    <div>{menuGroup.find(Popover).prop('children')}</div>,
  );
}
