import React, {useCallback, useState} from 'react';
import type {CustomRoot} from 'tests/utilities';
import {mountWithApp} from 'tests/utilities';

import {ActionMenu} from '../../..';
import type {ActionMenuProps} from '../../..';
import {Actions, MenuGroup, RollupActions, SecondaryAction} from '../..';
import {Tooltip} from '../../../../Tooltip';
import type {getVisibleAndHiddenActionsIndices} from '../utilities';
import {ActionsMeasurer} from '../components';
import styles from '../Actions.module.scss';

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
    beforeEach(() => {
      mockGetVisibleAndHiddenActionsIndices({
        visibleActions: [0, 1, 2],
        visibleGroups: [0, 1, 2],
        hiddenActions: [],
        hiddenGroups: [],
      });
    });

    it('renders SecondaryActions', () => {
      const actionsBeforeOverriddenOrder: ActionMenuProps['actions'] = [
        {content: 'mock content 0'},
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];

      const wrapper = mountWithApp(
        <ActionMenu actions={actionsBeforeOverriddenOrder} />,
      );

      const wrappingDiv = findWrapper(wrapper);

      forceMeasurement(wrapper);

      expect(wrappingDiv!.findAll(SecondaryAction)).toHaveLength(3);
    });

    it('renders a <Tooltip /> when helpText is set on an action', () => {
      const toolTipAction = {
        content: 'Refund',
        helpText:
          'You need permission from your store administrator to issue refunds.',
      };

      const wrapper = mountWithApp(<ActionMenu actions={[toolTipAction]} />);

      forceMeasurement(wrapper);

      const action = wrapper.find(SecondaryAction);

      expect(action).toContainReactComponent(Tooltip, {
        content: toolTipAction.helpText,
      });
    });

    it('renders a MenuGroup', () => {
      const wrapper = mountWithApp(
        <ActionMenu groups={[{title: 'group', actions: []}]} />,
      );

      forceMeasurement(wrapper);

      expect(wrapper.findAll(MenuGroup)).toHaveLength(1);
    });

    it('updates actions when they change', () => {
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

      forceMeasurement(wrapper);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(SecondaryAction, {
        children: 'updated',
      });
    });

    it('updates groups when they change', () => {
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

      forceMeasurement(wrapper);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(MenuGroup, {
        title: 'updated',
        actions: [{content: 'updated'}],
      });
    });

    it('updates actions when their lengths change', () => {
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

      forceMeasurement(wrapper);

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 1);

      wrapper.find('button')!.trigger('onClick');

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 2);
    });
  });

  it('hides actions when they match the hiddenActions value', () => {
    mockGetVisibleAndHiddenActionsIndices({
      visibleActions: [0, 1],
      visibleGroups: [],
      hiddenActions: [2],
      hiddenGroups: [],
    });

    const wrapper = mountWithApp(
      <ActionMenu
        actions={[
          {content: 'mock content 0'},
          {content: 'mock content 1'},
          {content: 'mock content 2'},
        ]}
      />,
    );

    forceMeasurement(wrapper);

    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'mock content 0',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'mock content 1',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'More actions',
    });
    expect(wrapper).not.toContainReactComponent(SecondaryAction, {
      children: 'mock content 2',
    });
  });

  it('filters out values from the hiddenActions array if they do not match the actions array', () => {
    mockGetVisibleAndHiddenActionsIndices({
      visibleActions: [0, 1],
      visibleGroups: [],
      hiddenActions: [2, 3, 4, 5],
      hiddenGroups: [],
    });

    const wrapper = mountWithApp(
      <ActionMenu
        actions={[
          {content: 'mock content 0'},
          {content: 'mock content 1'},
          {content: 'mock content 2'},
        ]}
      />,
    );

    forceMeasurement(wrapper);

    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'mock content 0',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'mock content 1',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'More actions',
    });
    expect(wrapper).not.toContainReactComponent(SecondaryAction, {
      children: 'mock content 2',
    });
  });

  it('filters out values from the hiddenGroups array if they do not match the groups array', () => {
    mockGetVisibleAndHiddenActionsIndices({
      visibleActions: [],
      visibleGroups: [0, 1],
      hiddenActions: [],
      hiddenGroups: [2, 3, 4, 5],
    });

    const wrapper = mountWithApp(
      <ActionMenu
        groups={[
          {title: 'Menu group 0', actions: [{content: 'mock content 0'}]},
          {title: 'Menu group 1', actions: [{content: 'mock content 1'}]},
          {title: 'Menu group 2', actions: [{content: 'mock content 2'}]},
        ]}
      />,
    );

    forceMeasurement(wrapper);

    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'Menu group 0',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'Menu group 1',
    });
    expect(wrapper).toContainReactComponent(SecondaryAction, {
      children: 'More actions',
    });
    expect(wrapper).not.toContainReactComponent(SecondaryAction, {
      children: 'Menu group 2',
    });
  });
});

function findWrapper(wrapper: CustomRoot<any, any>) {
  const wrappingDiv = wrapper.findWhere<'div'>((node) => {
    return (
      node.is('div') &&
      Boolean(node.prop('className')) &&
      node.prop('className')!.includes(styles.ActionsLayout)
    );
  });

  return wrappingDiv;
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
