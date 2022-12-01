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
    <AlphaStack gap="5" fullWidth>
      <Text as="h1" variant="headingXs">
        Base
      </Text>
      <Divider borderStyle="base" />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider borderStyle="dark" />
      <Text as="h1" variant="headingXs">
        Divider
      </Text>
      <Divider borderStyle="divider" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider borderStyle="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderStyle="transparent" />
    </AlphaStack>
  );
}
