import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {VerticalStack, Box, Icon} from '@shopify/polaris';
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
    <Box background="bg" padding="4" borderWidth="1" borderColor="border">
      <Icon source={PaintBrushMajor} color="base" />
    </Box>
  );
}

export function WithBorderRadius() {
  return (
    <Box background="bg" padding="4" borderRadius="2">
      <Icon source={PaintBrushMajor} color="highlight" />
    </Box>
  );
}

export function WithResponsivePadding() {
  return (
    <VerticalStack gap="4">
      <Box
        background="bg"
        padding={{xs: '2', sm: '8'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="2"
        paddingBlockStart={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="2"
        paddingBlockEnd={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="2"
        paddingInlineStart={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        paddingInlineEnd={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
    </VerticalStack>
  );
}
