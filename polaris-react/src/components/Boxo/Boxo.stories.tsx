import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {VerticalStack, Text, Boxo, Icon} from '@shopify/polaris';
import {PaintBrushMajor} from '@shopify/polaris-icons';

export default {
  component: Boxo,
} as ComponentMeta<typeof Boxo>;

export function Default() {
  return (
    <Boxo>
      <Icon source={PaintBrushMajor} color="base" />
    </Boxo>
  );
}

export function WithBorders() {
  return (
    <VerticalStack gap="4">
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="1"
        borderColor="border"
      >
        <Text as="p">1px solid border</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="1"
        borderStyle="dashed"
        borderColor="border-subdued"
      >
        <Text as="p">1px dashed border</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="2"
        borderColor="border-info"
      >
        <Text as="p">2px solid blue</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="3"
        borderColor="border-success"
      >
        <Text as="p">3px solid green</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="4"
        borderColor="border-caution"
      >
        <Text as="p">4px solid yellow</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">5px solid red</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderBlockStartWidth="5"
        borderColor="border-critical"
      >
        <Text as="p">border-block-start: 5px solid red</Text>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="5"
        borderBlockStartWidth="1"
        borderColor="border-critical"
      >
        <Text as="p">border-width: 5px solid red</Text>
        <Text as="p">border-block-start: 1px solid red</Text>
        <Boxo
          background="bg"
          padding="space-4"
          borderWidth="4"
          borderColor="border-caution"
        >
          <Text as="p">border-width: 4px solid yellow</Text>
          <Text as="p" fontWeight="semibold">
            Note: border-block-start will not inherit from the parent Boxo
            component
          </Text>
        </Boxo>
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        borderWidth="5"
        borderColor="transparent"
      >
        <Text as="p">5px solid transparent</Text>
      </Boxo>
    </VerticalStack>
  );
}

export function WithOutline() {
  return (
    <VerticalStack gap="4">
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="1"
        outlineColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="1"
        outlineStyle="dashed"
        outlineColor="border-subdued"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="2"
        outlineColor="border-info"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="3"
        outlineColor="border-success"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="4"
        outlineColor="border-caution"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-4"
        outlineWidth="5"
        outlineColor="border-critical"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
    </VerticalStack>
  );
}

export function WithBorderRadius() {
  return (
    <Boxo background="bg" padding="space-4" borderRadius="2">
      <Icon source={PaintBrushMajor} color="highlight" />
    </Boxo>
  );
}

export function WithResponsivePadding() {
  return (
    <VerticalStack gap="4">
      <Boxo
        background="bg"
        padding={{xs: 'space-2', sm: 'space-8'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-2"
        paddingBlockStart={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-2"
        paddingBlockEnd={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        padding="space-2"
        paddingInlineStart={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
      <Boxo
        background="bg"
        paddingInlineEnd={{xs: '4', sm: '10'}}
        borderWidth="1"
        borderColor="border"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Boxo>
    </VerticalStack>
  );
}
