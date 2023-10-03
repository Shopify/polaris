import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Badge, Icon, HorizontalStack, Thumbnail} from '@shopify/polaris';
import {CapitalMajor, ImageMajor} from '@shopify/polaris-icons';

export default {
  component: HorizontalStack,
} as ComponentMeta<typeof HorizontalStack>;

export function Default() {
  return (
    <HorizontalStack>
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Box>
        <Icon source={CapitalMajor} color="primary" />
      </Box>
    </HorizontalStack>
  );
}

export function WithAlignStart() {
  return (
    <HorizontalStack align="start" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignCenter() {
  return (
    <HorizontalStack align="center" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignEnd() {
  return (
    <HorizontalStack align="end" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignSpaceAround() {
  return (
    <HorizontalStack align="space-around" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <HorizontalStack align="space-between" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <HorizontalStack align="space-evenly" gap="100">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithBlockAlignStart() {
  return (
    <HorizontalStack blockAlign="start" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithBlockAlignCenter() {
  return (
    <HorizontalStack blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithBlockAlignEnd() {
  return (
    <HorizontalStack blockAlign="end" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithBlockAlignBaseline() {
  return (
    <HorizontalStack blockAlign="baseline" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithBlockAlignStretch() {
  return (
    <HorizontalStack blockAlign="stretch" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithAlignCenterBlockAlignCenter() {
  return (
    <HorizontalStack align="center" blockAlign="center" gap="100">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </HorizontalStack>
  );
}

export function WithNonWrapping() {
  return (
    <HorizontalStack wrap={false} gap="100">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </HorizontalStack>
  );
}

export function WithGap() {
  return (
    <HorizontalStack gap="800">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </HorizontalStack>
  );
}

export function WithResponsiveGap() {
  return (
    <HorizontalStack gap={{xs: '200', md: '400'}}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </HorizontalStack>
  );
}
