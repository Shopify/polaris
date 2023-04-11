import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Stack} from '@shopify/polaris';

export default {
  component: Stack,
} as ComponentMeta<typeof Stack>;

export function Default() {
  return (
    <Stack>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithGap() {
  return (
    <Stack gap="8">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithResponsiveGap() {
  return (
    <Stack gap={{xs: '4', md: '10'}}>
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithAlignStart() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="start">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithAlignCenter() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="center">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithAlignEnd() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="end">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithAlignSpaceAround() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="space-around">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithAlignSpaceBetween() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="space-between">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithAlignSpaceEvenly() {
  return (
    <div style={{display: 'flex', height: '250px'}}>
      <Stack gap="4" align="space-evenly">
        <Box background="bg" padding="1">
          01
        </Box>
        <Box background="bg" padding="1">
          02
        </Box>
        <Box background="bg" padding="1">
          03
        </Box>
      </Stack>
    </div>
  );
}

export function WithInlineAlignStart() {
  return (
    <Stack gap="4" inlineAlign="start">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithInlineAlignCenter() {
  return (
    <Stack gap="4" inlineAlign="center">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithInlineAlignEnd() {
  return (
    <Stack gap="4" inlineAlign="end">
      <Box background="bg" padding="1">
        01
      </Box>
      <Box background="bg" padding="1">
        02
      </Box>
      <Box background="bg" padding="1">
        03
      </Box>
    </Stack>
  );
}
