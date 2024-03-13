import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {DeleteIcon} from '@shopify/polaris-icons';

import {BulkActions} from './BulkActions';

export default {
  component: BulkActions,
} as ComponentMeta<typeof BulkActions>;

export function Default() {
  const promotedActions = [
    {
      content: 'Capture payments',
      onAction: () => console.log('Todo: implement payment capture'),
    },
    {
      title: 'Edit customers',
      actions: [
        {
          content: 'Add customers',
          onAction: () => console.log('Todo: implement adding customers'),
        },
        {
          icon: DeleteIcon,
          destructive: true,
          content: 'Delete customers',
          onAction: () => console.log('Todo: implement deleting customers'),
        },
      ],
    },
    {
      title: 'Export',
      actions: [
        {
          content: 'Export as PDF',
          onAction: () => console.log('Todo: implement PDF exporting'),
        },
        {
          content: 'Export as CSV',
          onAction: () => console.log('Todo: implement CSV exporting'),
        },
      ],
    },
  ];
  const actions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];
  return (
    <BulkActions
      selectMode
      onToggleAll={() => console.log('toggling all')}
      accessibilityLabel="Select all items"
      selected={false}
      promotedActions={promotedActions}
      actions={actions}
    />
  );
}

export function WithDeprecatedProps() {
  const promotedActions = [
    {
      content: 'Capture payments',
      onAction: () => console.log('Todo: implement payment capture'),
    },
    {
      title: 'Edit customers',
      actions: [
        {
          content: 'Add customers',
          onAction: () => console.log('Todo: implement adding customers'),
        },
        {
          icon: DeleteIcon,
          destructive: true,
          content: 'Delete customers',
          onAction: () => console.log('Todo: implement deleting customers'),
        },
      ],
    },
    {
      title: 'Export',
      actions: [
        {
          content: 'Export as PDF',
          onAction: () => console.log('Todo: implement PDF exporting'),
        },
        {
          content: 'Export as CSV',
          onAction: () => console.log('Todo: implement CSV exporting'),
        },
      ],
    },
  ];
  const actions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];
  return (
    <BulkActions
      selectMode
      onToggleAll={() => console.log('toggling all')}
      accessibilityLabel="Select all items"
      selected={false}
      promotedActions={promotedActions}
      actions={actions}
      isSticky
      width={500}
    />
  );
}
