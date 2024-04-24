import React from 'react';
import type {Meta} from '@storybook/react';
import {Box, BlockStack} from '@shopify/polaris';

export default {
  component: BlockStack,
} as Meta<typeof BlockStack>;

export const Default = {
  render() {
    return (
      <BlockStack>
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};

export const WithGap = {
  render() {
    return (
      <BlockStack gap="800">
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};

export const WithResponsiveGap = {
  render() {
    return (
      <BlockStack gap={{xs: '400', md: '1000'}}>
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};

export const WithAlignStart = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="start">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithAlignCenter = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="center">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithAlignEnd = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="end">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithAlignSpaceAround = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="space-around">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithAlignSpaceBetween = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="space-between">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithAlignSpaceEvenly = {
  render() {
    return (
      <div style={{display: 'flex', height: '250px'}}>
        <BlockStack gap="400" align="space-evenly">
          <Box background="bg-surface" padding="100">
            01
          </Box>
          <Box background="bg-surface" padding="100">
            02
          </Box>
          <Box background="bg-surface" padding="100">
            03
          </Box>
        </BlockStack>
      </div>
    );
  },
};

export const WithInlineAlignStart = {
  render() {
    return (
      <BlockStack gap="400" inlineAlign="start">
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};

export const WithInlineAlignCenter = {
  render() {
    return (
      <BlockStack gap="400" inlineAlign="center">
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};

export const WithInlineAlignEnd = {
  render() {
    return (
      <BlockStack gap="400" inlineAlign="end">
        <Box background="bg-surface" padding="100">
          01
        </Box>
        <Box background="bg-surface" padding="100">
          02
        </Box>
        <Box background="bg-surface" padding="100">
          03
        </Box>
      </BlockStack>
    );
  },
};
