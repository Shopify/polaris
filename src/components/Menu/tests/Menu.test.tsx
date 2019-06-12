import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';

import {ActionListItemDescriptor, MenuGroupDescriptor} from '../../../types';
import {MenuAction, MenuGroup, RollupActions} from '../components';
import Menu, {Props, convertGroupToSection} from '../Menu';

describe('<Menu />', () => {
  const mockProps: Props = {
    actions: undefined,
    groups: undefined,
    rollup: undefined,
  };

  it('does not render when there are no `actions` or `groups`', () => {
    const wrapper = mountWithAppProvider(<Menu {...mockProps} />);
    expect(wrapper.find('div').exists()).toBe(false);
  });

  describe('actions', () => {
    const mockActions: Props['actions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    it('renders as <MenuAction /> when `rollup` is `false`', () => {
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} actions={mockActions} />,
      );

      expect(wrapper.find(MenuAction)).toHaveLength(mockActions.length);
    });

    it('does not render <MenuAction /> when there are no actions', () => {
      const wrapper = mountWithAppProvider(<Menu {...mockProps} />);

      expect(wrapper.find(MenuAction)).toHaveLength(0);
    });

    it('renders as <RollupActions /> `items` when `rollup` is `true`', () => {
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} actions={mockActions} rollup />,
      );

      expect(wrapper.find(RollupActions).prop('items')).toStrictEqual(
        mockActions,
      );
    });
  });

  describe('groups', () => {
    const mockActions: Props['actions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];
    const mockGroups: Props['groups'] = [
      {
        title: 'First group',
        actions: [...mockActions],
      },
      {
        title: 'Second group',
        actions: [...mockActions],
      },
    ];

    it('renders as <MenuGroup /> when `rollup` is `false`', () => {
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper.find(MenuGroup)).toHaveLength(mockGroups.length);
    });

    it('does not render <MenuGroup /> when there are no actions', () => {
      const wrapper = mountWithAppProvider(<Menu {...mockProps} />);

      expect(wrapper.find(MenuGroup)).toHaveLength(0);
    });

    it('renders as <RollupActions /> `sections` when `rollup` is `true`', () => {
      const convertedSections = mockGroups.map((group) =>
        convertGroupToSection(group),
      );
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} groups={mockGroups} rollup />,
      );

      expect(wrapper.find(RollupActions).prop('sections')).toStrictEqual(
        convertedSections,
      );
    });
  });

  describe('<MenuGroup />', () => {
    it('is inactive by default', () => {
      const mockGroups = [fillMenuGroup()];
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper.find(MenuGroup).prop('active')).toBeFalsy();
    });

    it('becomes active when opened', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} groups={mockGroups} />,
      );

      trigger(wrapper.find(MenuGroup), 'onOpen', mockTitle);

      expect(wrapper.find(MenuGroup).prop('active')).toBeTruthy();
    });

    it('becomes inactive when closed', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithAppProvider(
        <Menu {...mockProps} groups={mockGroups} />,
      );

      trigger(wrapper.find(MenuGroup), 'onOpen', mockTitle);
      trigger(wrapper.find(MenuGroup), 'onClose', mockTitle);

      expect(wrapper.find(MenuGroup).prop('active')).toBeFalsy();
    });
  });
});

function fillMenuGroup(partialMenuGroup?: Partial<MenuGroupDescriptor>) {
  const mockAction: ActionListItemDescriptor = {
    content: 'mock content',
    url: 'https://shopify.ca',
    target: 'REMOTE',
  };

  return {
    title: 'mock menu group title',
    actions: [mockAction],
    ...partialMenuGroup,
  };
}
