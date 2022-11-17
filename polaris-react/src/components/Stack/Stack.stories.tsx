import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, Text, Stack} from '@shopify/polaris';

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
      <Text variant="headingMd" as="h2">
        Order
        <br />
        #1136
        <br />
        was paid
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function FillAvailableSpaceProportionally() {
  return (
    <Stack distribution="fill">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function WhereItemsFillSpaceEvenly() {
  return (
    <Stack distribution="fillEvenly">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export function WhereASingleItemFillsTheRemainingSpace() {
  return (
    <Stack>
      <Stack.Item fill>
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
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
