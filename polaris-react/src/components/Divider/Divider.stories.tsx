import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaStack, Divider, Text} from '@shopify/polaris';

export default {
  component: Divider,
} as ComponentMeta<typeof Divider>;

export function Styles() {
  return (
    <AlphaStack gap="5" fullWidth>
      <Text as="h1" variant="headingXs">
        base
      </Text>
      <Divider border="base" />
      <Text as="h1" variant="headingXs">
        dark
      </Text>
      <Divider border="dark" />
      <Text as="h1" variant="headingXs">
        divider
      </Text>
      <Divider border="divider" />
      <Text as="h1" variant="headingXs">
        divider on dark
      </Text>
      <Divider border="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        transparent
      </Text>
      <Divider border="transparent" />
    </AlphaStack>
  );
}

export function WithWidth() {
  return (
    <AlphaStack gap="12" fullWidth>
      <Divider border="base" width="1" />
      <Divider border="base" width="2" />
      <Divider border="base" width="3" />
      <Divider border="base" width="4" />
      <Divider border="base" width="5" />
    </AlphaStack>
  );
}
