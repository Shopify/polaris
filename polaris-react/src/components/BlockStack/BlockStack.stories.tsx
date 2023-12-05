import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, BlockStack} from '@shopify/polaris';

export default {
  component: BlockStack,
} as ComponentMeta<typeof BlockStack>;

export function Default() {
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
}

export function WithGap() {
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
}

export function WithResponsiveGap() {
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
}

export function WithAlignStart() {
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
}

export function WithAlignCenter() {
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
}

export function WithAlignEnd() {
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
}

export function WithAlignSpaceAround() {
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
}

export function WithAlignSpaceBetween() {
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
}

export function WithAlignSpaceEvenly() {
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
}

export function WithInlineAlignStart() {
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
}

export function WithInlineAlignCenter() {
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
}

export function WithInlineAlignEnd() {
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
}
