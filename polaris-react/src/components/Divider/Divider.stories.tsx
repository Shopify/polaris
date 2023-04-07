import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaStack, Divider, Text} from '@shopify/polaris';

export default {
  component: Divider,
} as ComponentMeta<typeof Divider>;

export function Default() {
  return <Divider />;
}

export function WithBorderColor() {
  return (
    <AlphaStack gap="5">
      <Text as="h1" variant="headingXs">
        Border subdued
      </Text>
      <Divider borderColor="border-subdued" />
      <Text as="h1" variant="headingXs">
        Border
      </Text>
      <Divider borderColor="border" />
      <Text as="h1" variant="headingXs">
        Border inverse
      </Text>
      <Divider borderColor="border-inverse" />
    </AlphaStack>
  );
}
