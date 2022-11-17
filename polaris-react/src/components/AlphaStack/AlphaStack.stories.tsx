import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, AlphaStack} from '@shopify/polaris';

export default {
  component: AlphaStack,
} as ComponentMeta<typeof AlphaStack>;

export function Default() {
  return (
    <AlphaStack>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function Gap() {
  return (
    <AlphaStack gap="8">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function AlignCenter() {
  return (
    <AlphaStack align="center">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function AlignEnd() {
  return (
    <AlphaStack align="end">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function FullWidthChildren() {
  return (
    <AlphaStack fullWidth>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function ResponsiveGap() {
  return (
    <AlphaStack gap={{xs: '4', md: '10'}}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}
