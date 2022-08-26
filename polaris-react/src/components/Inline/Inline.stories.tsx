import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, Heading, Inline} from '@shopify/polaris';

export default {
  component: Inline,
} as ComponentMeta<typeof Inline>;

export function Default() {
  return (
    <Inline>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function NonWrapping() {
  return (
    <Inline wrap={false}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function Spacing() {
  return (
    <Inline spacing="8">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Inline>
  );
}

export function VerticalCentering() {
  return (
    <Inline alignY="center">
      <Heading>
        Order
        <br />
        #1136
        <br />
        was paid
      </Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Inline>
  );
}
