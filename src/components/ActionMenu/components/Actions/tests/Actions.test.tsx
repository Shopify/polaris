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
