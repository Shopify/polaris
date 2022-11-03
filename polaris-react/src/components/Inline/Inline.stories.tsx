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

export function AlignStart() {
  return (
    <Inline align="start" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignCenter() {
  return (
    <Inline align="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignEnd() {
  return (
    <Inline align="end" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignSpaceAround() {
  return (
    <Inline align="space-around" spacing="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignSpaceBetween() {
  return (
    <Inline align="space-between" spacing="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignSpaceEvenly() {
  return (
    <Inline align="space-evenly" spacing="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function BlockAlignCenter() {
  return (
    <Inline blockAlign="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function BlockAlignStart() {
  return (
    <Inline blockAlign="start" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function BlockAlignEnd() {
  return (
    <Inline blockAlign="end" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function BlockAlignBaseline() {
  return (
    <Inline blockAlign="baseline" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function BlockAlignStrech() {
  return (
    <Inline blockAlign="stretch" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignCenterBlockAlignCenter() {
  return (
    <Inline align="center" blockAlign="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function NonWrapping() {
  return (
    <Inline wrap={false} spacing="1">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function Spacing() {
  return (
    <Inline spacing="8">
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}
