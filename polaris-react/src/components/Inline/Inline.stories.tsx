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

export function AlignYCenter() {
  return (
    <Inline alignY="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignYTop() {
  return (
    <Inline alignY="top" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignYBottom() {
  return (
    <Inline alignY="bottom" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignYBaseline() {
  return (
    <Inline alignY="baseline" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignStart() {
  return (
    <Inline align="start" alignY="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignCenter() {
  return (
    <Inline align="center" alignY="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignEnd() {
  return (
    <Inline align="end" alignY="center" spacing="1">
      <Thumbnail source={ImageMajor} alt="example" />
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
    </Inline>
  );
}

export function AlignCenterAlignYCenter() {
  return (
    <Inline align="center" alignY="center" spacing="1">
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
