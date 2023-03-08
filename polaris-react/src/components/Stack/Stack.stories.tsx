import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Stack} from '@shopify/polaris';

export default {
  component: Stack,
} as ComponentMeta<typeof Stack>;

export function Default() {
  return (
    <Stack>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithGap() {
  return (
    <Stack gap="8">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithResponsiveGap() {
  return (
    <Stack gap={{xs: '4', md: '10'}}>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithAlignStart() {
  return (
    <Stack gap="4" align="start">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithAlignCenter() {
  return (
    <Stack gap="4" align="center">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithAlignEnd() {
  return (
    <Stack gap="4" align="end">
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}

export function WithFullWidthChildren() {
  return (
    <Stack gap="4" fullWidth>
      <Box background="surface" padding="1">
        01
      </Box>
      <Box background="surface" padding="1">
        02
      </Box>
      <Box background="surface" padding="1">
        03
      </Box>
    </Stack>
  );
}
