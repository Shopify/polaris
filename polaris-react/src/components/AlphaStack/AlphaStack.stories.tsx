import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, AlphaStack} from '@shopify/polaris';

export default {
  component: AlphaStack,
} as ComponentMeta<typeof AlphaStack>;

export function Default() {
  return (
    <AlphaStack>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}

export function WithGap() {
  return (
    <AlphaStack gap="8">
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}

export function WithResponsiveGap() {
  return (
    <AlphaStack gap={{xs: '4', md: '10'}}>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}

export function WithAlignCenter() {
  return (
    <AlphaStack gap="4" align="center">
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}

export function WithAlignEnd() {
  return (
    <AlphaStack gap="4" align="end">
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}

export function WithFullWidthChildren() {
  return (
    <AlphaStack gap="4" fullWidth>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 1
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 2
      </Box>
      <Box background="backdrop" color="text-on-dark" padding="1">
        Block 3
      </Box>
    </AlphaStack>
  );
}
