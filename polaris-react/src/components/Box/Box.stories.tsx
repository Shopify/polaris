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
}

export function WithOutline() {
  return (
    <BlockStack gap="400">
      <Box
        background="bg-surface"
        padding="400"
        outlineWidth="025"
        outlineColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="400"
        outlineWidth="025"
        outlineStyle="dashed"
        outlineColor="border-secondary"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="400"
        outlineWidth="050"
        outlineColor="border-info"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="400"
        outlineWidth="100"
        outlineColor="border-caution"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
    </BlockStack>
  );
}

export function WithBorderRadius() {
  return (
    <Box background="bg-surface" padding="400" borderRadius="200">
      <Icon source={PaintBrushMajor} tone="info" />
    </Box>
  );
}

export function WithResponsivePadding() {
  return (
    <BlockStack gap="400">
      <Box
        background="bg-surface"
        padding={{xs: '200', sm: '800'}}
        borderWidth="025"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="200"
        paddingBlockStart={{xs: '400', sm: '1000'}}
        borderWidth="025"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="200"
        paddingBlockEnd={{xs: '400', sm: '1000'}}
        borderWidth="025"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        padding="200"
        paddingInlineStart={{xs: '400', sm: '1000'}}
        borderWidth="025"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
      <Box
        background="bg-surface"
        paddingInlineEnd={{xs: '400', sm: '1000'}}
        borderWidth="025"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} tone="base" />
      </Box>
    </BlockStack>
  );
}
