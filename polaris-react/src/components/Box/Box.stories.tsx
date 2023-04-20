import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {VerticalStack, Text, Box, Icon} from '@shopify/polaris';
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
    <VerticalStack gap="4">
      <Box background="bg" padding="4" borderWidth="1" borderColor="border">
        <Text as="p">1px solid border</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="1"
        borderStyle="dashed"
        borderColor="border-subdued"
      >
        <Text as="p">1px dashed border</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="2"
        borderColor="border-info"
      >
        <Text as="p">2px solid blue</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="3"
        borderColor="border-success"
      >
        <Text as="p">3px solid green</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="4"
        borderColor="border-caution"
      >
        <Text as="p">4px solid yellow</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">5px solid red</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderBlockStartWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">border-block-start: 5px solid red</Text>
      </Box>
      <Box
        background="bg"
        padding="4"
        borderWidth="5"
        borderColor="transparent"
      >
        <Text as="p">5px solid transparent</Text>
      </Box>
    </VerticalStack>
  );
}

export function WithOutline() {
  return (
    <VerticalStack gap="4">
      <Box background="bg" padding="4" outlineWidth="1" outlineColor="border">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        outlineWidth="1"
        outlineStyle="dashed"
        outlineColor="border-subdued"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        outlineWidth="2"
        outlineColor="border-info"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        outlineWidth="3"
        outlineColor="border-success"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        outlineWidth="4"
        outlineColor="border-caution"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="bg"
        padding="4"
        outlineWidth="5"
        outlineColor="border-critical"
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
