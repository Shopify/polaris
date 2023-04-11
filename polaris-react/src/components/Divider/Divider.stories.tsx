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
        Default
      </Text>
      <Divider />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider borderColor="border" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider borderColor="border-inverse" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderColor="transparent" />
    </AlphaStack>
  );
}
