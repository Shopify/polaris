import React from 'react';
import type {CustomRoot} from 'tests/utilities';
import {mountWithApp} from 'tests/utilities';

import type {
  MenuGroupDescriptor,
  ActionListItemDescriptor,
} from '../../../types';
// eslint-disable-next-line @shopify/strict-component-boundaries
import type {getVisibleAndHiddenActionsIndices} from '../components/Actions/utilities';
import {MenuGroup, RollupActions, Actions} from '../components';
import {ActionMenu} from '../ActionMenu';
import type {ActionMenuProps} from '../ActionMenu';
import {Button} from '../../Button';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {ActionsMeasurer} from '../components/Actions/components';

jest.mock('../components/Actions/components/ActionsMeasurer', () => ({
  ActionsMeasurer: function ActionsMeasurer() {
    return null;
  },
}));

jest.mock('../components/Actions/utilities', () => ({
  ...jest.requireActual('../components/Actions/utilities'),
  getVisibleAndHiddenActionsIndices: jest.fn(),
}));

function mockGetVisibleAndHiddenActionsIndices(
  args: ReturnType<typeof getVisibleAndHiddenActionsIndices>,
) {
  const getVisibleAndHiddenActionsIndices: jest.Mock = jest.requireMock(
    '../components/Actions/utilities',
  ).getVisibleAndHiddenActionsIndices;

  getVisibleAndHiddenActionsIndices.mockReturnValue(args);
}

const mockAllVisible = {
  visibleActions: [0, 1],
  visibleGroups: [0, 1],
  hiddenActions: [],
  hiddenGroups: [],
};

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

  beforeEach(() => {
    mockGetVisibleAndHiddenActionsIndices(mockAllVisible);
  });

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

    const mockDisabledGroup = {
      title: 'Disabled group',
      disabled: true,
      actions: [...mockActions],
    };

    const mockGroupsWithDisabledGroup = [...mockGroups, mockDisabledGroup];

    it('renders as <MenuGroup /> when `rollup` is `false`', () => {
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroups} />,
      );
      forceMeasurement(wrapper);

      expect(wrapper.findAll(MenuGroup)).toHaveLength(mockGroups.length);
    });

    it('renders disabled groups when `rollup` is `false`', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0, 1],
        visibleGroups: [0, 1, 2],
        hiddenActions: [],
        hiddenGroups: [],
      });

      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} groups={mockGroupsWithDisabledGroup} />,
      );

      forceMeasurement(wrapper);

      expect(wrapper.findAll(MenuGroup)).toHaveLength(
        mockGroupsWithDisabledGroup.length,
      );
      expect(wrapper).toContainReactComponent(MenuGroup, {disabled: true});
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

    it('shows action group items as disabled when `rollup` is `true` and action group is disabled', () => {
      const convertedSections = mockGroupsWithDisabledGroup.map((group) => {
        return {
          title: group.title,
          items: group.disabled
            ? group.actions.map((action) => ({
                ...action,
                disabled: group.disabled,
              }))
            : group.actions,
        };
      });
      const wrapper = mountWithApp(
        <ActionMenu
          {...mockProps}
          groups={mockGroupsWithDisabledGroup}
          rollup
        />,
      );

      expect(wrapper).toContainReactComponent(RollupActions, {
        sections: convertedSections,
      });
    });

    it('renders groups in their initial order when no indexes are set', () => {
      const wrapper = mountWithApp(<ActionMenu groups={mockGroups} />);

      forceMeasurement(wrapper);

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

      forceMeasurement(wrapper);

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

      forceMeasurement(wrapper);

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

      forceMeasurement(wrapper);

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

      forceMeasurement(wrapper);

      wrapper.find(MenuGroup)!.trigger('onOpen', mockTitle);
      wrapper.find(MenuGroup)!.trigger('onClose', mockTitle);

      expect(wrapper).toContainReactComponent(MenuGroup, {
        active: false,
      });
    });
  });

  describe('<Actions />', () => {
    it('uses Button as subcomponents', () => {
      const wrapper = mountWithApp(
        <ActionMenu {...mockProps} actions={mockActions} />,
      );
      forceMeasurement(wrapper);

      expect(wrapper.findAll(Button)).toHaveLength(2);
    });

    it('passes action callbacks through to Button', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <ActionMenu
          {...mockProps}
          actions={[{content: 'mock', onAction: spy}]}
        />,
      );

      forceMeasurement(wrapper);

      wrapper.find(Button)!.trigger('onClick');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('passes `onActionRollup` if set', () => {
      const onActionRollup = jest.fn();
      const wrapper = mountWithApp(
        <ActionMenu
          {...mockProps}
          actions={[{content: 'mock'}]}
          onActionRollup={onActionRollup}
        />,
      );

      expect(wrapper).toContainReactComponent(Actions, {
        onActionRollup,
      });
    });
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

function forceMeasurement(wrapper: CustomRoot<any, any>) {
  wrapper.act(() => {
    wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
      containerWidth: 100,
      disclosureWidth: 100,
      hiddenActionsWidths: [100],
    });
  });
}
