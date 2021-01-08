import React, {useCallback, useState} from 'react';
import {ActionMenuProps, ActionMenu} from 'index';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {
  Actions,
  MenuAction,
  MenuGroup,
  RollupActions,
  SecondaryAction,
} from '../..';

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

  it('renders actions in their initial order', () => {
    const actionsBeforeOverriddenOrder: ActionMenuProps['actions'] = [
      {content: 'mock content 0'},
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    const expectedOrderAfterOverride = [
      {content: 'mock content 0'},
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    const wrapper = mountWithAppProvider(
      <ActionMenu actions={actionsBeforeOverriddenOrder} />,
    );

    wrapper.find(MenuAction).forEach((action, index) => {
      expect(action.props()).toMatchObject(expectedOrderAfterOverride[index]);
    });
  });

  describe('Actions', () => {
    it('renders SecondaryActions when the new design language is true', () => {
      const actionsBeforeOverriddenOrder: ActionMenuProps['actions'] = [
        {content: 'mock content 0'},
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];

      const wrapper = mountWithApp(
        <ActionMenu actions={actionsBeforeOverriddenOrder} />,
        {features: {newDesignLanguage: true}},
      );

      expect(wrapper.findAll(SecondaryAction)).toHaveLength(3);
    });

    it('renders a MenuGroup when the new design language is true', () => {
      const wrapper = mountWithApp(
        <ActionMenu groups={[{title: 'group', actions: []}]} />,
        {
          features: {newDesignLanguage: true},
        },
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

      const wrapper = mountWithApp(<ActionsWithToggle />, {
        features: {newDesignLanguage: true},
      });

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

      const wrapper = mountWithApp(<ActionsWithToggle />, {
        features: {newDesignLanguage: true},
      });

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

      const wrapper = mountWithApp(<ActionsWithToggle />, {
        features: {newDesignLanguage: true},
      });

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 1);

      wrapper.find('button')!.trigger('onClick');

      expect(wrapper).toContainReactComponentTimes(SecondaryAction, 2);
    });
  });
});
