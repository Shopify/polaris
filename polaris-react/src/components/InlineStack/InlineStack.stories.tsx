import React from 'react';
import type {Meta} from '@storybook/react';
import {Box, Badge, Icon, InlineStack, Thumbnail} from '@shopify/polaris';
import {FlowerIcon, ImageIcon} from '@shopify/polaris-icons';

export default {
  component: InlineStack,
} as Meta<typeof InlineStack>;

export const Default = {
  render() {
    return (
      <InlineStack>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
        <Box>
          <Icon source={FlowerIcon} tone="primary" />
        </Box>
      </InlineStack>
    );
  },
};

export const WithAlignStart = {
  render() {
    return (
      <InlineStack align="start" blockAlign="center" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignCenter = {
  render() {
    return (
      <InlineStack align="center" blockAlign="center" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignEnd = {
  render() {
    return (
      <InlineStack align="end" blockAlign="center" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignSpaceAround = {
  render() {
    return (
      <InlineStack align="space-around" gap="100">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignSpaceBetween = {
  render() {
    return (
      <InlineStack align="space-between" gap="100">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignSpaceEvenly = {
  render() {
    return (
      <InlineStack align="space-evenly" gap="100">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithBlockAlignStart = {
  render() {
    return (
      <InlineStack blockAlign="start" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithBlockAlignCenter = {
  render() {
    return (
      <InlineStack blockAlign="center" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithBlockAlignEnd = {
  render() {
    return (
      <InlineStack blockAlign="end" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithBlockAlignBaseline = {
  render() {
    return (
      <InlineStack blockAlign="baseline" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithBlockAlignStretch = {
  render() {
    return (
      <InlineStack blockAlign="stretch" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithAlignCenterBlockAlignCenter = {
  render() {
    return (
      <InlineStack align="center" blockAlign="center" gap="100">
        <Thumbnail source={ImageIcon} alt="example" />
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithNonWrapping = {
  render() {
    return (
      <InlineStack wrap={false} gap="100">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </InlineStack>
    );
  },
};

export const WithGap = {
  render() {
    return (
      <InlineStack gap="800">
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </InlineStack>
    );
  },
};

export const WithResponsiveGap = {
  render() {
    return (
      <InlineStack gap={{xs: '200', md: '400'}}>
        <Badge>Paid</Badge>
        <Badge>Processing</Badge>
        <Badge>Fulfilled</Badge>
        <Badge>Completed</Badge>
      </InlineStack>
    );
  },
};

export const WithDirectionReversed = {
  render() {
    return (
      <InlineStack direction="row-reverse" gap="200">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};

export const WithResponsiveDirectionReversed = {
  render() {
    return (
      <InlineStack direction={{xs: 'row', md: 'row-reverse'}} gap="200">
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </InlineStack>
    );
  },
};
