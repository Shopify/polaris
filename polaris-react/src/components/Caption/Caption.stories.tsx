import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Caption, List} from '@shopify/polaris';

export default {
  component: Caption,
} as ComponentMeta<typeof Caption>;

export function Default() {
  return (
    <List>
      <List.Item>
        Order #1001 <Caption>Received April 21, 2017</Caption>
      </List.Item>
      <List.Item>
        Order #1002 <Caption>Received April 22, 2017</Caption>
      </List.Item>
    </List>
  );
}
