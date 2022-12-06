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

export function BoxWithDarkBorder() {
  return (
    <Box background="surface" padding="4" border="dark">
      <Icon source={PaintBrushMajor} color="base" />
    </Box>
  );
}

export function BoxWithBorderRadius() {
  return (
    <Box background="surface" padding="4" borderRadius="2">
      <Icon source={PaintBrushMajor} color="highlight" />
    </Box>
  );
}

export function BoxWithResponsivePadding() {
  return (
    <AlphaStack>
      <Box background="surface" padding={{xs: '2', sm: '8'}} border="dark">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box background="surface" padding={{xs: '4', sm: '10'}} border="dark">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        padding={{
          xs: '3',
          sm: {inline: '4', block: '2'},
          md: {inline: {start: '1', end: '5'}},
          lg: '2',
          xl: {block: {start: '10'}},
        }}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box background="surface" padding={{inline: '4'}} border="dark">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box background="surface" padding="2" border="dark">
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
      <Box
        background="surface"
        padding={{xs: {inline: {end: '4'}}}}
        border="dark"
      >
        <Icon source={PaintBrushMajor} color="base" />
      </Box>
    </AlphaStack>
  );
}

export function NestedBoxes() {
  return (
    <div style={{display: 'flex'}}>
      <Box background="surface" padding="4" paddingInlineEnd="2" border="dark">
        <Box
          background="surface-critical"
          padding="4"
          paddingBlockStart="0"
          border="dark"
        >
          <Icon source={PaintBrushMajor} color="base" />
        </Box>
      </Box>
    </div>
  );
}
