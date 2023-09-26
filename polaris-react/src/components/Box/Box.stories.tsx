import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {BlockStack, Text, Box, Icon} from '@shopify/polaris';
import {PaintBrushMajor} from '@shopify/polaris-icons';

export default {
  component: Box,
} as ComponentMeta<typeof Box>;

export function Default() {
  return (
    <Box>
      <Icon source={PaintBrushMajor} tone="base" />
    </Box>
  );
}

export function WithBorders() {
  return (
    <BlockStack gap="400">
      <Box background="bg" padding="400" borderWidth="1" borderColor="border">
        <Text as="p">1px solid border</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="1"
        borderStyle="dashed"
        borderColor="border-subdued"
      >
        <Text as="p">1px dashed border</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="2"
        borderColor="border-info"
      >
        <Text as="p">2px solid blue</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="3"
        borderColor="border-success"
      >
        <Text as="p">3px solid green</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="4"
        borderColor="border-caution"
      >
        <Text as="p">4px solid yellow</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">5px solid red</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderBlockStartWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">border-block-start: 5px solid red</Text>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="5"
        borderBlockStartWidth="1"
        borderColor="border-critical"
      >
        <Text as="p">border-width: 5px solid red</Text>
        <Text as="p">border-block-start: 1px solid red</Text>
        <Box
          background="bg"
          padding="400"
          borderWidth="4"
          borderColor="border-caution"
        >
          <Text as="p">border-width: 4px solid yellow</Text>
          <Text as="p" fontWeight="semibold">
            Note: border-block-start will not inherit from the parent Box
            component
          </Text>
        </Box>
      </Box>
      <Box
        background="bg"
        padding="400"
        borderWidth="5"
        borderColor="transparent"
      >
        <Text as="p">5px solid transparent</Text>
      </Box>
    </BlockStack>
  );
}

export function WithOutline() {
  return (
    <BlockStack gap="400">
      <Box background="bg" padding="400" outlineWidth="1" outlineColor="border">
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="400"
        outlineWidth="1"
        outlineStyle="dashed"
        outlineColor="border-subdued"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="400"
        outlineWidth="2"
        outlineColor="border-info"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="400"
        outlineWidth="3"
        outlineColor="border-success"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="400"
        outlineWidth="4"
        outlineColor="border-caution"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="400"
        outlineWidth="5"
        outlineColor="border-critical"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
    </BlockStack>
  );
}

export function WithBorderRadius() {
  return (
    <Box background="bg" padding="400" borderRadius="2">
      <Icon source={PaintBrushMajor} tone="info" />
    </Box>
  );
}

export function WithResponsivePadding() {
  return (
    <BlockStack gap="400">
      <Box
        background="bg"
        padding={{xs: '200', sm: '800'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="200"
        paddingBlockStart={{xs: '400', sm: '1000'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="200"
        paddingBlockEnd={{xs: '400', sm: '1000'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        padding="200"
        paddingInlineStart={{xs: '400', sm: '1000'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg"
        paddingInlineEnd={{xs: '400', sm: '1000'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
    </BlockStack>
  );
}
