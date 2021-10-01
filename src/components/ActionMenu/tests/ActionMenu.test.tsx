import React from 'react';
import {mountWithApp} from 'test-utilities';

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
    const wrapper = mountWithApp(<ActionMenu {...mockProps} />);
    expect(wrapper.findAll(MenuGroup)).toHaveLength(0);
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
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper.findAll(MenuGroup)).toHaveLength(mockGroups.length);
    });

    it('renders as <RollupActions /> `sections` when `rollup` is `true`', () => {
      const convertedSections = mockGroups.map((group) => {
        return {title: group.title, items: group.actions};
      });
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} rollup />,
      );

      expect(wrapper).toContainReactComponent(RollupActions, {
        sections: convertedSections,
      });
    });

    it('renders groups in their initial order when no indexes are set', () => {
      const wrapper = mountWithApp(<ActionMenu groups={mockGroups} />);

      wrapper.findAll(MenuGroup).forEach((group, index) => {
        expect(group.props).toMatchObject(mockGroups[index]);
      });
    });

    it('always renders a group if passed in', () => {
      const groups: MenuGroupDescriptor[] = [
        {
          title: 'Mock group 2',
          actions: [],
        },
      ];

      const wrapper = mountWithApp(<ActionMenu groups={groups} />);

      expect(wrapper.findAll(MenuGroup)).toHaveLength(1);
    });
  });

  describe('<MenuGroup />', () => {
    it('does not render when there are no `groups`', () => {
      const wrapper = mountWithApp(<ActionMenu {...mockProps} />);

      expect(wrapper).not.toContainReactComponent(MenuGroup);
    });

    it('is inactive by default', () => {
      const mockGroups = [fillMenuGroup()];
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      expect(wrapper).toContainReactComponent(MenuGroup, {
        active: false,
      });
    });

    it('becomes active when opened', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      wrapper.find(MenuGroup)!.trigger('onOpen', mockTitle);

      expect(wrapper).toContainReactComponent(MenuGroup, {
        active: true,
      });
    });

    it('becomes inactive when closed', () => {
      const mockTitle = 'mock title';
      const mockGroups = [fillMenuGroup({title: mockTitle})];
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );

      wrapper.find(MenuGroup)!.trigger('onOpen', mockTitle);
      wrapper.find(MenuGroup)!.trigger('onClose', mockTitle);

      expect(wrapper).toContainReactComponent(MenuGroup, {
        active: false,
      });
    });
  });

  it('uses Button and ButtonGroup as subcomponents', () => {
    const wrapper = mountWithApp(
      <ActionMenu {...mockProps} actions={mockActions} />,
    );

    expect(wrapper.findAll(Button)).toHaveLength(2);
    expect(wrapper.findAll(ButtonGroup)).toHaveLength(1);
  });

  it('action callbacks are passed through to Button', () => {
    const spy = jest.fn();
    const wrapper = mountWithApp(
      <ActionMenu
        {...mockProps}
        actions={[{content: 'mock', onAction: spy}]}
      />,
    );

    wrapper.find(Button)!.trigger('onClick');

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
