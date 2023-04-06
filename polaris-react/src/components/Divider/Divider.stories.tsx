import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaStack, Divider, Text} from '@shopify/polaris';

export default {
  component: Divider,
} as ComponentMeta<typeof Divider>;

export function Default() {
  return <Divider />;
}

export function WithBorderStyles() {
  return (
    <AlphaStack gap="5">
      <Text as="h1" variant="headingXs">
        Border subdued
      </Text>
      <Divider borderStyle="border-subdued" />
      <Text as="h1" variant="headingXs">
        Border
      </Text>
      <Divider borderStyle="border" />
      <Text as="h1" variant="headingXs">
        Border inverse
      </Text>
      <Divider borderStyle="border-inverse" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderStyle="transparent" />
    </AlphaStack>
  );
}
