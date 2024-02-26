import React from 'react';
import type {ComponentMeta} from '@storybook/react';

// eslint-disable-next-line import/no-deprecated
import {SelectAllActions} from './SelectAllActions';

export default {
  // eslint-disable-next-line import/no-deprecated
  component: SelectAllActions,
  // eslint-disable-next-line import/no-deprecated
} as ComponentMeta<typeof SelectAllActions>;

export function Default() {
  const paginatedSelectAllAction = {
    content: 'Select all',
    onAction: () => console.log('paginatedSelectAllAction clicked'),
  };
  return (
    <SelectAllActions
      label="3 selected"
      selectMode
      isSticky
      hasPagination={false}
    />
  );
}

export function WithPaginatedSelectAllText() {
  const paginatedSelectAllAction = {
    content: 'Select all',
    onAction: () => console.log('paginatedSelectAllAction clicked'),
  };
  return (
    <SelectAllActions
      label="3 selected"
      selectMode
      paginatedSelectAllText="50 items selected"
      paginatedSelectAllAction={paginatedSelectAllAction}
      isSticky
      hasPagination={false}
    />
  );
}

export function WithPagination() {
  const paginatedSelectAllAction = {
    content: 'Select all',
    onAction: () => console.log('paginatedSelectAllAction clicked'),
  };
  return (
    <SelectAllActions
      label="3 selected"
      selectMode
      paginatedSelectAllText="Select all"
      paginatedSelectAllAction={paginatedSelectAllAction}
      isSticky
      hasPagination
    />
  );
}

export function WithDeprecatedProps() {
  const paginatedSelectAllAction = {
    content: 'Select all',
    onAction: () => console.log('paginatedSelectAllAction clicked'),
  };
  return (
    <SelectAllActions
      label="3 selected"
      selectMode
      paginatedSelectAllText="Select all"
      paginatedSelectAllAction={paginatedSelectAllAction}
      isSticky
      hasPagination
      accessibilityLabel="Select all items"
      selected
      onToggleAll={() => console.log('onToggleAll called')}
    />
  );
}
