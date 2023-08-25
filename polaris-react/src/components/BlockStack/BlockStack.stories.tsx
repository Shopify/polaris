import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, BlockStack} from '@shopify/polaris';

export default {
  component: BlockStack,
} as ComponentMeta<typeof BlockStack>;

export function Default() {
  return (
    <BlockStack>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}

export function WithGap() {
  return (
    <BlockStack gap="8">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}

export function WithResponsiveGap() {
  return (
    <BlockStack gap={{xs: '4', md: '10'}}>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}

export function WithAlignStart() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="start">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithAlignCenter() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="center">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithAlignEnd() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="end">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithAlignSpaceAround() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="space-around">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="space-between">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <BlockStack gap="4" align="space-evenly">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </BlockStack>
    </div>
  );
}

export function WithInlineAlignStart() {
  return (
    <BlockStack gap="4" inlineAlign="start">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}

export function WithInlineAlignCenter() {
  return (
    <BlockStack gap="4" inlineAlign="center">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}

export function WithInlineAlignEnd() {
  return (
    <BlockStack gap="4" inlineAlign="end">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </BlockStack>
  );
}
