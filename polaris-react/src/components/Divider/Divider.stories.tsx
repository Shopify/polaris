import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {BlockStack, Divider, Text} from '@shopify/polaris';

export default {
  component: Divider,
} as ComponentMeta<typeof Divider>;

export function Default() {
  return <Divider />;
}

export function WithBorderStyles() {
  return (
    <BlockStack gap="500">
      <Text as="h1" variant="headingSm">
        Default
      </Text>
      <Divider />
      <Text as="h1" variant="headingSm">
        Border
      </Text>
      <Divider borderColor="border" />
      <Text as="h1" variant="headingSm">
        Border inverse
      </Text>
      <Divider borderColor="border-inverse" />
      <Text as="h1" variant="headingSm">
        Transparent
      </Text>
      <Divider borderColor="transparent" />
    </BlockStack>
  );
}
