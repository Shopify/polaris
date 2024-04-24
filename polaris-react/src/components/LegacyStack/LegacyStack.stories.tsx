import React from 'react';
import type {Meta} from '@storybook/react';
import {Badge, Text, LegacyStack} from '@shopify/polaris';

export default {
  component: LegacyStack,
} as Meta<typeof LegacyStack>;

export const Default = {
  render() {
    return (
      <LegacyStack>
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </LegacyStack>
    );
  },
};

export const NonWrapping = {
  render() {
    return (
      <LegacyStack wrap={false}>
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </LegacyStack>
    );
  },
};

export const Spacing = {
  render() {
    return (
      <LegacyStack spacing="loose">
        <Badge>Paid</Badge>
        <Badge>Fulfilled</Badge>
      </LegacyStack>
    );
  },
};

export const VerticalCentering = {
  render() {
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
  },
};

export const FillAvailableSpaceProportionally = {
  render() {
    return (
      <LegacyStack distribution="fill">
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
        <Badge>Paid</Badge>
        <Badge>Fulfilled</Badge>
      </LegacyStack>
    );
  },
};

export const WhereItemsFillSpaceEvenly = {
  render() {
    return (
      <LegacyStack distribution="fillEvenly">
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
        <Badge>Paid</Badge>
        <Badge>Fulfilled</Badge>
      </LegacyStack>
    );
  },
};

export const WhereASingleItemFillsTheRemainingSpace = {
  render() {
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
  },
};
