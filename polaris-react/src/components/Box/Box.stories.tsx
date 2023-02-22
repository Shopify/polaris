import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaStack, Box, Icon} from '@shopify/polaris';
import {PaintBrushMajor} from '@shopify/polaris-icons';

export default {
  component: Box,
} as ComponentMeta<typeof Box>;

export function Default() {
  return (
    <Box>
      <Icon source={PaintBrushMajor} color="base" />
    </Box>
  );
}

export function WithDarkBorder() {
  return (
    <Box background="surface" padding="4" border="dark">
      <Icon source={PaintBrushMajor} color="base" />
    </Box>
  );
}

export function WithBorderRadius() {
  return (
    <Box background="surface" padding="4" borderRadius="2">
      <Icon source={PaintBrushMajor} color="highlight" />
    </Box>
  );
}

export function WithResponsivePadding() {
  return (
    <AlphaStack gap="4">
      <Box background="surface" padding={{xs: '2', sm: '8'}} border="dark">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        padding="2"
        paddingBlockStart={{xs: '4', sm: '10'}}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        padding="2"
        paddingBlockEnd={{xs: '4', sm: '10'}}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        padding="2"
        paddingInlineStart={{xs: '4', sm: '10'}}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        paddingInlineEnd={{xs: '4', sm: '10'}}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
    </AlphaStack>
  );
}
