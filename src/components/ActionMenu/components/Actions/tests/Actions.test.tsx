import React from 'react';
import {ActionMenuProps, ActionMenu} from 'index';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {MenuAction, RollupActions} from '../..';

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

  it('renders an action in its overridden order when index is set', () => {
    const overrideIndex = 1;
    const actionWithIndex = {
      content: 'mock content 1',
      index: overrideIndex,
    };

    const actions: ActionMenuProps['actions'] = [
      actionWithIndex,
      {content: 'mock content 0'},
    ];

    const wrapper = mountWithAppProvider(<ActionMenu actions={actions} />);

    expect(wrapper.find(MenuAction).at(overrideIndex).prop('content')).toBe(
      actionWithIndex.content,
    );
  });

  it('renders all actions in their overridden order when multiple indexes are set', () => {
    const actionsBeforeOverride: ActionMenuProps['actions'] = [
      {content: 'mock content 4', index: 3},
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2'},
      {content: 'mock content 5', index: 4},
      {content: 'mock content 3'},
    ];

    const expectedOrderAfterOverride = [
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2'},
      {content: 'mock content 3'},
      {content: 'mock content 4', index: 3},
      {content: 'mock content 5', index: 4},
    ];

    const wrapper = mountWithAppProvider(
      <ActionMenu actions={actionsBeforeOverride} />,
    );

    wrapper.find(MenuAction).forEach((action, index) => {
      expect(action.props()).toMatchObject(expectedOrderAfterOverride[index]);
    });
  });

  it('renders actions with the same set index consecutively, in order from highest initial index to lowest', () => {
    const actionsBeforeOverride: ActionMenuProps['actions'] = [
      {content: 'mock content 3', index: 0},
      {content: 'mock content 2', index: 0},
      {content: 'mock content 1', index: 0},
    ];

    const expectedOrderAfterOverride = [
      {content: 'mock content 1', index: 0},
      {content: 'mock content 2', index: 0},
      {content: 'mock content 3', index: 0},
    ];

    const wrapper = mountWithAppProvider(
      <ActionMenu actions={actionsBeforeOverride} />,
    );

    wrapper.find(MenuAction).forEach((action, index) => {
      expect(action.props()).toMatchObject(expectedOrderAfterOverride[index]);
    });
  });

  it('renders actions in their initial order when no indexes are set', () => {
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
});
