import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Badge, Icon, Inline, Thumbnail} from '@shopify/polaris';
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
    <Inline align="start" blockAlign="center" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignCenter() {
  return (
    <Inline align="center" blockAlign="center" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignEnd() {
  return (
    <Inline align="end" blockAlign="center" gap="1">
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

export function WithBlockAlignStart() {
  return (
    <Inline blockAlign="start" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithBlockAlignCenter() {
  return (
    <Inline blockAlign="center" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithBlockAlignEnd() {
  return (
    <Inline blockAlign="end" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithBlockAlignBaseline() {
  return (
    <Inline blockAlign="baseline" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithBlockAlignStrech() {
  return (
    <Inline blockAlign="stretch" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function WithAlignCenterBlockAlignCenter() {
  return (
    <Inline align="center" blockAlign="center" gap="1">
      <Thumbnail source={ImageMajor} alt="example" />
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
    <Inline gap="8">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function WithResponsiveGap() {
  return (
    <Inline gap={{xs: '2', md: '4'}}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}
