import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Badge, Icon, InlineStack, Thumbnail} from '@shopify/polaris';
import {CapitalMajor, ImageMajor} from '@shopify/polaris-icons';

export default {
  component: InlineStack,
} as ComponentMeta<typeof InlineStack>;

export function Default() {
  return (
    <InlineStack>
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Box>
        <Icon source={CapitalMajor} tone="primary" />
      </Box>
    </InlineStack>
  );
}

export function WithAlignStart() {
  return (
    <InlineStack align="start" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignCenter() {
  return (
    <InlineStack align="center" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignEnd() {
  return (
    <InlineStack align="end" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignSpaceAround() {
  return (
    <InlineStack align="space-around" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <InlineStack align="space-between" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <InlineStack align="space-evenly" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithBlockAlignStart() {
  return (
    <InlineStack blockAlign="start" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithBlockAlignCenter() {
  return (
    <InlineStack blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithBlockAlignEnd() {
  return (
    <InlineStack blockAlign="end" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithBlockAlignBaseline() {
  return (
    <InlineStack blockAlign="baseline" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithBlockAlignStretch() {
  return (
    <InlineStack blockAlign="stretch" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithAlignCenterBlockAlignCenter() {
  return (
    <InlineStack align="center" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </InlineStack>
  );
}

export function WithNonWrapping() {
  return (
    <InlineStack wrap={false} gap="100">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </InlineStack>
  );
}

export function WithGap() {
  return (
    <InlineStack gap="800">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </InlineStack>
  );
}

export function WithResponsiveGap() {
  return (
    <InlineStack gap={{xs: '200', md: '400'}}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </InlineStack>
  );
}
