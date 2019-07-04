import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import {MenuActionDescriptor, MenuGroupDescriptor} from '../../../types';
import {MenuAction, MenuGroup, RollupActions} from '../components';
import ActionMenu, {Props, convertGroupToSection} from '../ActionMenu';

describe('<ActionMenu />', () => {
  const mockProps: Props = {
    actions: undefined,
    groups: undefined,
    rollup: undefined,
  };

  it('does not render when there are no `actions` or `groups`', () => {
    const wrapper = mountWithAppProvider(<ActionMenu {...mockProps} />);
    expect(wrapper.find('div').exists()).toBe(false);
  });

  describe('actions', () => {
    const mockActions: Props['actions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    it('renders as <MenuAction /> when `rollup` is `false`', () => {
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} actions={mockActions} />,
      );

      expect(wrapper.find(MenuAction)).toHaveLength(mockActions.length);
    });

    it('renders as <RollupActions /> `items` when `rollup` is `true`', () => {
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} actions={mockActions} rollup />,
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
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper.find(MenuGroup)).toHaveLength(mockGroups.length);
    });

    it('renders as <RollupActions /> `sections` when `rollup` is `true`', () => {
      const convertedSections = mockGroups.map((group) =>
        convertGroupToSection(group),
      );
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroups} rollup />,
      );

      expect(wrapper.find(RollupActions).prop('sections')).toStrictEqual(
        convertedSections,
      );
    });
  });

  describe('<MenuAction />', () => {
    const mockActions: Props['actions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    it('does not render <MenuAction /> when there are no `actions`', () => {
      const wrapper = mountWithAppProvider(<ActionMenu {...mockProps} />);

      expect(wrapper.find(MenuAction)).toHaveLength(0);
    });

    it('renders `actions`', () => {
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} actions={mockActions} />,
      );

      expect(wrapper.find(MenuAction)).toHaveLength(2);
    });
  });

  describe('<MenuGroup />', () => {
    it('does not render when there are no `groups`', () => {
      const wrapper = mountWithAppProvider(<ActionMenu {...mockProps} />);

      expect(wrapper.find(MenuGroup)).toHaveLength(0);
    });

    it('does not render when there are `groups` with no `actions`', () => {
      const mockGroupsWithoutActions: Props['groups'] = [
        {
          title: 'First group',
          actions: [],
        },
        {
          title: 'Second group',
          actions: [],
        },
      ];
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroupsWithoutActions} />,
      );

      expect(wrapper.find(MenuGroup)).toHaveLength(0);
    });

    it('is inactive by default', () => {
      const mockGroups = [fillMenuGroup()];
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper.find(MenuGroup).prop('active')).toBeFalsy();
    });

    it('becomes active when opened', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      trigger(wrapper.find(MenuGroup), 'onOpen', mockTitle);

      expect(wrapper.find(MenuGroup).prop('active')).toBeTruthy();
    });

    it('becomes inactive when closed', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      trigger(wrapper.find(MenuGroup), 'onOpen', mockTitle);
      trigger(wrapper.find(MenuGroup), 'onClose', mockTitle);

      expect(wrapper.find(MenuGroup).prop('active')).toBeFalsy();
    });
  });
});

function fillMenuGroup(partialMenuGroup?: Partial<MenuGroupDescriptor>) {
  const mockAction: MenuActionDescriptor = {
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
