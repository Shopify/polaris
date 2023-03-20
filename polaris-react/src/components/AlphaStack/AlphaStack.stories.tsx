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
    <div style={{display: 'flex', height: '250px'}}>
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
    </div>
  );
}

export function WithAlignCenter() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
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
    </div>
  );
}

export function WithAlignEnd() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
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
    </div>
  );
}

export function WithAlignSpaceAround() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <AlphaStack gap="4" align="space-around">
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
    </div>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <AlphaStack gap="4" align="space-between">
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
    </div>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <AlphaStack gap="4" align="space-evenly">
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
    </div>
  );
}

export function WithInlineAlignStart() {
  return (
    <AlphaStack gap="4" inlineAlign="start">
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

export function WithInlineAlignCenter() {
  return (
    <AlphaStack gap="4" inlineAlign="center">
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

export function WithInlineAlignEnd() {
  return (
    <AlphaStack gap="4" inlineAlign="end">
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
