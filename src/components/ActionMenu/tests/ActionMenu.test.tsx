import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import type {
  MenuGroupDescriptor,
  ActionListItemDescriptor,
} from '../../../types';
import {MenuGroup, RollupActions} from '../components';
import {ActionMenu, ActionMenuProps} from '../ActionMenu';
import {Button} from '../../Button';
import {ButtonGroup} from '../../ButtonGroup';

describe('<ActionMenu />', () => {
  const mockProps: ActionMenuProps = {
    actions: undefined,
    groups: undefined,
    rollup: undefined,
  };

  const mockActions: ActionMenuProps['actions'] = [
    {content: 'mock content 1'},
    {content: 'mock content 2'},
  ];

  it('does not render when there are no `actions` or `groups`', () => {
    const wrapper = mountWithAppProvider(<ActionMenu {...mockProps} />);
    expect(wrapper.find(MenuGroup)).toHaveLength(0);
  });

  describe('groups', () => {
    const mockActions: ActionMenuProps['actions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    const mockGroups: ActionMenuProps['groups'] = [
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
      const convertedSections = mockGroups.map((group) => {
        return {title: group.title, items: group.actions};
      });
      const wrapper = mountWithAppProvider(
        <ActionMenu {...mockProps} groups={mockGroups} rollup />,
      );

      expect(wrapper.find(RollupActions).prop('sections')).toStrictEqual(
        convertedSections,
      );
    });

    it('renders groups in their initial order when no indexes are set', () => {
      const wrapper = mountWithAppProvider(<ActionMenu groups={mockGroups} />);

      wrapper.find(MenuGroup).forEach((group, index) => {
        expect(group.props()).toMatchObject(mockGroups[index]);
      });
    });

    it('always renders a group if passed in', () => {
      const groups: MenuGroupDescriptor[] = [
        {
          title: 'Mock group 2',
          actions: [],
        },
      ];

      const wrapper = mountWithAppProvider(<ActionMenu groups={groups} />);

      expect(wrapper.find(MenuGroup)).toHaveLength(1);
    });
  });

  describe('<MenuGroup />', () => {
    it('does not render when there are no `groups`', () => {
      const wrapper = mountWithAppProvider(<ActionMenu {...mockProps} />);

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

  it('uses Button and ButtonGroup as subcomponents', () => {
    const wrapper = mountWithAppProvider(
      <ActionMenu {...mockProps} actions={mockActions} />,
    );

    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
  });

  it('action callbacks are passed through to Button', () => {
    const spy = jest.fn();
    const wrapper = mountWithAppProvider(
      <ActionMenu
        {...mockProps}
        actions={[{content: 'mock', onAction: spy}]}
      />,
    );

    trigger(wrapper.find(Button), 'onClick');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function fillMenuGroup(partialMenuGroup?: Partial<MenuGroupDescriptor>) {
  const mockAction: ActionListItemDescriptor = {
    content: 'mock content',
    url: 'https://shopify.ca',
  };

  return {
    title: 'mock menu group title',
    actions: [mockAction],
    ...partialMenuGroup,
  };
}
