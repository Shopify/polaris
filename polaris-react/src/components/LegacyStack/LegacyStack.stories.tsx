import type {ComponentMeta} from '@storybook/react';
import {Badge, Text, LegacyStack} from '@shopify/polaris';

export default {
  component: LegacyStack,
} as ComponentMeta<typeof LegacyStack>;

export function Default() {
  return (
    <LegacyStack>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </LegacyStack>
  );
}

export function NonWrapping() {
  return (
    <LegacyStack wrap={false}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </LegacyStack>
  );
}

export function Spacing() {
  return (
    <LegacyStack spacing="loose">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export function VerticalCentering() {
  return (
    <LegacyStack alignment="center">
      <Text variant="headingMd" as="h2">
        Order
        <br />
        #1136
        <br />
        was paid
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export function FillAvailableSpaceProportionally() {
  return (
    <LegacyStack distribution="fill">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export function WhereItemsFillSpaceEvenly() {
  return (
    <LegacyStack distribution="fillEvenly">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export function WhereASingleItemFillsTheRemainingSpace() {
  return (
    <LegacyStack>
      <LegacyStack.Item fill>
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
      </LegacyStack.Item>
      <LegacyStack.Item>
        <Badge>Paid</Badge>
      </LegacyStack.Item>
      <LegacyStack.Item>
        <Badge>Fulfilled</Badge>
      </LegacyStack.Item>
    </LegacyStack>
  );
}
