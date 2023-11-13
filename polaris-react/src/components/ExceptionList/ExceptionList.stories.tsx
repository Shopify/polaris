import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ExceptionList} from '@shopify/polaris';
import {
  NoteIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
} from '@shopify/polaris-icons';

export default {
  component: ExceptionList,
} as ComponentMeta<typeof ExceptionList>;

export function All() {
  return (
    <ExceptionList
      items={[
        {
          title: 'Order #1001',
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Order #1002',
          status: 'warning',
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Order #1003',
          status: 'critical',
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Truncated Order #1004',
          truncate: true,
          description:
            'This customer is awesome. Make sure to treat them right! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          title: 'Order #1005',
          icon: NoteIcon,
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Order #1002',
          icon: AlertTriangleIcon,
          status: 'warning',
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Order #1003',
          icon: AlertCircleIcon,
          status: 'critical',
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
        {
          title: 'Truncated Order #1004',
          icon: NoteIcon,
          truncate: true,
          description:
            'This customer is awesome. Make sure to treat them right! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ]}
    />
  );
}
