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

export function WithBorders() {
  return (
    <VerticalStack gap="2">
      <Box background="bg" padding="4" borderWidth="1" borderColor="border">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="4"
        borderStyle="dashed"
        borderColor="border-subdued"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="2"
        borderColor="border-info"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="3"
        borderColor="border-success"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="4"
        borderColor="border-caution"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="5"
        borderColor="border-critical"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
    </VerticalStack>
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
