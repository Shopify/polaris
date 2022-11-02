import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Icon} from '@shopify/polaris';
import { PaintBrushMajor } from '@shopify/polaris-icons';

export default {
  component: Box,
} as ComponentMeta<typeof Box>;

export function Default() {
  return <Box background='surface' padding='4'><Icon source={PaintBrushMajor} color="base" /></Box>;
}

export function BoxWithDarkBorder() {
  return <Box background='surface' padding='4' border="dark"><Icon source={PaintBrushMajor} color="base" /></Box>;
}

export function BoxWithBorderRadius() {
    return <Box background='surface' padding='4' borderRadius='2'><Icon source={PaintBrushMajor} color='highlight' /></Box>;
  }
