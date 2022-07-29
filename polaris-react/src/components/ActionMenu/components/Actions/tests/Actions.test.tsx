import React, {useCallback, useState} from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionMenuProps, ActionMenu} from '../../..';
import {Actions, MenuGroup, RollupActions, SecondaryAction} from '../..';
import {Tooltip} from '../../../../Tooltip';

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
      const actionsBeforeOverriddenOrder: ActionMenuProps['actions'] = [
        {content: 'mock content 0'},
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];

      const wrapper = mountWithApp(
        <ActionMenu actions={actionsBeforeOverriddenOrder} />,
      );

      expect(wrapper.findAll(SecondaryAction)).toHaveLength(3);
    });

    it('renders a <Tooltip /> when helpText is set on an action', () => {
      const toolTipAction = {
        content: 'Refund',
        helpText:
          'You need permission from your store administrator to issue refunds.',
      };

      const wrapper = mountWithApp(<ActionMenu actions={[toolTipAction]} />);
      const action = wrapper.find(SecondaryAction);

      expect(action).toContainReactComponent(Tooltip, {
        content: toolTipAction.helpText,
      });
    });

    it('renders a MenuGroup', () => {
      const wrapper = mountWithApp(
        <ActionMenu groups={[{title: 'group', actions: []}]} />,
      );

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

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 1);

      wrapper.find('button')!.trigger('onClick');

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 2);
    });
  });
});
