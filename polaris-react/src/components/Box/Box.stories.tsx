import React from 'react';
import type {Meta} from '@storybook/react';
import {BlockStack, Text, Box, Icon} from '@shopify/polaris';
import {PaintBrushFlatIcon} from '@shopify/polaris-icons';

export default {
  component: Box,
} as Meta<typeof Box>;

export const Default = {
  render() {
    return (
      <Box>
        <Icon source={PaintBrushFlatIcon} tone="base" />
      </Box>
    );
  },
};

export const WithBorders = {
  render() {
    return (
      <BlockStack gap="400">
        <Box
          background="bg-surface"
          padding="400"
          borderWidth="025"
          borderColor="border"
        >
          <Text as="p">1px solid border</Text>
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          borderWidth="025"
          borderStyle="dashed"
          borderColor="border-secondary"
        >
          <Text as="p">1px dashed border</Text>
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Text as="p">2px solid blue</Text>
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          borderWidth="100"
          borderColor="border-caution"
        >
          <Text as="p">4px solid yellow</Text>
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          borderBlockStartWidth="100"
          borderColor="border-critical"
        >
          <Text as="p">border-block-start: 4px solid red</Text>
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          borderWidth="100"
          borderBlockStartWidth="025"
          borderColor="border-critical"
        >
          <Text as="p">border-width: 4px solid red</Text>
          <Text as="p">border-block-start: 1px solid red</Text>
          <Box
            background="bg-surface"
            padding="400"
            borderWidth="100"
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
          background="bg-surface"
          padding="400"
          borderWidth="100"
          borderColor="transparent"
        >
          <Text as="p">4px solid transparent</Text>
        </Box>
      </BlockStack>
    );
  },
};

export const WithOutline = {
  render() {
    return (
      <BlockStack gap="400">
        <Box
          background="bg-surface"
          padding="400"
          outlineWidth="025"
          outlineColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          outlineWidth="025"
          outlineStyle="dashed"
          outlineColor="border-secondary"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          outlineWidth="050"
          outlineColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="400"
          outlineWidth="100"
          outlineColor="border-caution"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
      </BlockStack>
    );
  },
};

export const WithBorderRadius = {
  render() {
    return (
      <Box background="bg-surface" padding="400" borderRadius="200">
        <Icon source={PaintBrushFlatIcon} tone="info" />
      </Box>
    );
  },
};

export const WithPadding = {
  render() {
    return (
      <BlockStack gap="400">
        <Box
          background="bg-surface"
          padding="100"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingBlock="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingBlockStart="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingBlockEnd="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingInline="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingInlineStart="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingInlineEnd="400"
          borderWidth="050"
          borderColor="border-info"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
      </BlockStack>
    );
  },
};

export const WithResponsivePadding = {
  render() {
    return (
      <BlockStack gap="400">
        <Box
          background="bg-surface"
          padding={{xs: '200', sm: '800'}}
          borderWidth="025"
          borderColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="200"
          paddingBlockStart={{xs: '400', sm: '1000'}}
          borderWidth="025"
          borderColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="200"
          paddingBlockEnd={{xs: '400', sm: '1000'}}
          borderWidth="025"
          borderColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          padding="200"
          paddingInlineStart={{xs: '400', sm: '1000'}}
          borderWidth="025"
          borderColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
        <Box
          background="bg-surface"
          paddingInlineEnd={{xs: '400', sm: '1000'}}
          borderWidth="025"
          borderColor="border"
        >
          <Icon source={PaintBrushFlatIcon} tone="base" />
        </Box>
      </BlockStack>
    );
  },
};
