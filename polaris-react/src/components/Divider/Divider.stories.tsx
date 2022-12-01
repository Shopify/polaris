import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaStack, Divider, Text} from '@shopify/polaris';

export default {
  component: Divider,
} as ComponentMeta<typeof Divider>;

export function Default() {
  return <Divider />;
}

export function WithColors() {
  return (
    <AlphaStack gap="5" fullWidth>
      <Text as="h1" variant="headingXs">
        Base
      </Text>
      <Divider color="base" />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider color="dark" />
      <Text as="h1" variant="headingXs">
        Divider
      </Text>
      <Divider color="divider" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider color="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider color="transparent" />
    </AlphaStack>
  );
}

export function WithWidth() {
  return (
    <AlphaStack gap="12" fullWidth>
      <Divider width="1" />
      <Divider width="2" />
      <Divider width="3" />
      <Divider width="4" />
      <Divider width="5" />
    </AlphaStack>
  );
}
