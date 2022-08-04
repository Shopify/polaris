import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Heading} from '@shopify/polaris';

export default {
  component: Heading,
} as ComponentMeta<typeof Heading>;

export function Default() {
  return <Heading>Online store dashboard</Heading>;
}
