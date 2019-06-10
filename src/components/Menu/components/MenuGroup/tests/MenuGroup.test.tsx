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

  describe('title', () => {
    it('is used as the content for the <Popover /> activator', () => {
      const mockTitle = 'mock title';
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} />,
      );

      expect(wrapper.find(MenuAction).prop('content')).toBe(mockTitle);
    });
  });

  describe('icon', () => {
    it('gets passed into <MenuAction />', () => {
      const mockIcon = SaveMinor;
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} icon={mockIcon} />,
      );

      expect(wrapper.find(MenuAction).prop('icon')).toBe(mockIcon);
    });
  });

  describe('details', () => {
    it('get rendered in the <Popover />', () => {
      const mockDetails = 'mock details';
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} details={mockDetails} />,
      );
      const popoverContents = getPopoverContents(wrapper);

      expect(popoverContents.text()).toContain(mockDetails);
    });
  });

  describe('actions', () => {
    it('get passed into the <ActionList />', () => {
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
  });

  describe('active', () => {
    it('gets passed into the <Popover />', () => {
      const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} active />);

      expect(wrapper.find(Popover).prop('active')).toBeTruthy();
    });
  });

  describe('onOpen()', () => {
    it('passes in the title when it triggers after an action', () => {
      const mockTitle = 'mock title';
      const onOpenSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} onOpen={onOpenSpy} />,
      );

      trigger(wrapper.find(MenuAction), 'onAction');

      expect(onOpenSpy).toHaveBeenCalledWith(mockTitle);
    });
  });

  describe('onClose()', () => {
    it('passes in the title when it triggers after the <Popover /> closes', () => {
      const mockTitle = 'mock title';
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} title={mockTitle} onClose={onCloseSpy} />,
      );

      trigger(wrapper.find(Popover), 'onClose');

      expect(onCloseSpy).toHaveBeenCalledWith(mockTitle);
    });

    it('passes in the title when it triggers after an action ', () => {
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

      expect(onCloseSpy).toHaveBeenCalledWith(mockTitle);
    });
  });
});

function noop() {}

function getPopoverContents(menuGroup: ReactWrapper) {
  return mountWithAppProvider(
    <div>{menuGroup.find(Popover).prop('children')}</div>,
  );
}
