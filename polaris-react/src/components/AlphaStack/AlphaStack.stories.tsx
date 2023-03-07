import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, AlphaStack} from '@shopify/polaris';

export default {
  component: AlphaStack,
} as ComponentMeta<typeof AlphaStack>;

export function Default() {
  return (
    <AlphaStack>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithGap() {
  return (
    <AlphaStack gap="8">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithResponsiveGap() {
  return (
    <AlphaStack gap={{xs: '4', md: '10'}}>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithAlignStart() {
  return (
    <AlphaStack gap="4" align="start">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithAlignCenter() {
  return (
    <AlphaStack gap="4" align="center">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithAlignEnd() {
  return (
    <AlphaStack gap="4" align="end">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithFullWidthChildren() {
  return (
    <AlphaStack gap="4" fullWidth>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}

export function WithResponsivePaddingBlockStartAndEnd() {
  return (
    <AlphaStack
      gap="4"
      paddingBlockStart={{sm: '2', md: '6'}}
      paddingBlockEnd={{sm: '2', md: '6'}}
    >
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </AlphaStack>
  );
}
