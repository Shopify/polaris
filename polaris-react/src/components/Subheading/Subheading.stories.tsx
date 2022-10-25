import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Subheading} from '@shopify/polaris';

export default {
  component: Subheading,
} as ComponentMeta<typeof Subheading>;

export function Default() {
  return <Subheading>Accounts</Subheading>;
}
