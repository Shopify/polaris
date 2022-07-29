import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, Heading, Stack} from '@shopify/polaris';

export default {
  component: Stack,
} as ComponentMeta<typeof Stack>;

export function Default() {
  return (
    <Stack>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Stack>
  );
}

export function NonWrapping() {
  return (
    <Stack wrap={false}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Stack>
  );
}

export function Spacing() {
  return (
    <Stack spacing="loose">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function VerticalCentering() {
  return (
    <Stack alignment="center">
      <Heading>
        Order
        <br />
        #1136
        <br />
        was paid
      </Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function FillAvailableSpaceProportionally() {
  return (
    <Stack distribution="fill">
      <Heading>Order #1136</Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function WhereItemsFillSpaceEvenly() {
  return (
    <Stack distribution="fillEvenly">
      <Heading>Order #1136</Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function WhereASingleItemFillsTheRemainingSpace() {
  return (
    <Stack>
      <Stack.Item fill>
        <Heading>Order #1136</Heading>
      </Stack.Item>
      <Stack.Item>
        <Badge>Paid</Badge>
      </Stack.Item>
      <Stack.Item>
        <Badge>Fulfilled</Badge>
      </Stack.Item>
    </Stack>
  );
}
