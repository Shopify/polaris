import React, {useCallback, useState} from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionMenu} from '../../..';
import type {ActionMenuProps} from '../../..';
import {Actions, MenuGroup, RollupActions, SecondaryAction} from '../..';
import {Tooltip} from '../../../../Tooltip';
import type {getVisibleAndHiddenActionsIndices} from '../utilities';
import {ActionsMeasurer} from '../components';

jest.mock('../components/ActionsMeasurer', () => ({
  ActionsMeasurer() {
    return null;
  },
}));

jest.mock('../utilities', () => ({
  ...jest.requireActual('../utilities'),
  getVisibleAndHiddenActionsIndices: jest.fn(),
}));

function mockGetVisibleAndHiddenActionsIndices(
  args: ReturnType<typeof getVisibleAndHiddenActionsIndices>,
) {
  const getVisibleAndHiddenActionsIndices: jest.Mock =
    jest.requireMock('../utilities').getVisibleAndHiddenActionsIndices;

  getVisibleAndHiddenActionsIndices.mockReturnValue(args);
}

describe('<Actions />', () => {
  const mockProps: ActionMenuProps = {
    actions: undefined,
    groups: undefined,
    rollup: undefined,
  };
  const mockActions: ActionMenuProps['actions'] = [
    {content: 'mock content 1'},
    {content: 'mock content 2'},
  ];

  it('renders as <RollupActions /> `items` when `rollup` is `true`', () => {
    const wrapper = mountWithApp(
      <ActionMenu {...mockProps} actions={mockActions} rollup />,
    );

    expect(wrapper).toContainReactComponent(RollupActions, {
      items: mockActions,
    });
  });

  describe('Actions', () => {
    it('renders SecondaryActions', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0, 1, 2],
        visibleGroups: [],
        hiddenActions: [],
        hiddenGroups: [],
      });
      const actionsBeforeOverriddenOrder: ActionMenuProps['actions'] = [
        {content: 'mock content 0'},
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];

      const wrapper = mountWithApp(
        <ActionMenu actions={actionsBeforeOverriddenOrder} />,
      );

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      expect(wrapper.findAll(SecondaryAction)).toHaveLength(3);
    });

    it('renders a <Tooltip /> when helpText is set on an action', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0],
        visibleGroups: [],
        hiddenActions: [],
        hiddenGroups: [],
      });
      const toolTipAction = {
        content: 'Refund',
        helpText:
          'You need permission from your store administrator to issue refunds.',
      };

      const wrapper = mountWithApp(<ActionMenu actions={[toolTipAction]} />);

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      const action = wrapper.find(SecondaryAction);

      expect(action).toContainReactComponent(Tooltip, {
        content: toolTipAction.helpText,
      });
    });

    it('renders a MenuGroup', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [],
        visibleGroups: [0],
        hiddenActions: [],
        hiddenGroups: [],
      });
      const wrapper = mountWithApp(
        <ActionMenu groups={[{title: 'group', actions: []}]} />,
      );

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      expect(wrapper.findAll(MenuGroup)).toHaveLength(1);
    });

    it('updates actions when they change', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0, 1],
        visibleGroups: [],
        hiddenActions: [],
        hiddenGroups: [],
      });
      function ActionsWithToggle() {
        const initialActions: ActionMenuProps['actions'] = [
          {content: 'initial'},
        ];

        const [actions, setActions] = useState(initialActions);
        const handleActivatorClick = useCallback(
          () => setActions([{content: 'updated'}]),
          [],
        );

        return (
          <>
            <button onClick={handleActivatorClick}>Activator</button>
            <Actions actions={actions} />
          </>
        );
      }

      const wrapper = mountWithApp(<ActionsWithToggle />);

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(SecondaryAction, {
        children: 'updated',
      });
    });

    it('updates groups when they change', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [],
        visibleGroups: [0, 1],
        hiddenActions: [],
        hiddenGroups: [],
      });
      function ActionsWithToggle() {
        const initialGroups: ActionMenuProps['groups'] = [
          {title: 'initial', actions: [{content: 'initial'}]},
        ];

        const [groups, setGroups] = useState(initialGroups);
        const handleActivatorClick = useCallback(
          () =>
            setGroups([{title: 'updated', actions: [{content: 'updated'}]}]),
          [],
        );

        return (
          <>
            <button onClick={handleActivatorClick}>Activator</button>
            <Actions groups={groups} />
          </>
        );
      }

      const wrapper = mountWithApp(<ActionsWithToggle />);

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(MenuGroup, {
        title: 'updated',
        actions: [{content: 'updated'}],
      });
    });

    it('updates actions when their lengths change', () => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0, 1],
        visibleGroups: [],
        hiddenActions: [],
        hiddenGroups: [],
      });
      function ActionsWithToggle() {
        const initialActions: ActionMenuProps['actions'] = [
          {content: 'initial'},
        ];

        const [actions, setActions] = useState(initialActions);
        const handleActivatorClick = useCallback(
          () => setActions([{content: 'updated 0'}, {content: 'updated 1'}]),
          [],
        );

        return (
          <>
            <button onClick={handleActivatorClick}>Activator</button>
            <Actions actions={actions} />
          </>
        );
      }

      const wrapper = mountWithApp(<ActionsWithToggle />);

      wrapper.act(() => {
        wrapper.find(ActionsMeasurer)!.trigger('handleMeasurement', {
          containerWidth: 100,
          disclosureWidth: 100,
          hiddenActionsWidths: [100],
        });
      });

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 1);

      wrapper.find('button')!.trigger('onClick');

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 2);
    });
  });
});
