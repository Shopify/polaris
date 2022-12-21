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

export function WithGap() {
  return (
    <AlphaStack gap="8">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function WithResponsiveGap() {
  return (
    <AlphaStack gap={{xs: '4', md: '10'}}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function WithAlignStart() {
  return (
    <AlphaStack align="start">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function WithAlignCenter() {
  return (
    <AlphaStack align="center">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function WithAlignEnd() {
  return (
    <AlphaStack align="end">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}

export function WithBlockAlignStart() {
  return (
    <div style={{display: 'flex', height: '500px'}}>
      <AlphaStack blockAlign="start">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </AlphaStack>
    </div>
  );
}

export function WithBlockAlignCenter() {
  return (
    <div style={{display: 'flex', height: '500px'}}>
      <AlphaStack blockAlign="center">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </AlphaStack>
    </div>
  );
}

export function WithBlockAlignEnd() {
  return (
    <div style={{display: 'flex', height: '500px'}}>
      <AlphaStack blockAlign="end">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </AlphaStack>
    </div>
  );
}

export function WithFullWidthChildren() {
  return (
    <AlphaStack fullWidth>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </AlphaStack>
  );
}
