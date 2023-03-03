import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Box,
  Badge,
  Icon,
  Inline,
  Thumbnail,
  AlphaStack,
} from '@shopify/polaris';
import {CapitalMajor, ImageMajor} from '@shopify/polaris-icons';

export default {
  component: Inline,
} as ComponentMeta<typeof Inline>;

export function Default() {
  return (
    <Inline>
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Box>
        <Icon source={CapitalMajor} color="primary" />
      </Box>
    </Inline>
  );
}

export function WithAlignStart() {
  return (
    <Inline align="start" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignCenter() {
  return (
    <Inline align="center" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignEnd() {
  return (
    <Inline align="end" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignSpaceAround() {
  return (
    <Inline align="space-around" gap="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <Inline align="space-between" gap="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <Inline align="space-evenly" gap="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithNonWrapping() {
  return (
    <Inline wrap={false} gap="1">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function WithGap() {
  return (
    <AlphaStack gap="4">
      <Inline gap="8">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </Inline>

      <Inline gap={{xs: '2', md: '4'}}>
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </Inline>
    </AlphaStack>
  );
}

export function WithResponsiveGap() {
  return (
    <AlphaStack gap="4">
      <Inline gap={{xs: '2', md: '4'}}>
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </Inline>
    </AlphaStack>
  );
}
