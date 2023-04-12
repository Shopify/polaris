import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, VerticalStack} from '@shopify/polaris';

export default {
  component: VerticalStack,
} as ComponentMeta<typeof VerticalStack>;

export function Default() {
  return (
    <VerticalStack>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}

export function WithGap() {
  return (
    <VerticalStack gap="8">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}

export function WithResponsiveGap() {
  return (
    <VerticalStack gap={{xs: '4', md: '10'}}>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}

export function WithAlignStart() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="start">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithAlignCenter() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="center">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithAlignEnd() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="end">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithAlignSpaceAround() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="space-around">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="space-between">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <VerticalStack gap="4" align="space-evenly">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </VerticalStack>
    </div>
  );
}

export function WithInlineAlignStart() {
  return (
    <VerticalStack gap="4" inlineAlign="start">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}

export function WithInlineAlignCenter() {
  return (
    <VerticalStack gap="4" inlineAlign="center">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}

export function WithInlineAlignEnd() {
  return (
    <VerticalStack gap="4" inlineAlign="end">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </VerticalStack>
  );
}
